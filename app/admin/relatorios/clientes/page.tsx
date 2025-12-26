'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { DateRangePicker, DateRange } from '@/components/admin/DateRangePicker'
import { ExportButton } from '@/components/admin/ExportButton'
import { subDays } from 'date-fns'

interface ClienteData {
  nome: string
  email: string
  telefone: string
  totalPedidos: number
  totalGasto: number
  ultimoPedido: string
}

export default function RelatorioClientesPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: subDays(new Date(), 29),
    end: new Date(),
  })
  const [clientes, setClientes] = useState<ClienteData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClientes()
  }, [dateRange])

  const fetchClientes = async () => {
    setLoading(true)
    try {
      // In production, this would fetch from a dedicated API endpoint
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const users = await response.json()
        
        // Mock data - in production, calculate from actual orders
        const mockData: ClienteData[] = users.slice(0, 10).map((u: any) => ({
          nome: u.nome || 'Cliente',
          email: u.email || 'N/A',
          telefone: u.telefone || 'N/A',
          totalPedidos: Math.floor(Math.random() * 10) + 1,
          totalGasto: Math.floor(Math.random() * 100000),
          ultimoPedido: '10/12/2024',
        }))
        
        setClientes(mockData)
      }
    } catch (error) {
      console.error('Error fetching clients report:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalClientes = clientes.length
  const totalGasto = clientes.reduce((sum, c) => sum + c.totalGasto, 0)
  const mediaPedidos = totalClientes > 0 ? clientes.reduce((sum, c) => sum + c.totalPedidos, 0) / totalClientes : 0

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
            <h1 className="text-3xl font-bold text-gray-900">Relatório de Clientes</h1>
            <p className="text-gray-600 mt-2">
              Base de clientes e análise de compras
            </p>
          </div>
          {clientes.length > 0 && (
            <ExportButton
              title="Relatório de Clientes"
              data={clientes}
              columns={[
                { header: 'Nome', dataKey: 'nome', width: 50 },
                { header: 'Email', dataKey: 'email', width: 55 },
                { header: 'Telefone', dataKey: 'telefone', width: 35 },
                { header: 'Pedidos', dataKey: 'totalPedidos', width: 25 },
                { header: 'Total Gasto (Kz)', dataKey: 'totalGasto', width: 35 },
              ]}
              summary={[
                { label: 'Total de Clientes', value: totalClientes },
                { label: 'Média de Pedidos', value: mediaPedidos.toFixed(1) },
                { label: 'Total Gasto', value: `${totalGasto.toLocaleString('pt-AO')} Kz` },
              ]}
            />
          )}
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="mb-6">
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Total de Clientes</p>
          <p className="text-2xl font-bold">{totalClientes}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Média de Pedidos</p>
          <p className="text-2xl font-bold text-blue-600">{mediaPedidos.toFixed(1)}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Total Gasto</p>
          <p className="text-2xl font-bold text-green-600">
            {totalGasto.toLocaleString('pt-AO')} Kz
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">A carregar dados...</p>
          </div>
        ) : clientes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Nenhum cliente encontrado
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Pedidos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Gasto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Último Pedido
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clientes.map((cliente, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {cliente.nome}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {cliente.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.telefone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cliente.totalPedidos}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {cliente.totalGasto.toLocaleString('pt-AO')} Kz
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.ultimoPedido}
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
