'use client'

import { DollarSign, Package, ShoppingCart, TrendingUp, TrendingDown, Users, Clock } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: {
    value: number
    label?: string
  }
}

function MetricCard({ title, value, subtitle, icon, trend }: MetricCardProps) {
  const isPositive = trend && trend.value >= 0
  
  return (
    <div className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          {icon}
        </div>
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-4">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{trend.value}%
          </span>
          <span className="text-sm text-gray-600">
            {trend.label || 'vs. período anterior'}
          </span>
        </div>
      )}
    </div>
  )
}

interface DashboardMetricsProps {
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

export function DashboardMetrics({
  totalVendas,
  numeroPedidos,
  ticketMedio,
  novosClientes,
  pedidosPendentes,
  taxaConversao,
  trends = {}
}: DashboardMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <MetricCard
        title="Total de Vendas"
        value={`${totalVendas.toLocaleString('pt-AO')} Kz`}
        icon={<DollarSign className="w-6 h-6 text-green-600" />}
        trend={trends.vendas !== undefined ? { value: trends.vendas } : undefined}
      />
      
      <MetricCard
        title="Número de Pedidos"
        value={numeroPedidos}
        icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
        trend={trends.pedidos !== undefined ? { value: trends.pedidos } : undefined}
      />
      
      <MetricCard
        title="Ticket Médio"
        value={`${ticketMedio.toLocaleString('pt-AO')} Kz`}
        icon={<DollarSign className="w-6 h-6 text-purple-600" />}
        trend={trends.ticketMedio !== undefined ? { value: trends.ticketMedio } : undefined}
      />
      
      <MetricCard
        title="Novos Clientes"
        value={novosClientes}
        icon={<Users className="w-6 h-6 text-indigo-600" />}
        trend={trends.clientes !== undefined ? { value: trends.clientes } : undefined}
      />
      
      <MetricCard
        title="Pedidos Pendentes"
        value={pedidosPendentes}
        subtitle="Requerem atenção"
        icon={<Clock className="w-6 h-6 text-orange-600" />}
      />
      
      <MetricCard
        title="Taxa de Conversão"
        value={`${taxaConversao.toFixed(1)}%`}
        icon={<TrendingUp className="w-6 h-6 text-green-600" />}
      />
    </div>
  )
}
