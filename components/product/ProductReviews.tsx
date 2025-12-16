import Image from 'next/image';
import { Avaliacao } from '@/types/produto';
import StarRating from './StarRating';
import { User } from 'lucide-react';

interface ProductReviewsProps {
  avaliacoes: Avaliacao[];
  mediaAvaliacoes: number;
  totalAvaliacoes: number;
}

export default function ProductReviews({ avaliacoes, mediaAvaliacoes, totalAvaliacoes }: ProductReviewsProps) {
  // Calculate star distribution
  const starDistribution = [5, 4, 3, 2, 1].map(stars => {
    const count = avaliacoes.filter(av => Math.floor(av.nota) === stars).length;
    const percentage = totalAvaliacoes > 0 ? (count / totalAvaliacoes) * 100 : 0;
    return { stars, count, percentage };
  });

  // Format date to Portuguese
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-AO', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Show max 5 reviews
  const reviewsToShow = avaliacoes.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center sm:border-r sm:pr-6 sm:min-w-[200px]">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {mediaAvaliacoes.toFixed(1)}
            </div>
            <StarRating rating={mediaAvaliacoes} size="lg" />
            <p className="text-sm text-gray-600 mt-2">
              {totalAvaliacoes} {totalAvaliacoes === 1 ? 'avaliação' : 'avaliações'}
            </p>
          </div>

          {/* Star Distribution */}
          <div className="flex-1 space-y-2">
            {starDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm text-gray-700 w-10">{stars} ★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Avaliações dos Clientes</h3>
        {reviewsToShow.map((avaliacao) => (
          <div key={avaliacao.id} className="bg-white rounded-lg border p-6 space-y-3">
            {/* Reviewer Info */}
            <div className="flex items-start gap-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {avaliacao.avatar ? (
                  <Image
                    src={avaliacao.avatar}
                    alt={avaliacao.autor}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{avaliacao.autor}</p>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={avaliacao.nota} size="sm" />
                  <span className="text-xs text-gray-500">
                    {formatDate(avaliacao.data)}
                  </span>
                </div>
              </div>
            </div>

            {/* Comment */}
            <p className="text-gray-700 leading-relaxed">
              {avaliacao.comentario}
            </p>
          </div>
        ))}

        {avaliacoes.length > 5 && (
          <p className="text-sm text-gray-600 text-center pt-2">
            Mostrando {reviewsToShow.length} de {totalAvaliacoes} avaliações
          </p>
        )}
      </div>
    </div>
  );
}
