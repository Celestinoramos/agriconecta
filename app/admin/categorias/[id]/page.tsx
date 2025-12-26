import { notFound } from 'next/navigation'
import { CategoryForm } from '@/components/admin/categorias/CategoryForm'
import { obterCategoria } from '@/lib/db/categorias'

export default async function EditarCategoriaPage({
  params,
}: {
  params: { id: string }
}) {
  const categoria = await obterCategoria(params.id)

  if (!categoria) {
    notFound()
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Editar Categoria</h1>
        <p className="text-gray-600 mt-2">{categoria.nome}</p>
      </div>

      <CategoryForm categoria={categoria} mode="edit" />
    </div>
  )
}
