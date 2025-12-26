'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface CategoryFormProps {
  categoria?: any
  mode: 'create' | 'edit'
}

export function CategoryForm({ categoria, mode }: CategoryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    nome: categoria?.nome || '',
    descricao: categoria?.descricao || '',
    imagem: categoria?.imagem || '',
    ordem: categoria?.ordem || 0,
    activa: categoria?.activa ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const url = mode === 'create'
        ? '/api/admin/categorias'
        : `/api/admin/categorias/${categoria.id}`
      
      const response = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erro ao guardar categoria')
      }

      router.push('/admin/categorias')
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
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">URL da Imagem</label>
            <input
              type="text"
              value={formData.imagem}
              onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="https://..."
            />
            {formData.imagem && (
              <img
                src={formData.imagem}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ordem</label>
            <input
              type="number"
              value={formData.ordem}
              onChange={(e) => setFormData({ ...formData, ordem: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.activa}
                onChange={(e) => setFormData({ ...formData, activa: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Categoria Activa</span>
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'A guardar...' : mode === 'create' ? 'Criar Categoria' : 'Actualizar Categoria'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/categorias')}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Card>
    </form>
  )
}
