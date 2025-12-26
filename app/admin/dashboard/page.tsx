'use client'

import { useEffect, useState } from 'react'
import { DateRangePicker, DateRange } from '@/components/admin/DateRangePicker'
import { DashboardMetrics } from '@/components/admin/dashboard/DashboardMetrics'
import { SalesChart } from '@/components/admin/dashboard/SalesChart'
import { TopProductsChart } from '@/components/admin/dashboard/TopProductsChart'
import { subDays } from 'date-fns'

interface MetricsData {
  totalVendas: number
  numeroPedidos: number
  ticketMedio: number
  novosClientes: number
  pedidosPendentes: number
  taxaConversao: number
  trends?: {
    vendas?: number
    pedidos?: number
    ticketMedio?: number
    clientes?: number
  }
}

interface SalesData {
  date: string
  vendas: number
  pedidos: number
}

interface TopProductData {
  nome: string
  quantidade: number
  receita: number
}

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: subDays(new Date(), 29),
    end: new Date(),
  })
  const [groupBy, setGroupBy] = useState<'day' | 'week' | 'month'>('day')
  const [metrics, setMetrics] = useState<MetricsData | null>(null)
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [topProducts, setTopProducts] = useState<TopProductData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [dateRange, groupBy])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString(),
      })

      const [metricsRes, salesRes, topProductsRes] = await Promise.all([
        fetch(`/api/admin/dashboard/metrics?${params}`),
        fetch(`/api/admin/dashboard/vendas?${params}&groupBy=${groupBy}`),
        fetch(`/api/admin/dashboard/top-produtos?${params}&limit=5`),
      ])

      if (metricsRes.ok) {
        const metricsData = await metricsRes.json()
        setMetrics(metricsData)
      }

      if (salesRes.ok) {
        const salesData = await salesRes.json()
        setSalesData(salesData)
      }

      if (topProductsRes.ok) {
        const topProductsData = await topProductsRes.json()
        setTopProducts(topProductsData)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Visão geral das métricas do AgriConecta
        </p>
      </div>

      {/* Date Range Picker */}
      <div className="mb-8">
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Metrics Cards */}
      {loading && !metrics ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-2 text-gray-600">A carregar métricas...</p>
        </div>
      ) : metrics ? (
        <DashboardMetrics
          totalVendas={metrics.totalVendas}
          numeroPedidos={metrics.numeroPedidos}
          ticketMedio={metrics.ticketMedio}
          novosClientes={metrics.novosClientes}
          pedidosPendentes={metrics.pedidosPendentes}
          taxaConversao={metrics.taxaConversao}
          trends={metrics.trends}
        />
      ) : null}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Vendas por Período</h3>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value as 'day' | 'week' | 'month')}
              className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="day">Por Dia</option>
              <option value="week">Por Semana</option>
              <option value="month">Por Mês</option>
            </select>
          </div>
          <div className="h-80">
            {salesData.length > 0 ? (
              <SalesChart data={salesData} groupBy={groupBy} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Sem dados para o período selecionado
              </div>
            )}
          </div>
        </div>

        {/* Top Products Chart */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Produtos Mais Vendidos</h3>
          <div className="h-80">
            {topProducts.length > 0 ? (
              <TopProductsChart data={topProducts} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Sem dados para o período selecionado
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
