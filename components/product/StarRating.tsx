import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number; // 0-5
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export default function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showNumber = false,
  className 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`${rating} de ${maxRating} estrelas`}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= Math.floor(rating);
        const isHalfFilled = starNumber === Math.ceil(rating) && rating % 1 !== 0;

        return (
          <div key={index} className="relative">
            <Star
              className={cn(
                sizeClasses[size],
                isFilled || isHalfFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              )}
              aria-hidden="true"
            />
            {isHalfFilled && (
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
                <Star
                  className={cn(sizeClasses[size], 'fill-yellow-400 text-yellow-400')}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        );
      })}
      {showNumber && (
        <span className={cn("ml-1 text-gray-600 font-medium", textSizeClasses[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
