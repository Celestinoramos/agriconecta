export const dynamic = "force-dynamic";

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AddToCartButton from '@/components/cart/AddToCartButton';
import WishlistButton from '@/components/products/WishlistButton';
import EmptyState from '@/components/ui/EmptyState';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { useWishlist } from '@/hooks/useWishlist';
import { Heart } from 'lucide-react';

export default function FavoritosPage() {
  const { wishlist, clearWishlist } = useWishlist();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-green-600 text-white py-8 px-4 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="text-green-100 hover:text-white mb-3 inline-flex items-center min-h-[44px] active:scale-95 transition-transform sm:mb-4"
          >
            <span className="mr-2">←</span>
            <span>Voltar para Início</span>
          </Link>
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <Heart className="h-8 w-8 fill-white" />
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Meus Favoritos
            </h1>
          </div>
          <p className="text-base text-green-100 sm:text-lg md:text-xl">
            {wishlist.length > 0
              ? `${wishlist.length} ${wishlist.length === 1 ? 'produto salvo' : 'produtos salvos'}`
              : 'Nenhum produto adicionado aos favoritos'}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Favoritos', href: '/favoritos' },
          ]}
        />
      </div>

      {/* Content */}
      <section className="py-8 px-4 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          {wishlist.length === 0 ? (
            <EmptyState
              title="Nenhum favorito ainda"
              description="Explore o nosso catálogo e adicione produtos aos seus favoritos clicando no ícone de coração."
              icon={Heart}
              action={{
                label: 'Ver Produtos',
                onClick: () => (window.location.href = '/produtos'),
              }}
            />
          ) : (
            <>
              {/* Clear all button */}
              <div className="flex justify-end mb-6">
                <Button
                  variant="outline"
                  onClick={clearWishlist}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Limpar Todos
                </Button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                {wishlist.map((produto) => (
                  <Card
                    key={produto.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow active:scale-[0.98] relative"
                  >
                    {/* Wishlist Button */}
                    <div className="absolute top-2 right-2 z-10">
                      <WishlistButton
                        product={produto}
                        size="sm"
                        className="bg-white/90 backdrop-blur-sm shadow-sm"
                      />
                    </div>

                    <Link href={`/produtos/${produto.slug}`}>
                      <div className="aspect-[4/3] w-full bg-gray-200 relative overflow-hidden">
                        <Image
                          src={produto.imagem}
                          alt={produto.nome}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                    </Link>
                    <CardHeader className="pb-3">
                      <Link href={`/produtos/${produto.slug}`}>
                        <CardTitle className="text-base sm:text-lg hover:text-green-600 transition-colors">
                          {produto.nome}
                        </CardTitle>
                      </Link>
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
                        <AddToCartButton
                          produto={{
                            ...produto,
                            descricao: produto.descricao || '',
                            disponibilidade: produto.disponibilidade || true,
                          }}
                          className="w-full mt-4 min-h-[44px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}