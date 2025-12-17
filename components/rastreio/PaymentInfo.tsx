'use client';

import { useState } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatarPreco } from '@/lib/cart';

interface PaymentInfoProps {
  total: number;
  numeroPedido: string;
  pedidoId: string;
}

export default function PaymentInfo({ total, numeroPedido, pedidoId }: PaymentInfoProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const bancoNome = process.env.NEXT_PUBLIC_BANCO_NOME || 'BFA - Banco de Fomento Angola';
  const bancoIban = process.env.NEXT_PUBLIC_BANCO_IBAN || 'AO06000000000000000000000';
  const bancoTitular = process.env.NEXT_PUBLIC_BANCO_TITULAR || 'AgriConecta Lda';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copiado!`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Card className="border-yellow-300 bg-yellow-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-900">
          <AlertCircle className="h-5 w-5" />
          Aguardando Pagamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Warning */}
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
          <p className="text-sm font-medium text-yellow-900">
            ⏰ Validade: 48 horas
          </p>
          <p className="text-xs text-yellow-800 mt-1">
            Efectue a transferência dentro de 48 horas para garantir o seu pedido
          </p>
        </div>

        {/* Bank Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div>
              <p className="text-xs text-gray-600">Banco</p>
              <p className="font-medium text-sm">{bancoNome}</p>
            </div>
            <button
              onClick={() => copyToClipboard(bancoNome, 'Banco')}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label="Copiar nome do banco"
            >
              {copied === 'Banco' ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600">IBAN</p>
              <p className="font-medium font-mono text-sm truncate">{bancoIban}</p>
            </div>
            <button
              onClick={() => copyToClipboard(bancoIban, 'IBAN')}
              className="p-2 hover:bg-gray-100 rounded transition-colors ml-2"
              aria-label="Copiar IBAN"
            >
              {copied === 'IBAN' ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div>
              <p className="text-xs text-gray-600">Titular</p>
              <p className="font-medium text-sm">{bancoTitular}</p>
            </div>
            <button
              onClick={() => copyToClipboard(bancoTitular, 'Titular')}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label="Copiar titular"
            >
              {copied === 'Titular' ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 border-2 border-green-500 rounded-lg">
            <div>
              <p className="text-xs text-gray-600">Valor a Transferir</p>
              <p className="font-bold text-lg text-green-600">{formatarPreco(total)}</p>
            </div>
            <button
              onClick={() => copyToClipboard(total.toString(), 'Valor')}
              className="p-2 hover:bg-green-100 rounded transition-colors"
              aria-label="Copiar valor"
            >
              {copied === 'Valor' ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-green-600" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div>
              <p className="text-xs text-gray-600">Referência</p>
              <p className="font-medium text-sm">{numeroPedido}</p>
            </div>
            <button
              onClick={() => copyToClipboard(numeroPedido, 'Referência')}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label="Copiar referência"
            >
              {copied === 'Referência' ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-medium text-sm mb-3 text-gray-900">Como pagar:</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>Aceda à app do seu banco ou ATM</li>
            <li>Selecione &quot;Transferência Bancária&quot;</li>
            <li>Insira os dados acima</li>
            <li>Confirme a transferência</li>
            <li>Envie o comprovativo abaixo</li>
          </ol>
        </div>

        {/* Send Proof Button */}
        <Button asChild className="w-full" size="lg">
          <a href={`/pedido/${pedidoId}`}>
            Enviar Comprovativo
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
