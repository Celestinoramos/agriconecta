import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import StarRating from './StarRating';
import { ProdutoDetalhado } from '@/types/produto';
import { MapPin } from 'lucide-react';

interface ProductInfoProps {
  produto: ProdutoDetalhado;
}

export default function ProductInfo({ produto }: ProductInfoProps) {
  const disponivel = typeof produto.disponibilidade === 'boolean' 
    ? produto.disponibilidade 
    : produto.disponibilidade === 'Em stock';

  return (
    <div className="space-y-4">
      {/* Category Badge */}
      <Link href={`/produtos?categoria=${produto.categoria}`}>
        <Badge variant="outline" className="text-sm hover:bg-gray-100 transition-colors">
          {produto.categoria}
        </Badge>
      </Link>

      {/* Product Name */}
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        {produto.nome}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <StarRating rating={produto.mediaAvaliacoes} showNumber />
        <span className="text-sm text-gray-500">
          ({produto.totalAvaliacoes} {produto.totalAvaliacoes === 1 ? 'avaliação' : 'avaliações'})
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-green-600">
          {produto.preco.toLocaleString('pt-AO')} Kz
        </span>
        <span className="text-gray-500">/ {produto.unidade}</span>
      </div>

      {/* Availability Badge */}
      {disponivel ? (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Em stock
        </Badge>
      ) : (
        <Badge variant="destructive">
          Indisponível
        </Badge>
      )}

      {/* Origin */}
      <div className="flex items-start gap-2 text-sm text-gray-600 pt-2">
        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium">{produto.origem.fazenda}</p>
          <p>{produto.origem.localizacao}, {produto.origem.provincia}</p>
        </div>
      </div>

      {/* Approximate Weight */}
      {produto.pesoAproximado && (
        <p className="text-sm text-gray-500">
          Peso aproximado: {produto.pesoAproximado}
        </p>
      )}
    </div>
  );
}
