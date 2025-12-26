'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AddToCartButton from '@/components/cart/AddToCartButton';
import WishlistButton from './WishlistButton';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { Produto } from '@/types/cart';

interface InfiniteProductGridProps {
  initialProducts: any[];
  totalProducts: number;
  onLoadMore?: (page: number) => Promise<any[]>;
}

export default function InfiniteProductGrid({
  initialProducts,
  totalProducts,
  onLoadMore,
}: InfiniteProductGridProps) {
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProducts.length < totalProducts);

  const loadMore = async () => {
    if (loading || !hasMore || !onLoadMore) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const newProducts = await onLoadMore(nextPage);
      
      if (newProducts.length > 0) {
        setProducts((prev) => [...prev, ...newProducts]);
        setCurrentPage(nextPage);
        setHasMore(products.length + newProducts.length < totalProducts);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoading(false);
    }
  };

  const { sentinelRef } = useInfiniteScroll(loadMore, {
    threshold: 0.1,
    rootMargin: '100px',
  });

  return (
    <div>
      {/* Products Count */}
      <div className="mb-4 text-sm text-gray-600">
        A mostrar <span className="font-semibold">{products.length}</span> de{' '}
        <span className="font-semibold">{totalProducts}</span> produtos
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {products.map((produto) => (
          <Card
            key={produto.id}
            className="overflow-hidden hover:shadow-lg transition-shadow active:scale-[0.98] relative"
          >
            {/* Wishlist Button - Positioned absolutely */}
            <div className="absolute top-2 right-2 z-10">
              <WishlistButton
                product={{
                  id: produto.id,
                  slug: produto.slug,
                  nome: produto.nome,
                  descricao: produto.descricao,
                  imagem: produto.imagem,
                  preco: produto.preco,
                  categoria: produto.categoria,
                  produtor: produto.produtor,
                  provincia: produto.provincia,
                  disponibilidade: produto.disponibilidade,
                }}
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
                <AddToCartButton
                  produto={produto as Produto}
                  className="w-full mt-4 min-h-[44px]"
                />
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Loading skeletons */}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {/* Sentinel for infinite scroll */}
      {hasMore && !loading && (
        <div ref={sentinelRef} className="h-20 flex items-center justify-center">
          <div className="text-sm text-gray-500">A carregar mais produtos...</div>
        </div>
      )}

      {/* End message */}
      {!hasMore && products.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          Todos os produtos foram carregados
        </div>
      )}
    </div>
  );
}
