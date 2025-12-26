'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CategoriesTable } from '@/components/admin/categorias/CategoriesTable'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function AdminCategoriasPage() {
  const router = useRouter()
  const [categorias, setCategorias] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<string>('CUSTOMER')

  useEffect(() => {
    fetchUserRole()
    fetchCategorias()
  }, [])

  const fetchUserRole = async () => {
    // TODO: Get user role from auth context
    // For now, assume ADMIN
    setUserRole('ADMIN')
  }

  const fetchCategorias = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/categorias?incluirInactivas=true')
      if (response.ok) {
        const data = await response.json()
        setCategorias(data)
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja eliminar esta categoria?')) return

    try {
      const response = await fetch(`/api/admin/categorias/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchCategorias()
      } else {
        const data = await response.json()
        alert(data.error || 'Erro ao eliminar categoria')
      }
    } catch (error) {
      console.error('Erro ao eliminar categoria:', error)
      alert('Erro ao eliminar categoria')
    }
  }

  const canManage = userRole === 'SUPER_ADMIN'

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Categorias</h1>
          <p className="text-gray-600 mt-2">Organize as categorias de produtos</p>
        </div>
        {canManage && (
          <Button onClick={() => router.push('/admin/categorias/novo')}>
            Nova Categoria
          </Button>
        )}
      </div>

      {!canManage && (
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-800">
            Apenas Super Administradores podem criar, editar ou eliminar categorias.
          </p>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-12">A carregar...</div>
      ) : categorias.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-500">Nenhuma categoria encontrada</p>
        </Card>
      ) : (
        <Card className="p-6">
          <CategoriesTable
            categorias={categorias}
            onEdit={(id) => router.push(`/admin/categorias/${id}`)}
            onDelete={handleDelete}
            canManage={canManage}
          />
        </Card>
      )}
    </div>
  )
}
