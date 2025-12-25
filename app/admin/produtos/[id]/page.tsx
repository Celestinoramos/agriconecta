import { notFound } from 'next/navigation'
import { ProductForm } from '@/components/admin/produtos/ProductForm'
import { obterProduto } from '@/lib/db/produtos'
import { listarCategorias } from '@/lib/db/categorias'

export default async function EditarProdutoPage({
  params,
}: {
  params: { id: string }
}) {
  const [produto, categorias] = await Promise.all([
    obterProduto(params.id),
    listarCategorias(),
  ])

  if (!produto) {
    notFound()
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Editar Produto</h1>
        <p className="text-gray-600 mt-2">{produto.nome}</p>
      </div>

      <ProductForm produto={produto} categorias={categorias} mode="edit" />
    </div>
  )
}
