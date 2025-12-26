import Link from 'next/link'
import { FileText, TrendingUp, Package, Users, DollarSign, Warehouse } from 'lucide-react'

const reports = [
  {
    title: 'Relatório de Vendas',
    description: 'Análise completa de vendas por período, produtos e categorias',
    href: '/admin/relatorios/vendas',
    icon: TrendingUp,
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Relatório de Produtos',
    description: 'Performance de produtos, mais vendidos e análise de estoque',
    href: '/admin/relatorios/produtos',
    icon: Package,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Relatório de Clientes',
    description: 'Base de clientes, novos registros e análise de compras',
    href: '/admin/relatorios/clientes',
    icon: Users,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Relatório de Stock',
    description: 'Níveis de estoque, produtos em falta e reposição',
    href: '/admin/relatorios/stock',
    icon: Warehouse,
    color: 'bg-orange-50 text-orange-600',
  },
  {
    title: 'Relatório Financeiro',
    description: 'Receitas, custos, margens e análise financeira detalhada',
    href: '/admin/relatorios/financeiro',
    icon: DollarSign,
    color: 'bg-indigo-50 text-indigo-600',
  },
]

export default function RelatoriosPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-600 mt-2">
          Análise detalhada e exportação de dados do AgriConecta
        </p>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon
          return (
            <Link
              key={report.href}
              href={report.href}
              className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start gap-4">
                <div className={`${report.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {report.description}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Info Card */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex gap-3">
          <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">
              Sobre os Relatórios
            </h3>
            <p className="text-sm text-blue-800">
              Todos os relatórios podem ser filtrados por período personalizado e exportados em formato PDF. 
              Os dados são atualizados em tempo real para fornecer informações precisas para a tomada de decisões.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
