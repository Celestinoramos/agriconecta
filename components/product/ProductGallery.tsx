'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [emblaThumbRef, emblaThumbApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !emblaThumbApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, emblaThumbApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi || !emblaThumbApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaThumbApi.scrollTo(emblaApi.selectedScrollSnap());
  }, [emblaApi, emblaThumbApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const canScrollPrev = emblaApi?.canScrollPrev() ?? false;
  const canScrollNext = emblaApi?.canScrollNext() ?? false;

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsZoomOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Carousel */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {images.map((image, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={image}
                  alt={`${productName} - Imagem ${index + 1}`}
                  fill
                  className="object-cover cursor-zoom-in"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 50vw"
                  priority={index === 0}
                  onClick={() => handleImageClick(index)}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                />
                <button
                  onClick={() => handleImageClick(index)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                  aria-label="Ampliar imagem"
                >
                  <ZoomIn className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons for Desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className={cn(
                "hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all",
                !canScrollPrev && "opacity-0 pointer-events-none"
              )}
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className={cn(
                "hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all",
                !canScrollNext && "opacity-0 pointer-events-none"
              )}
              aria-label="Próxima imagem"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </>
        )}

        {/* Dots Indicator for Mobile */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => onThumbClick(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === selectedIndex
                    ? "bg-white w-6"
                    : "bg-white/60"
                )}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation for Desktop */}
      {images.length > 1 && (
        <div className="hidden md:block overflow-hidden" ref={emblaThumbRef}>
          <div className="flex gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => onThumbClick(index)}
                className={cn(
                  "relative flex-[0_0_20%] min-w-0 rounded-lg overflow-hidden border-2 transition-all",
                  index === selectedIndex
                    ? "border-green-600 ring-2 ring-green-600 ring-opacity-50"
                    : "border-transparent hover:border-gray-300"
                )}
                aria-label={`Ver imagem ${index + 1}`}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={image}
                    alt={`${productName} - Miniatura ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Zoom Dialog */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <div className="relative w-full h-full">
              <Image
                src={images[selectedIndex]}
                alt={`${productName} - Imagem ampliada ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 px-4 py-2 rounded-full">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all",
                      index === selectedIndex ? "bg-white w-6" : "bg-white/60"
                    )}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
