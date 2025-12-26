import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { subDays } from 'date-fns'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get('start')
    const endDate = searchParams.get('end')
    const limit = parseInt(searchParams.get('limit') || '5')

    // Parse dates or use default (last 30 days)
    const start = startDate ? new Date(startDate) : subDays(new Date(), 29)
    const end = endDate ? new Date(endDate) : new Date()

    // Fetch all order items in the date range
    const itensPedido = await prisma.itemPedido.findMany({
      where: {
        pedido: {
          criadoEm: {
            gte: start,
            lte: end,
          },
          estado: {
            notIn: ['CANCELADO'],
          },
        },
      },
      select: {
        produtoId: true,
        produtoNome: true,
        quantidade: true,
        subtotal: true,
      },
    })

    // Aggregate by product
    const produtosMap = new Map<string, { nome: string; quantidade: number; receita: number }>()

    itensPedido.forEach(item => {
      const existing = produtosMap.get(item.produtoId)
      if (existing) {
        existing.quantidade += item.quantidade
        existing.receita += item.subtotal
      } else {
        produtosMap.set(item.produtoId, {
          nome: item.produtoNome,
          quantidade: item.quantidade,
          receita: item.subtotal,
        })
      }
    })

    // Convert to array and sort by revenue
    const topProdutos = Array.from(produtosMap.values())
      .sort((a, b) => b.receita - a.receita)
      .slice(0, limit)
      .map(p => ({
        ...p,
        receita: Math.round(p.receita),
      }))

    return NextResponse.json(topProdutos)
  } catch (error) {
    console.error('Error fetching top products:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produtos mais vendidos' },
      { status: 500 }
    )
  }
}
