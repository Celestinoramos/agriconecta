import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            Produto não encontrado
          </h1>
          <p className="text-lg text-gray-600">
            O produto que procura não existe ou foi removido do nosso catálogo.
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-500">
          Pode ter sido movido, renomeado ou está temporariamente indisponível.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild variant="default" size="lg">
            <Link href="/produtos" className="gap-2">
              <ArrowLeft className="h-5 w-5" />
              Voltar ao Catálogo
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/" className="gap-2">
              <Home className="h-5 w-5" />
              Ir para Início
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <div className="pt-8 border-t">
          <p className="text-sm text-gray-600">
            Precisa de ajuda? Entre em contacto connosco através do{' '}
            <Link href="/servicos" className="text-green-600 hover:underline font-medium">
              WhatsApp
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
