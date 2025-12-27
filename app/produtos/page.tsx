'use client';

import { Suspense } from "react";
import ProdutosClientOnly from './ProdutosClientOnly';

export const dynamic = "force-dynamic";

export default function ProdutosPage() {
  return (
    <Suspense fallback={<div className="py-10 text-center">A carregar...</div>}>
      <ProdutosClientOnly />
    </Suspense>
  );
}