'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface CategoriesTableProps {
  categorias: any[]
  onEdit: (id: string) => void
  onDelete: (id: string) => Promise<void>
  canManage: boolean
}

export function CategoriesTable({
  categorias,
  onEdit,
  onDelete,
  canManage,
}: CategoriesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Imagem</th>
            <th className="text-left p-3">Nome</th>
            <th className="text-left p-3">Slug</th>
            <th className="text-left p-3">Produtos</th>
            <th className="text-left p-3">Ordem</th>
            <th className="text-left p-3">Estado</th>
            {canManage && <th className="text-left p-3">Acções</th>}
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                {categoria.imagem ? (
                  <img
                    src={categoria.imagem}
                    alt={categoria.nome}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                    Sem imagem
                  </div>
                )}
              </td>
              <td className="p-3 font-medium">{categoria.nome}</td>
              <td className="p-3 text-sm text-gray-600">{categoria.slug}</td>
              <td className="p-3">
                <Badge variant="outline">
                  {categoria._count?.produtos || 0} produtos
                </Badge>
              </td>
              <td className="p-3">{categoria.ordem}</td>
              <td className="p-3">
                {categoria.activa ? (
                  <Badge variant="default">Activa</Badge>
                ) : (
                  <Badge variant="secondary">Inactiva</Badge>
                )}
              </td>
              {canManage && (
                <td className="p-3">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(categoria.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(categoria.id)}
                      disabled={categoria._count?.produtos > 0}
                      title={
                        categoria._count?.produtos > 0
                          ? 'Não é possível eliminar categoria com produtos'
                          : 'Eliminar categoria'
                      }
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
