import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { format, startOfDay, endOfDay, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get('start')
    const endDate = searchParams.get('end')
    const groupBy = searchParams.get('groupBy') || 'day' // day, week, month

    // Parse dates or use default (last 30 days)
    const start = startDate ? new Date(startDate) : subDays(new Date(), 29)
    const end = endDate ? new Date(endDate) : new Date()

    // Fetch all orders in the date range
    const pedidos = await prisma.pedido.findMany({
      where: {
        criadoEm: {
          gte: start,
          lte: end,
        },
        estado: {
          notIn: ['CANCELADO'],
        },
      },
      select: {
        criadoEm: true,
        total: true,
      },
    })

    // Group data by the specified interval
    let intervals: Date[]
    let formatPattern: string

    if (groupBy === 'month') {
      intervals = eachMonthOfInterval({ start, end })
      formatPattern = 'MMM yyyy'
    } else if (groupBy === 'week') {
      intervals = eachWeekOfInterval({ start, end })
      formatPattern = 'dd MMM'
    } else {
      intervals = eachDayOfInterval({ start, end })
      formatPattern = 'dd MMM'
    }

    // Aggregate data by intervals
    const data = intervals.map(interval => {
      const intervalStart = startOfDay(interval)
      let intervalEnd: Date

      if (groupBy === 'month') {
        const nextMonth = new Date(interval)
        nextMonth.setMonth(interval.getMonth() + 1)
        intervalEnd = new Date(nextMonth.getTime() - 1)
      } else if (groupBy === 'week') {
        const nextWeek = new Date(interval)
        nextWeek.setDate(interval.getDate() + 7)
        intervalEnd = new Date(nextWeek.getTime() - 1)
      } else {
        intervalEnd = endOfDay(interval)
      }

      const pedidosNoIntervalo = pedidos.filter(p => 
        p.criadoEm >= intervalStart && p.criadoEm <= intervalEnd
      )

      const vendas = pedidosNoIntervalo.reduce((sum, p) => sum + p.total, 0)
      const numeroPedidos = pedidosNoIntervalo.length

      return {
        date: format(interval, formatPattern, { locale: ptBR }),
        vendas: Math.round(vendas),
        pedidos: numeroPedidos,
      }
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching sales data:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar dados de vendas' },
      { status: 500 }
    )
  }
}
