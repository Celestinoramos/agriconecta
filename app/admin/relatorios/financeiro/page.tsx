'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { DateRangePicker, DateRange } from '@/components/admin/DateRangePicker'
import { ExportButton } from '@/components/admin/ExportButton'
import { subDays } from 'date-fns'

interface FinanceiroData {
  mes: string
  receita: number
  custos: number
  lucro: number
  margem: number
}

export default function RelatorioFinanceiroPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: subDays(new Date(), 89), // 3 months
    end: new Date(),
  })
  const [dados, setDados] = useState<FinanceiroData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFinanceiro()
  }, [dateRange])

  const fetchFinanceiro = async () => {
    setLoading(true)
    try {
      // In production, this would fetch from a dedicated API endpoint
      // For now, generate mock data
      const mockData: FinanceiroData[] = [
        { mes: 'Outubro 2024', receita: 485000, custos: 320000, lucro: 165000, margem: 34.0 },
        { mes: 'Novembro 2024', receita: 523000, custos: 345000, lucro: 178000, margem: 34.0 },
        { mes: 'Dezembro 2024', receita: 612000, custos: 398000, lucro: 214000, margem: 35.0 },
      ]
      
      setDados(mockData)
    } catch (error) {
      console.error('Error fetching financial report:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalReceita = dados.reduce((sum, d) => sum + d.receita, 0)
  const totalCustos = dados.reduce((sum, d) => sum + d.custos, 0)
  const totalLucro = dados.reduce((sum, d) => sum + d.lucro, 0)
  const margemMedia = totalReceita > 0 ? (totalLucro / totalReceita) * 100 : 0

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
            <h1 className="text-3xl font-bold text-gray-900">Relatório Financeiro</h1>
            <p className="text-gray-600 mt-2">
              Análise de receitas, custos e margens
            </p>
          </div>
          {dados.length > 0 && (
            <ExportButton
              title="Relatório Financeiro"
              data={dados}
              columns={[
                { header: 'Período', dataKey: 'mes', width: 40 },
                { header: 'Receita (Kz)', dataKey: 'receita', width: 35 },
                { header: 'Custos (Kz)', dataKey: 'custos', width: 35 },
                { header: 'Lucro (Kz)', dataKey: 'lucro', width: 35 },
                { header: 'Margem (%)', dataKey: 'margem', width: 25 },
              ]}
              summary={[
                { label: 'Total Receita', value: `${totalReceita.toLocaleString('pt-AO')} Kz` },
                { label: 'Total Custos', value: `${totalCustos.toLocaleString('pt-AO')} Kz` },
                { label: 'Total Lucro', value: `${totalLucro.toLocaleString('pt-AO')} Kz` },
                { label: 'Margem Média', value: `${margemMedia.toFixed(1)}%` },
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Total Receita</p>
          <p className="text-2xl font-bold text-green-600">
            {totalReceita.toLocaleString('pt-AO')} Kz
          </p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Total Custos</p>
          <p className="text-2xl font-bold text-red-600">
            {totalCustos.toLocaleString('pt-AO')} Kz
          </p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Total Lucro</p>
          <p className="text-2xl font-bold text-blue-600">
            {totalLucro.toLocaleString('pt-AO')} Kz
          </p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Margem Média</p>
          <p className="text-2xl font-bold text-purple-600">
            {margemMedia.toFixed(1)}%
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
        ) : dados.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Nenhum dado encontrado
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Período
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Receita
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Custos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lucro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Margem
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dados.map((dado, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {dado.mes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {dado.receita.toLocaleString('pt-AO')} Kz
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                      {dado.custos.toLocaleString('pt-AO')} Kz
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {dado.lucro.toLocaleString('pt-AO')} Kz
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`${dado.margem >= 30 ? 'text-green-600' : 'text-yellow-600'} font-medium`}>
                        {dado.margem.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Nota:</strong> Os custos incluem custos operacionais, custos de produtos, taxas de entrega e outros custos associados.
          A margem é calculada como (Lucro / Receita) × 100.
        </p>
      </div>
    </div>
  )
}
