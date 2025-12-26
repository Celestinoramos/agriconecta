import { ProductForm } from '@/components/admin/produtos/ProductForm'
import { listarCategorias } from '@/lib/db/categorias'

export default async function NovoProdutoPage() {
  const categorias = await listarCategorias()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Novo Produto</h1>
        <p className="text-gray-600 mt-2">Adicionar um novo produto ao catálogo</p>
      </div>

      <ProductForm categorias={categorias} mode="create" />
    </div>
  )
}
