'use client';

// Note: This page is a client component to support interactive cart functionality.
// SEO metadata is handled by the root layout.tsx

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddToCartButton from "@/components/cart/AddToCartButton";
import produtos from "@/data/produtos.json";
import { Produto } from "@/types/cart";

export default function ProdutosPage() {
  const categorias = Array.from(new Set(produtos.map(p => p.categoria)));

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header - Mobile First */}
      <section className="bg-green-600 text-white py-8 px-4 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-green-100 hover:text-white mb-3 inline-flex items-center min-h-[44px] active:scale-95 transition-transform sm:mb-4">
            <span className="mr-2">←</span>
            <span>Voltar para Início</span>
          </Link>
          <h1 className="text-3xl font-bold mb-3 sm:text-4xl md:text-5xl md:mb-4">
            Catálogo de Produtos
          </h1>
          <p className="text-base text-green-100 sm:text-lg md:text-xl">
            Produtos frescos e de qualidade diretamente dos agricultores angolanos
          </p>
        </div>
      </section>

      {/* Filters - Mobile First with Horizontal Scroll */}
      <section className="py-4 px-4 bg-white border-b sticky top-16 z-30 sm:py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:gap-3">
            <Button variant="outline" className="min-h-[44px] whitespace-nowrap flex-shrink-0">
              Todas as Categorias
            </Button>
            {categorias.map((categoria) => (
              <Button key={categoria} variant="ghost" className="min-h-[44px] whitespace-nowrap flex-shrink-0">
                {categoria}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid - Mobile First (1 col -> 2 -> 3 -> 4) */}
      <section className="py-8 px-4 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {produtos.map((produto) => (
              <Card key={produto.id} className="overflow-hidden hover:shadow-lg transition-shadow active:scale-[0.98]">
                <div className="aspect-[4/3] w-full bg-gray-200 relative overflow-hidden">
                  <Image
                    src={produto.imagem}
                    alt={produto.nome}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">{produto.nome}</CardTitle>
                  <CardDescription className="line-clamp-2 text-sm">
                    {produto.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-600 sm:text-2xl">
                        {produto.preco.toLocaleString('pt-AO')} Kz
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>📍 {produto.provincia}</p>
                      <p>👨‍🌾 {produto.produtor}</p>
                    </div>
                    <div className="pt-2">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        {produto.categoria}
                      </span>
                    </div>
                    <AddToCartButton produto={produto as Produto} className="w-full mt-4 min-h-[44px]" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-10 px-4 bg-white sm:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-3 sm:text-2xl md:mb-4">Precisa de ajuda?</h2>
          <p className="text-gray-600 mb-5 text-sm sm:text-base md:mb-6">
            Entre em contacto connosco para mais informações sobre os produtos ou para fazer pedidos em quantidade.
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto min-h-[44px]">
            <Link href="/servicos">Ver Serviços</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
