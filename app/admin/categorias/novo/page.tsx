import { CategoryForm } from '@/components/admin/categorias/CategoryForm'

export default async function NovaCategoriaPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nova Categoria</h1>
        <p className="text-gray-600 mt-2">Criar uma nova categoria de produtos</p>
      </div>

      <CategoryForm mode="create" />
    </div>
  )
}
