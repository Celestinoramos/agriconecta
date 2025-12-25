'use client'

import Image from 'next/image'
import { Dica } from '@/lib/dicas/types'
import { Badge } from '@/components/ui/badge'
import { Heart, Share2 } from 'lucide-react'
import { useState } from 'react'

export function DicaCard({ dica }: { dica: Dica }) {
  const [favorited, setFavorited] = useState(false)

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Image */}
      {dica.imagem && (
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={dica.imagem}
            alt={dica.titulo}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category Badge */}
        {dica.categoria && (
          <Badge className="w-fit mb-3 bg-green-100 text-green-700 hover:bg-green-100">
            {dica.categoria}
          </Badge>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {dica.titulo}
        </h3>

        {/* Subtitle/Summary */}
        {dica.resumo && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {dica.resumo}
          </p>
        )}

        {/* Content Preview */}
        {dica.conteudo && (
          <p className="text-gray-700 text-sm mb-6 line-clamp-3 flex-1">
            {dica.conteudo}
          </p>
        )}

        {/* Author & Date */}
        <div className="text-xs text-gray-500 mb-4 flex items-center justify-between">
          {dica.autor && <span>Por: {dica.autor}</span>}
          {dica.dataCriacao && (
            <span>
              {new Date(dica.dataCriacao).toLocaleDateString('pt-AO')}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => setFavorited(!favorited)}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors flex-1 justify-center ${
              favorited
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart className="w-4 h-4" fill={favorited ? 'currentColor' : 'none'} />
            <span className="text-sm">
              {favorited ? 'Favorito' : 'Favoritar'}
            </span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded transition-colors flex-1 justify-center">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Compartilhar</span>
          </button>
        </div>
      </div>
    </article>
  )
}