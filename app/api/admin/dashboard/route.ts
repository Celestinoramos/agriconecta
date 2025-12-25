import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/admin/dashboard
 * 
 * Returns dashboard metrics
 * TODO: Add authentication and role verification
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Verify user is authenticated and has STAFF+ role

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    // Count orders this month
    const totalPedidos = await prisma.pedido.count({
      where: {
        criadoEm: {
          gte: startOfMonth,
        },
      },
    })

    // Count pending orders
    const pedidosPendentes = await prisma.pedido.count({
      where: {
        estado: 'PENDENTE',
      },
    })

    // Calculate total revenue this month
    const pedidosPagos = await prisma.pedido.findMany({
      where: {
        estado: {
          in: ['PAGO', 'EM_PREPARACAO', 'EM_TRANSITO', 'ENTREGUE'],
        },
        criadoEm: {
          gte: startOfMonth,
        },
      },
      select: {
        total: true,
      },
    })

    const receitaTotal = pedidosPagos.reduce((sum, pedido) => sum + pedido.total, 0)

    // Count active products
    // TODO: Implement when Product model is added
    const produtosActivos = 0

    return NextResponse.json({
      totalPedidos,
      pedidosPendentes,
      receitaTotal,
      produtosActivos,
    })
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error)
    return NextResponse.json(
      { error: 'Erro ao carregar métricas' },
      { status: 500 }
    )
  }
}
