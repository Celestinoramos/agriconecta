import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { subDays } from 'date-fns'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get('start')
    const endDate = searchParams.get('end')

    // Parse dates or use default (last 30 days)
    const start = startDate ? new Date(startDate) : subDays(new Date(), 29)
    const end = endDate ? new Date(endDate) : new Date()

    // Fetch orders with items
    const pedidos = await prisma.pedido.findMany({
      where: {
        criadoEm: {
          gte: start,
          lte: end,
        },
      },
      include: {
        itens: true,
        user: {
          select: {
            nome: true,
            email: true,
          },
        },
      },
      orderBy: {
        criadoEm: 'desc',
      },
    })

    // Format data for report
    const vendas = pedidos.map(pedido => ({
      numero: pedido.numero,
      data: format(pedido.criadoEm, 'dd/MM/yyyy HH:mm', { locale: ptBR }),
      cliente: pedido.clienteNome,
      email: pedido.clienteEmail,
      itens: pedido.itens.length,
      subtotal: pedido.subtotal,
      taxaEntrega: pedido.taxaEntrega,
      desconto: pedido.desconto,
      total: pedido.total,
      estado: pedido.estado,
      metodoPagamento: pedido.metodoPagamento,
    }))

    // Calculate summary
    const totalVendas = pedidos
      .filter(p => p.estado !== 'CANCELADO')
      .reduce((sum, p) => sum + p.total, 0)
    
    const totalPedidos = pedidos.length
    const pedidosPagos = pedidos.filter(p => p.estado === 'PAGO' || p.estado === 'EM_PREPARACAO' || p.estado === 'EM_TRANSITO' || p.estado === 'ENTREGUE').length
    const pedidosCancelados = pedidos.filter(p => p.estado === 'CANCELADO').length
    const ticketMedio = pedidosPagos > 0 ? totalVendas / pedidosPagos : 0

    return NextResponse.json({
      vendas,
      summary: {
        periodo: `${format(start, 'dd/MM/yyyy', { locale: ptBR })} - ${format(end, 'dd/MM/yyyy', { locale: ptBR })}`,
        totalVendas,
        totalPedidos,
        pedidosPagos,
        pedidosCancelados,
        ticketMedio,
      },
    })
  } catch (error) {
    console.error('Error fetching sales report:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar relatório de vendas' },
      { status: 500 }
    )
  }
}
