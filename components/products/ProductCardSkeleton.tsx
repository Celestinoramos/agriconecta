'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image skeleton */}
      <div className="aspect-[4/3] w-full bg-gray-200 animate-pulse" />
      
      <CardHeader className="pb-3">
        {/* Title skeleton */}
        <div className="h-5 bg-gray-200 rounded animate-pulse mb-2" />
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {/* Price skeleton */}
          <div className="h-7 bg-gray-200 rounded animate-pulse w-32" />
          
          {/* Info skeleton */}
          <div className="space-y-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          </div>
          
          {/* Category badge skeleton */}
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
          
          {/* Button skeleton */}
          <div className="h-[44px] bg-gray-200 rounded animate-pulse mt-4" />
        </div>
      </CardContent>
    </Card>
  );
}
