'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, AlertTriangle } from 'lucide-react'
import { ExportButton } from '@/components/admin/ExportButton'

interface StockData {
  nome: string
  categoria: string
  stockAtual: number
  stockMinimo: number
  preco: number
  status: 'ok' | 'baixo' | 'critico'
}

export default function RelatorioStockPage() {
  const [produtos, setProdutos] = useState<StockData[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'todos' | 'baixo' | 'critico'>('todos')

  useEffect(() => {
    fetchStock()
  }, [])

  const fetchStock = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/produtos')
      if (response.ok) {
        const allProdutos = await response.json()
        
        const stockData: StockData[] = allProdutos.map((p: any) => {
          const stockMinimo = 10 // In production, this would come from product data
          let status: 'ok' | 'baixo' | 'critico' = 'ok'
          
          if (p.stock === 0) {
            status = 'critico'
          } else if (p.stock <= stockMinimo) {
            status = 'baixo'
          }
          
          return {
            nome: p.nome,
            categoria: 'Categoria', // Would come from p.categoria.nome
            stockAtual: p.stock,
            stockMinimo,
            preco: p.preco,
            status,
          }
        })
        
        setProdutos(stockData)
      }
    } catch (error) {
      console.error('Error fetching stock report:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProdutos = produtos.filter(p => {
    if (filter === 'todos') return true
    if (filter === 'baixo') return p.status === 'baixo'
    if (filter === 'critico') return p.status === 'critico'
    return true
  })

  const totalProdutos = produtos.length
  const produtosBaixo = produtos.filter(p => p.status === 'baixo').length
  const produtosCritico = produtos.filter(p => p.status === 'critico').length

  const getStatusBadge = (status: string) => {
    const colors = {
      ok: 'bg-green-100 text-green-800',
      baixo: 'bg-yellow-100 text-yellow-800',
      critico: 'bg-red-100 text-red-800',
    }
    const labels = {
      ok: 'OK',
      baixo: 'Stock Baixo',
      critico: 'Stock Crítico',
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {labels[status as keyof typeof labels]}
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
            <h1 className="text-3xl font-bold text-gray-900">Relatório de Stock</h1>
            <p className="text-gray-600 mt-2">
              Níveis de estoque e produtos para reposição
            </p>
          </div>
          {filteredProdutos.length > 0 && (
            <ExportButton
              title="Relatório de Stock"
              data={filteredProdutos}
              columns={[
                { header: 'Produto', dataKey: 'nome', width: 60 },
                { header: 'Categoria', dataKey: 'categoria', width: 40 },
                { header: 'Stock Atual', dataKey: 'stockAtual', width: 30 },
                { header: 'Stock Mínimo', dataKey: 'stockMinimo', width: 30 },
                { header: 'Status', dataKey: 'status', width: 30 },
              ]}
              summary={[
                { label: 'Total de Produtos', value: totalProdutos },
                { label: 'Stock Baixo', value: produtosBaixo },
                { label: 'Stock Crítico', value: produtosCritico },
              ]}
            />
          )}
        </div>
      </div>

      {/* Alert if critical */}
      {produtosCritico > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">
                Atenção: Produtos com Stock Crítico
              </h3>
              <p className="text-sm text-red-800">
                Existem {produtosCritico} produto(s) com stock crítico que precisam de reposição imediata.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filter Buttons */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter('todos')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'todos'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 border hover:bg-gray-50'
          }`}
        >
          Todos ({totalProdutos})
        </button>
        <button
          onClick={() => setFilter('baixo')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'baixo'
              ? 'bg-yellow-600 text-white'
              : 'bg-white text-gray-700 border hover:bg-gray-50'
          }`}
        >
          Stock Baixo ({produtosBaixo})
        </button>
        <button
          onClick={() => setFilter('critico')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'critico'
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-700 border hover:bg-gray-50'
          }`}
        >
          Stock Crítico ({produtosCritico})
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Total de Produtos</p>
          <p className="text-2xl font-bold">{totalProdutos}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Stock Baixo</p>
          <p className="text-2xl font-bold text-yellow-600">{produtosBaixo}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Stock Crítico</p>
          <p className="text-2xl font-bold text-red-600">{produtosCritico}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">A carregar dados...</p>
          </div>
        ) : filteredProdutos.length === 0 ? (
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
                    Stock Atual
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Mínimo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProdutos.map((produto, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {produto.nome}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {produto.categoria}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-medium ${
                        produto.status === 'critico' ? 'text-red-600' :
                        produto.status === 'baixo' ? 'text-yellow-600' :
                        'text-gray-900'
                      }`}>
                        {produto.stockAtual}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {produto.stockMinimo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(produto.status)}
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
