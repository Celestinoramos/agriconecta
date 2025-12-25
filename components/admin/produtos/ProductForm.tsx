'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ProductFormProps {
  produto?: any
  categorias: { id: string; nome: string }[]
  mode: 'create' | 'edit'
}

export function ProductForm({ produto, categorias, mode }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    nome: produto?.nome || '',
    descricao: produto?.descricao || '',
    descricaoCompleta: produto?.descricaoCompleta || '',
    preco: produto?.preco || 0,
    unidade: produto?.unidade || 'kg',
    categoriaId: produto?.categoriaId || '',
    stock: produto?.stock || 0,
    produtor: produto?.produtor || '',
    provincia: produto?.provincia || '',
    conservacao: produto?.conservacao || '',
    activo: produto?.activo ?? true,
    destaque: produto?.destaque ?? false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const url = mode === 'create'
        ? '/api/admin/produtos'
        : `/api/admin/produtos/${produto.id}`
      
      const response = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erro ao guardar produto')
      }

      router.push('/admin/produtos')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-6">
        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome *</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Categoria *</label>
              <select
                value={formData.categoriaId}
                onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Preço (AOA) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Unidade *</label>
              <select
                value={formData.unidade}
                onChange={(e) => setFormData({ ...formData, unidade: e.target.value })}
                className="w-full p-2 border rounded"
                required
              >
                <option value="kg">Kg</option>
                <option value="unidade">Unidade</option>
                <option value="maço">Maço</option>
                <option value="litro">Litro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Província</label>
              <input
                type="text"
                value={formData.provincia}
                onChange={(e) => setFormData({ ...formData, provincia: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Ex: Luanda"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Produtor</label>
              <input
                type="text"
                value={formData.produtor}
                onChange={(e) => setFormData({ ...formData, produtor: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição Curta</label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição Completa</label>
            <textarea
              value={formData.descricaoCompleta}
              onChange={(e) => setFormData({ ...formData, descricaoCompleta: e.target.value })}
              className="w-full p-2 border rounded"
              rows={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Dicas de Conservação</label>
            <textarea
              value={formData.conservacao}
              onChange={(e) => setFormData({ ...formData, conservacao: e.target.value })}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.activo}
                onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Produto Activo</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.destaque}
                onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Produto em Destaque</span>
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'A guardar...' : mode === 'create' ? 'Criar Produto' : 'Actualizar Produto'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/produtos')}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Card>
    </form>
  )
}
