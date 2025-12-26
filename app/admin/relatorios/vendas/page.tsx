'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { DateRangePicker, DateRange } from '@/components/admin/DateRangePicker'
import { ExportButton } from '@/components/admin/ExportButton'
import { subDays } from 'date-fns'

interface VendaData {
  numero: string
  data: string
  cliente: string
  email: string
  itens: number
  subtotal: number
  taxaEntrega: number
  desconto: number
  total: number
  estado: string
  metodoPagamento: string
}

interface SummaryData {
  periodo: string
  totalVendas: number
  totalPedidos: number
  pedidosPagos: number
  pedidosCancelados: number
  ticketMedio: number
}

export default function RelatorioVendasPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: subDays(new Date(), 29),
    end: new Date(),
  })
  const [vendas, setVendas] = useState<VendaData[]>([])
  const [summary, setSummary] = useState<SummaryData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVendas()
  }, [dateRange])

  const fetchVendas = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString(),
      })

      const response = await fetch(`/api/admin/relatorios/vendas?${params}`)
      if (response.ok) {
        const data = await response.json()
        setVendas(data.vendas)
        setSummary(data.summary)
      }
    } catch (error) {
      console.error('Error fetching sales report:', error)
    } finally {
      setLoading(false)
    }
  }

  const getEstadoBadge = (estado: string) => {
    const colors: Record<string, string> = {
      PENDENTE: 'bg-yellow-100 text-yellow-800',
      PAGO: 'bg-green-100 text-green-800',
      EM_PREPARACAO: 'bg-blue-100 text-blue-800',
      EM_TRANSITO: 'bg-purple-100 text-purple-800',
      ENTREGUE: 'bg-green-100 text-green-800',
      CANCELADO: 'bg-red-100 text-red-800',
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[estado] || 'bg-gray-100 text-gray-800'}`}>
        {estado.replace(/_/g, ' ')}
      </span>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/relatorios"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar aos Relatórios
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Relatório de Vendas</h1>
            <p className="text-gray-600 mt-2">
              Análise detalhada de vendas e pedidos
            </p>
          </div>
          {vendas.length > 0 && summary && (
            <ExportButton
              title="Relatório de Vendas"
              data={vendas}
              columns={[
                { header: 'Nº Pedido', dataKey: 'numero', width: 35 },
                { header: 'Data', dataKey: 'data', width: 35 },
                { header: 'Cliente', dataKey: 'cliente', width: 45 },
                { header: 'Itens', dataKey: 'itens', width: 20 },
                { header: 'Total (Kz)', dataKey: 'total', width: 30 },
                { header: 'Estado', dataKey: 'estado', width: 30 },
              ]}
              summary={[
                { label: 'Período', value: summary.periodo },
                { label: 'Total de Vendas', value: `${summary.totalVendas.toLocaleString('pt-AO')} Kz` },
                { label: 'Total de Pedidos', value: summary.totalPedidos },
                { label: 'Pedidos Pagos', value: summary.pedidosPagos },
                { label: 'Pedidos Cancelados', value: summary.pedidosCancelados },
                { label: 'Ticket Médio', value: `${summary.ticketMedio.toLocaleString('pt-AO')} Kz` },
              ]}
              fileName={`relatorio-vendas-${dateRange.start.toISOString().split('T')[0]}.pdf`}
            />
          )}
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="mb-6">
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4">
            <p className="text-sm text-gray-600">Total de Vendas</p>
            <p className="text-2xl font-bold text-green-600">
              {summary.totalVendas.toLocaleString('pt-AO')} Kz
            </p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-sm text-gray-600">Total de Pedidos</p>
            <p className="text-2xl font-bold">{summary.totalPedidos}</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-sm text-gray-600">Pedidos Pagos</p>
            <p className="text-2xl font-bold text-green-600">{summary.pedidosPagos}</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-sm text-gray-600">Pedidos Cancelados</p>
            <p className="text-2xl font-bold text-red-600">{summary.pedidosCancelados}</p>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <p className="text-sm text-gray-600">Ticket Médio</p>
            <p className="text-2xl font-bold">
              {summary.ticketMedio.toLocaleString('pt-AO')} Kz
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">A carregar dados...</p>
          </div>
        ) : vendas.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Nenhuma venda encontrada para o período selecionado
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nº Pedido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Itens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pagamento
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vendas.map((venda) => (
                  <tr key={venda.numero} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {venda.numero}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {venda.data}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>{venda.cliente}</div>
                      <div className="text-gray-500 text-xs">{venda.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {venda.itens}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {venda.total.toLocaleString('pt-AO')} Kz
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getEstadoBadge(venda.estado)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {venda.metodoPagamento.replace(/_/g, ' ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
