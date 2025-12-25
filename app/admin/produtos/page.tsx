'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProductsTable } from '@/components/admin/produtos/ProductsTable'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function AdminProdutosPage() {
  const router = useRouter()
  const [produtos, setProdutos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    pesquisa: '',
    categoriaId: '',
    activo: '',
  })
  const [categorias, setCategorias] = useState<any[]>([])

  useEffect(() => {
    fetchCategorias()
    fetchProdutos()
  }, [])

  const fetchCategorias = async () => {
    try {
      const response = await fetch('/api/admin/categorias')
      if (response.ok) {
        const data = await response.json()
        setCategorias(data)
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
    }
  }

  const fetchProdutos = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.pesquisa) params.append('pesquisa', filters.pesquisa)
      if (filters.categoriaId) params.append('categoriaId', filters.categoriaId)
      if (filters.activo) params.append('activo', filters.activo)

      const response = await fetch(`/api/admin/produtos?${params}`)
      if (response.ok) {
        const data = await response.json()
        setProdutos(data.produtos)
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar este produto?')) return

    try {
      const response = await fetch(`/api/admin/produtos/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchProdutos()
      } else {
        alert('Erro ao eliminar produto')
      }
    } catch (error) {
      console.error('Erro ao eliminar produto:', error)
      alert('Erro ao eliminar produto')
    }
  }

  const handleToggleActivo = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/produtos/${id}/toggle-activo`, {
        method: 'POST',
      })

      if (response.ok) {
        fetchProdutos()
      }
    } catch (error) {
      console.error('Erro ao toggle activo:', error)
    }
  }

  const handleToggleDestaque = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/produtos/${id}/toggle-destaque`, {
        method: 'POST',
      })

      if (response.ok) {
        fetchProdutos()
      }
    } catch (error) {
      console.error('Erro ao toggle destaque:', error)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Produtos</h1>
          <p className="text-gray-600 mt-2">Gerencie o catálogo de produtos</p>
        </div>
        <Button onClick={() => router.push('/admin/produtos/novo')}>
          Novo Produto
        </Button>
      </div>

      <Card className="p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Pesquisar</label>
            <input
              type="text"
              value={filters.pesquisa}
              onChange={(e) => setFilters({ ...filters, pesquisa: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Nome, descrição..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Categoria</label>
            <select
              value={filters.categoriaId}
              onChange={(e) => setFilters({ ...filters, categoriaId: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Todas</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Estado</label>
            <select
              value={filters.activo}
              onChange={(e) => setFilters({ ...filters, activo: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Todos</option>
              <option value="true">Activos</option>
              <option value="false">Inactivos</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={fetchProdutos}>Filtrar</Button>
        </div>
      </Card>

      {loading ? (
        <div className="text-center py-12">A carregar...</div>
      ) : produtos.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-500">Nenhum produto encontrado</p>
        </Card>
      ) : (
        <Card className="p-6">
          <ProductsTable
            produtos={produtos}
            onEdit={(id) => router.push(`/admin/produtos/${id}`)}
            onDelete={handleDelete}
            onToggleActivo={handleToggleActivo}
            onToggleDestaque={handleToggleDestaque}
          />
        </Card>
      )}
    </div>
  )
}

