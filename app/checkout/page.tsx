import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import CheckoutForm from '@/components/checkout/CheckoutForm';

export const metadata: Metadata = {
  title: 'Checkout - AgriConecta',
  description: 'Finalize a sua compra',
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-green-600 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold">Finalizar Compra</h1>
          <p className="text-green-100 mt-1">Preencha os dados para completar o seu pedido</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <CheckoutForm />
        </div>
      </section>
    </main>
  );
}
