import { Metadata } from 'next';
import { Search } from 'lucide-react';
import TrackingSearch from '@/components/rastreio/TrackingSearch';

export const metadata: Metadata = {
  title: 'Rastrear Pedido | AgriConecta',
  description: 'Insira o código de rastreio para acompanhar o seu pedido',
};

export default function RastreioPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-green-600 text-white py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Search className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3">Rastrear Pedido</h1>
          <p className="text-green-100 text-lg">
            Insira o código de rastreio para acompanhar o seu pedido em tempo real
          </p>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <TrackingSearch />
        </div>
      </section>
    </main>
  );
}
