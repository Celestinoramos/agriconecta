'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function TrackingSearch() {
  const router = useRouter();
  const [codigo, setCodigo] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!codigo.trim()) {
      toast.error('Por favor, insira um código de rastreio');
      return;
    }

    setIsSearching(true);

    try {
      // Check if order exists
      const response = await fetch(`/api/pedidos/rastreio/${codigo.trim()}`);
      
      if (!response.ok) {
        throw new Error('Pedido não encontrado');
      }

      const data = await response.json();
      
      // Redirect to tracking page
      router.push(`/pedido/${data.pedido.id}/rastreio`);
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      toast.error('Código de rastreio inválido');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rastrear Pedido</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="codigo" className="block text-sm font-medium mb-2">
              Código de Rastreio ou Número do Pedido
            </label>
            <input
              id="codigo"
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: AGC-2024-00001"
              disabled={isSearching}
            />
            <p className="mt-1 text-xs text-gray-500">
              Insira o código de rastreio enviado por email ou o número do pedido
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                A procurar...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Rastrear Pedido
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            💡 <strong>Dica:</strong> O código de rastreio encontra-se no email de confirmação ou na página do pedido.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
