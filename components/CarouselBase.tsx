"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const images = [
  { url: "/images/agri3.jpg", alt: "Foto campo 1" },
  { url: "/images/agri2.jpg", alt: "Foto campo 2" },
  { url: "/images/agri3.jpg", alt: "Foto campo 3" },
];

// 1m7s = 67 segundos = 67000 milissegundos
const SLIDE_TIME = 67000;  // Duração visível (ms)
const FADE_TIME = 2200;    // Tempo da transição (ms) – ajuste se quiser mais suave

export default function CarouselBase() {
  const [current, setCurrent] = useState(0);
  const [nextIdx, setNextIdx] = useState<number|null>(null);
  const [fadeProgress, setFadeProgress] = useState<number>(1); // 0: anterior, 1: nova imagem
  const timerRef = useRef<NodeJS.Timeout|null>(null);
  const fadeTimerRef = useRef<NodeJS.Timeout|null>(null);

  // Auto-slide crossfade
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setNextIdx((current + 1) % images.length);
      setFadeProgress(0);

      fadeTimerRef.current = setTimeout(() => {
        setCurrent((current + 1) % images.length);
        setNextIdx(null);
        setFadeProgress(1);
      }, FADE_TIME);
    }, SLIDE_TIME);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [current]);

  // Setas para troca manual, sempre com crossfade
  const manualGoTo = (newIdx:number) => {
    if (newIdx === current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    setNextIdx(newIdx);
    setFadeProgress(0);

    fadeTimerRef.current = setTimeout(() => {
      setCurrent(newIdx);
      setNextIdx(null);
      setFadeProgress(1);
    }, FADE_TIME);
  };

  const prev = () => manualGoTo((current - 1 + images.length) % images.length);
  const next = () => manualGoTo((current + 1) % images.length);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none" aria-label="Carrossel agrícola" role="region">
      {/* Imagem atual */}
      <div className="absolute inset-0 w-full h-full" 
        style={{
          opacity: nextIdx !== null ? fadeProgress : 1,
          zIndex: 2,
          transition: `opacity ${FADE_TIME}ms linear`
        }}>
        <Image
          src={images[current].url}
          alt={images[current].alt}
          fill
          className="object-cover animate-kenburns"
          sizes="100vw"
          draggable={false}
          priority={true}
        />
        <div className="absolute inset-0 bg-green-700/40" />
      </div>
      {/* Imagem próxima (crossfade) */}
      {nextIdx !== null && (
        <div className="absolute inset-0 w-full h-full" 
          style={{
            opacity: 1 - fadeProgress,
            zIndex: 3,
            transition: `opacity ${FADE_TIME}ms linear`
          }}>
          <Image
            src={images[nextIdx].url}
            alt={images[nextIdx].alt}
            fill
            className="object-cover animate-kenburns"
            sizes="100vw"
            draggable={false}
            priority={false}
          />
          <div className="absolute inset-0 bg-green-700/40" />
        </div>
      )}
      {/* Botão anterior */}
      <button
        onClick={prev}
        aria-label="Imagem anterior"
        tabIndex={0}
        className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-10 hover:bg-white rounded-full p-3 shadow-md transition focus:outline-green-600"
        style={{ minWidth: 44, minHeight: 44 }}
      >
        <span className="text-2xl text-green-900 select-none" aria-hidden="true">{'‹'}</span>
      </button>
      {/* Botão próximo */}
      <button
        onClick={next}
        aria-label="Próxima imagem"
        tabIndex={0}
        className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-10 hover:bg-white rounded-full p-3 shadow-md transition focus:outline-green-600"
        style={{ minWidth: 44, minHeight: 44 }}
      >
        <span className="text-2xl text-green-900 select-none" aria-hidden="true">{'›'}</span>
      </button>
      <style jsx global>{`
        @keyframes kenburns {
          from {transform: scale(1);}
          to {transform: scale(1.06) translateY(-8px);}
        }
        .animate-kenburns {
          animation: kenburns ${SLIDE_TIME + FADE_TIME}ms linear forwards;
        }
      `}</style>
    </div>
  );
}