import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import produtos from "@/data/produtos.json";
import CarouselBase from "@/components/CarouselBase";

export default function Home() {
  // Get first 3 products for featured section
  const featuredProducts = produtos.slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section mesclado com Carousel - Ajuste altura conforme header */}
      <section className="relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
        {/* Carrossel ocupa o fundo inteiro */}
        <div className="absolute inset-0 w-full h-full z-0">
          <CarouselBase />
        </div>
        {/* Overlay de conteúdo centralizado sobre o carrossel */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center">
          <h1 className="text-3xl font-bold mb-4 sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg">
            Bem-vindo ao AgriConecta
          </h1>
          <p className="text-lg mb-4 text-green-50 sm:text-xl md:text-2xl md:mb-6 drop-shadow">
            Conectando agricultores e consumidores em Angola
          </p>
          <p className="text-base mb-6 max-w-2xl mx-auto sm:text-lg md:mb-8 text-white/90 drop-shadow">
            Compre produtos frescos diretamente dos produtores locais. 
            Apoie a agricultura angolana e desfrute da qualidade dos nossos produtos.
          </p>
          <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50 min-h-[44px] w-full sm:w-auto font-semibold shadow-md">
            <Link href="/produtos">Ver Produtos</Link>
          </Button>
        </div>
        {/* Seta scroll opcional */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white text-2xl opacity-70 z-20">
          ↓
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 px-4 sm:py-14 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 sm:text-3xl md:text-4xl md:mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-base text-gray-600 sm:text-lg">
              Produtos frescos e de qualidade dos nossos agricultores
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 md:mb-8">
            {featuredProducts.map((produto) => (
              <Card key={produto.id} className="overflow-hidden hover:shadow-lg transition-shadow active:scale-[0.98]">
                <Link href={`/produtos/${produto.slug}`}>
                  <div className="aspect-[4/3] w-full bg-gray-200 relative overflow-hidden">
                    <Image
                      src={produto.imagem}
                      alt={produto.nome}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </Link>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl">
                    <Link href={`/produtos/${produto.slug}`} className="hover:text-green-600 transition-colors">
                      {produto.nome}
                    </Link>
                  </CardTitle>
                  <CardDescription>{produto.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <p className="text-xl font-bold text-green-600 sm:text-2xl">
                        {produto.preco.toLocaleString('pt-AO')} Kz
                      </p>
                      <p className="text-sm text-gray-500">{produto.provincia}</p>
                    </div>
                    <Button asChild className="w-full sm:w-auto min-h-[44px]">
                      <Link href={`/produtos/${produto.slug}`}>Ver Detalhes</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="w-full sm:w-auto min-h-[44px]">
              <Link href="/produtos">Ver Todos os Produtos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section - Mobile First Stack */}
      <section className="py-12 px-4 bg-white sm:py-14 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 sm:text-3xl md:text-4xl md:mb-4">
              Por que escolher o AgriConecta?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            <div className="text-center px-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 sm:text-xl">Produtos Frescos</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Produtos colhidos recentemente, diretamente dos agricultores para sua mesa
              </p>
            </div>

            <div className="text-center px-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 sm:text-xl">Apoio Local</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Apoie os agricultores angolanos e fortaleça a economia local
              </p>
            </div>

            <div className="text-center px-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 sm:text-xl">Qualidade Garantida</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Todos os produtos são verificados para garantir a melhor qualidade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-green-600 text-white sm:py-14 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3 sm:text-3xl md:text-4xl md:mb-4">
            Pronto para começar?
          </h2>
          <p className="text-lg mb-6 text-green-100 sm:text-xl md:mb-8">
            Explore nosso catálogo completo de produtos agrícolas
          </p>
          <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50 w-full sm:w-auto min-h-[44px]">
            <Link href="/produtos">Explorar Catálogo</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}