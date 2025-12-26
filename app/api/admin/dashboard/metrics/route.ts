import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { startOfDay, endOfDay, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get('start')
    const endDate = searchParams.get('end')

    // Parse dates or use default (last 30 days)
    const start = startDate ? new Date(startDate) : subDays(new Date(), 29)
    const end = endDate ? new Date(endDate) : new Date()

    // Calculate previous period for comparison
    const periodLength = end.getTime() - start.getTime()
    const prevStart = new Date(start.getTime() - periodLength)
    const prevEnd = new Date(start.getTime() - 1)

    // Current period metrics
    const [
      pedidosAtual,
      pedidosPendentes,
      vendasAtual,
      clientesAtual,
    ] = await Promise.all([
      // Total orders in current period
      prisma.pedido.count({
        where: {
          criadoEm: {
            gte: start,
            lte: end,
          },
        },
      }),
      // Pending orders (regardless of period)
      prisma.pedido.count({
        where: {
          estado: 'PENDENTE',
        },
      }),
      // Total sales in current period
      prisma.pedido.aggregate({
        where: {
          criadoEm: {
            gte: start,
            lte: end,
          },
          estado: {
            notIn: ['CANCELADO'],
          },
        },
        _sum: {
          total: true,
        },
      }),
      // New customers in current period
      prisma.user.count({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          },
          isGuest: false,
        },
      }),
    ])

    // Previous period metrics for comparison
    const [
      pedidosAnterior,
      vendasAnterior,
      clientesAnterior,
    ] = await Promise.all([
      prisma.pedido.count({
        where: {
          criadoEm: {
            gte: prevStart,
            lte: prevEnd,
          },
        },
      }),
      prisma.pedido.aggregate({
        where: {
          criadoEm: {
            gte: prevStart,
            lte: prevEnd,
          },
          estado: {
            notIn: ['CANCELADO'],
          },
        },
        _sum: {
          total: true,
        },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: prevStart,
            lte: prevEnd,
          },
          isGuest: false,
        },
      }),
    ])

    // Calculate metrics
    const totalVendas = vendasAtual._sum.total || 0
    const numeroPedidos = pedidosAtual
    const ticketMedio = numeroPedidos > 0 ? totalVendas / numeroPedidos : 0
    const novosClientes = clientesAtual

    // Calculate total visitors (approximation using unique user IDs from orders)
    const totalVisitantes = await prisma.pedido.findMany({
      where: {
        criadoEm: {
          gte: start,
          lte: end,
        },
      },
      select: {
        userId: true,
      },
      distinct: ['userId'],
    })

    const taxaConversao = totalVisitantes.length > 0 
      ? (numeroPedidos / totalVisitantes.length) * 100 
      : 0

    // Calculate trends (percentage change from previous period)
    const calcTrend = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0
      return ((current - previous) / previous) * 100
    }

    const totalVendasAnterior = vendasAnterior._sum.total || 0
    const ticketMedioAnterior = pedidosAnterior > 0 ? totalVendasAnterior / pedidosAnterior : 0

    const trends = {
      vendas: calcTrend(totalVendas, totalVendasAnterior),
      pedidos: calcTrend(numeroPedidos, pedidosAnterior),
      ticketMedio: calcTrend(ticketMedio, ticketMedioAnterior),
      clientes: calcTrend(novosClientes, clientesAnterior),
    }

    return NextResponse.json({
      totalVendas,
      numeroPedidos,
      ticketMedio,
      novosClientes,
      pedidosPendentes,
      taxaConversao,
      trends,
    })
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar métricas' },
      { status: 500 }
    )
  }
}
