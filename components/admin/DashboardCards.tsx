'use client'

import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: {
    value: string
    positive: boolean
  }
}

function MetricCard({ title, value, subtitle, icon, trend }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg border p-6">
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
      {trend && (
        <div className="flex items-center gap-1 mt-4">
          <TrendingUp 
            className={`w-4 h-4 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}
          />
          <span className={`text-sm font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.value}
          </span>
          <span className="text-sm text-gray-600">vs. mês anterior</span>
        </div>
      )}
    </div>
  )
}

interface DashboardCardsProps {
  totalPedidos: number
  pedidosPendentes: number
  receitaTotal: number
  produtosActivos: number
}

export function DashboardCards({
  totalPedidos,
  pedidosPendentes,
  receitaTotal,
  produtosActivos
}: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Receita Total"
        value={`${receitaTotal.toLocaleString('pt-AO')} Kz`}
        subtitle="Este mês"
        icon={<DollarSign className="w-6 h-6 text-green-600" />}
        trend={{ value: '+12.5%', positive: true }}
      />
      
      <MetricCard
        title="Total de Pedidos"
        value={totalPedidos}
        subtitle="Este mês"
        icon={<ShoppingCart className="w-6 h-6 text-green-600" />}
        trend={{ value: '+8.2%', positive: true }}
      />
      
      <MetricCard
        title="Pedidos Pendentes"
        value={pedidosPendentes}
        subtitle="Requerem atenção"
        icon={<ShoppingCart className="w-6 h-6 text-orange-600" />}
      />
      
      <MetricCard
        title="Produtos Activos"
        value={produtosActivos}
        subtitle="No catálogo"
        icon={<Package className="w-6 h-6 text-green-600" />}
      />
    </div>
  )
}
