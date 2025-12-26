'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export default function RecentlyViewed() {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">Vistos Recentemente</h2>
        </div>
        
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 pb-4" style={{ minWidth: 'min-content' }}>
            {recentlyViewed.map((produto) => (
              <Link
                key={produto.id}
                href={`/produtos/${produto.slug}`}
                className="flex-shrink-0 w-48"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square w-full bg-gray-200 relative overflow-hidden">
                    <Image
                      src={produto.imagem}
                      alt={produto.nome}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 mb-1">
                      {produto.nome}
                    </h3>
                    <p className="text-green-600 font-bold text-sm">
                      {produto.preco.toLocaleString('pt-AO')} Kz
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {produto.categoria}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
