import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import produtos from "@/data/produtos.json";

export const metadata = {
  title: "Catálogo de Produtos - AgriConecta",
  description: "Explore nosso catálogo completo de produtos agrícolas frescos de Angola",
};

export default function ProdutosPage() {
  const categorias = Array.from(new Set(produtos.map(p => p.categoria)));

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-green-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-green-100 hover:text-white mb-4 inline-block">
            ← Voltar para Início
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Catálogo de Produtos
          </h1>
          <p className="text-xl text-green-100">
            Produtos frescos e de qualidade diretamente dos agricultores angolanos
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Todas as Categorias</Button>
            {categorias.map((categoria) => (
              <Button key={categoria} variant="ghost">
                {categoria}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {produtos.map((produto) => (
              <Card key={produto.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square w-full bg-gray-200 relative overflow-hidden">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{produto.nome}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {produto.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        {produto.preco.toLocaleString('pt-AO')} Kz
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>📍 {produto.provincia}</p>
                      <p>👨‍🌾 {produto.produtor}</p>
                    </div>
                    <div className="pt-2">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        {produto.categoria}
                      </span>
                    </div>
                    <Button className="w-full mt-4">Adicionar ao Carrinho</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Precisa de ajuda?</h2>
          <p className="text-gray-600 mb-6">
            Entre em contacto connosco para mais informações sobre os produtos ou para fazer pedidos em quantidade.
          </p>
          <Button asChild size="lg">
            <Link href="/servicos">Ver Serviços</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
