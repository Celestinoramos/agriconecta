import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import produtos from "@/data/produtos.json";

export default function Home() {
  // Get first 3 products for featured section
  const featuredProducts = produtos.slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bem-vindo ao AgriConecta
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Conectando agricultores e consumidores em Angola
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Compre produtos frescos diretamente dos produtores locais. 
            Apoie a agricultura angolana e desfrute da qualidade dos nossos produtos.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50">
              <Link href="/produtos">Ver Produtos</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-green-700">
              <Link href="/servicos">Serviços para Agricultores</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-lg text-gray-600">
              Produtos frescos e de qualidade dos nossos agricultores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((produto) => (
              <Card key={produto.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square w-full bg-gray-200 relative overflow-hidden">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{produto.nome}</CardTitle>
                  <CardDescription>{produto.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {produto.preco.toLocaleString('pt-AO')} Kz
                      </p>
                      <p className="text-sm text-gray-500">{produto.provincia}</p>
                    </div>
                    <Button>Comprar</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/produtos">Ver Todos os Produtos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o AgriConecta?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Produtos Frescos</h3>
              <p className="text-gray-600">
                Produtos colhidos recentemente, diretamente dos agricultores para sua mesa
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Apoio Local</h3>
              <p className="text-gray-600">
                Apoie os agricultores angolanos e fortaleça a economia local
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualidade Garantida</h3>
              <p className="text-gray-600">
                Todos os produtos são verificados para garantir a melhor qualidade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Explore nosso catálogo completo de produtos agrícolas
          </p>
          <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50">
            <Link href="/produtos">Explorar Catálogo</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
