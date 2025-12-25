import { DashboardCards } from '@/components/admin/DashboardCards'

/**
 * Admin Dashboard Page
 * 
 * Shows key metrics and charts for the admin panel.
 * TODO: Fetch real data from the database
 */
export default async function AdminDashboardPage() {
  // TODO: Fetch real metrics from database
  const metrics = {
    totalPedidos: 156,
    pedidosPendentes: 12,
    receitaTotal: 4850000,
    produtosActivos: 48,
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

      {/* Metrics Cards */}
      <DashboardCards {...metrics} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Vendas por Período</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Gráfico de vendas (Recharts)
            {/* TODO: Implement SalesChart component */}
          </div>
        </div>

        {/* Top Products Chart */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Produtos Mais Vendidos</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Gráfico de produtos (Recharts)
            {/* TODO: Implement TopProductsChart component */}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border p-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Pedidos Recentes</h3>
          <a
            href="/admin/pedidos"
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Ver todos
          </a>
        </div>
        <div className="text-gray-400 text-center py-8">
          Tabela de pedidos recentes
          {/* TODO: Implement recent orders table */}
        </div>
      </div>
    </div>
  )
}
