'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { DateRangePicker, DateRange } from '@/components/admin/DateRangePicker'
import { ExportButton } from '@/components/admin/ExportButton'
import { subDays } from 'date-fns'

interface ProdutoData {
  nome: string
  categoria: string
  quantidadeVendida: number
  receita: number
  stockAtual: number
  preco: number
}

export default function RelatorioProdutosPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: subDays(new Date(), 29),
    end: new Date(),
  })
  const [produtos, setProdutos] = useState<ProdutoData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProdutos()
  }, [dateRange])

  const fetchProdutos = async () => {
    setLoading(true)
    try {
      // Fetch products with sales data
      const response = await fetch('/api/admin/produtos')
      if (response.ok) {
        const allProdutos = await response.json()
        
        // For now, use mock data - in production this would come from an API
        const mockData: ProdutoData[] = allProdutos.slice(0, 10).map((p: any) => ({
          nome: p.nome,
          categoria: 'Frutas', // Would come from p.categoria.nome
          quantidadeVendida: Math.floor(Math.random() * 100),
          receita: Math.floor(Math.random() * 100000),
          stockAtual: p.stock,
          preco: p.preco,
        }))
        
        setProdutos(mockData)
      }
    } catch (error) {
      console.error('Error fetching products report:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalReceita = produtos.reduce((sum, p) => sum + p.receita, 0)
  const totalQuantidade = produtos.reduce((sum, p) => sum + p.quantidadeVendida, 0)

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
            <h1 className="text-3xl font-bold text-gray-900">Relatório de Produtos</h1>
            <p className="text-gray-600 mt-2">
              Performance de produtos e análise de vendas
            </p>
          </div>
          {produtos.length > 0 && (
            <ExportButton
              title="Relatório de Produtos"
              data={produtos}
              columns={[
                { header: 'Produto', dataKey: 'nome', width: 60 },
                { header: 'Categoria', dataKey: 'categoria', width: 40 },
                { header: 'Qtd. Vendida', dataKey: 'quantidadeVendida', width: 30 },
                { header: 'Receita (Kz)', dataKey: 'receita', width: 35 },
                { header: 'Stock', dataKey: 'stockAtual', width: 25 },
              ]}
              summary={[
                { label: 'Total de Produtos', value: produtos.length },
                { label: 'Quantidade Total Vendida', value: totalQuantidade },
                { label: 'Receita Total', value: `${totalReceita.toLocaleString('pt-AO')} Kz` },
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
          <p className="text-sm text-gray-600">Total de Produtos</p>
          <p className="text-2xl font-bold">{produtos.length}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Quantidade Vendida</p>
          <p className="text-2xl font-bold text-blue-600">{totalQuantidade}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Receita Total</p>
          <p className="text-2xl font-bold text-green-600">
            {totalReceita.toLocaleString('pt-AO')} Kz
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
        ) : produtos.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Nenhum produto encontrado
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qtd. Vendida
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Receita
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Atual
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {produtos.map((produto, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {produto.nome}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {produto.categoria}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {produto.quantidadeVendida}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {produto.receita.toLocaleString('pt-AO')} Kz
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`${produto.stockAtual < 10 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                        {produto.stockAtual}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {produto.preco.toLocaleString('pt-AO')} Kz
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
