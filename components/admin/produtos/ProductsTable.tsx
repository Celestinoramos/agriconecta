'use client'

import { useState } from 'react'
import { Produto } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ProductsTableProps {
  produtos: (Produto & { categoria: { nome: string } })[]
  onEdit: (id: string) => void
  onDelete: (id: string) => Promise<void>
  onToggleActivo: (id: string) => Promise<void>
  onToggleDestaque: (id: string) => Promise<void>
}

export function ProductsTable({
  produtos,
  onEdit,
  onDelete,
  onToggleActivo,
  onToggleDestaque,
}: ProductsTableProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleAction = async (action: () => Promise<void>, id: string) => {
    setLoading(id)
    try {
      await action()
    } finally {
      setLoading(null)
    }
  }

  const formatPreco = (preco: number) => {
    return `${preco.toLocaleString('pt-AO')} AOA`
  }

  const getStockBadge = (stock: number) => {
    if (stock === 0) return <Badge variant="destructive">Sem stock</Badge>
    if (stock <= 10) return <Badge variant="secondary">Stock baixo</Badge>
    return <Badge variant="default">Em stock</Badge>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Imagem</th>
            <th className="text-left p-3">Nome</th>
            <th className="text-left p-3">Categoria</th>
            <th className="text-left p-3">Preço</th>
            <th className="text-left p-3">Stock</th>
            <th className="text-left p-3">Activo</th>
            <th className="text-left p-3">Destaque</th>
            <th className="text-left p-3">Acções</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                {produto.imagens[0] ? (
                  <img
                    src={produto.imagens[0]}
                    alt={produto.nome}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                    Sem imagem
                  </div>
                )}
              </td>
              <td className="p-3 font-medium">{produto.nome}</td>
              <td className="p-3">
                <Badge variant="outline">{produto.categoria.nome}</Badge>
              </td>
              <td className="p-3">{formatPreco(produto.preco)}</td>
              <td className="p-3">{getStockBadge(produto.stock)}</td>
              <td className="p-3">
                <button
                  onClick={() => handleAction(() => onToggleActivo(produto.id), produto.id)}
                  disabled={loading === produto.id}
                  className={`px-3 py-1 rounded text-sm ${
                    produto.activo
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {produto.activo ? 'Activo' : 'Inactivo'}
                </button>
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleAction(() => onToggleDestaque(produto.id), produto.id)}
                  disabled={loading === produto.id}
                  className={`px-3 py-1 rounded text-sm ${
                    produto.destaque
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {produto.destaque ? 'Destaque' : 'Normal'}
                </button>
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(produto.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleAction(() => onDelete(produto.id), produto.id)}
                    disabled={loading === produto.id}
                  >
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
