'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';

interface PaymentInstructionsProps {
  total: string;
  numeroPedido: string;
  qrCodeUrl?: string;
}

export default function PaymentInstructions({ 
  total, 
  numeroPedido,
  qrCodeUrl 
}: PaymentInstructionsProps) {
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
    <Card>
      <CardHeader>
        <CardTitle>Dados para Pagamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm font-medium text-yellow-800">
            ⏰ Validade: 48 horas
          </p>
          <p className="text-xs text-yellow-700 mt-1">
            Efectue a transferência dentro de 48 horas para garantir o seu pedido
          </p>
        </div>

        {/* Bank Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-xs text-gray-600">Banco</p>
              <p className="font-medium">{bancoNome}</p>
            </div>
            <button
              onClick={() => copyToClipboard(bancoNome, 'Banco')}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              aria-label="Copiar nome do banco"
            >
              {copied === 'Banco' ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600">IBAN</p>
              <p className="font-medium font-mono text-sm truncate">{bancoIban}</p>
            </div>
            <button
              onClick={() => copyToClipboard(bancoIban, 'IBAN')}
              className="p-2 hover:bg-gray-200 rounded transition-colors ml-2"
              aria-label="Copiar IBAN"
            >
              {copied === 'IBAN' ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-xs text-gray-600">Titular</p>
              <p className="font-medium">{bancoTitular}</p>
            </div>
            <button
              onClick={() => copyToClipboard(bancoTitular, 'Titular')}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
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
              <p className="font-bold text-lg text-green-600">{total}</p>
            </div>
            <button
              onClick={() => copyToClipboard(total.replace(/[^\d]/g, ''), 'Valor')}
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

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-xs text-gray-600">Referência</p>
              <p className="font-medium">{numeroPedido}</p>
            </div>
            <button
              onClick={() => copyToClipboard(numeroPedido, 'Referência')}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
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

        {/* QR Code */}
        {qrCodeUrl && (
          <div className="flex flex-col items-center py-4">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Ou use o QR Code para pagamento:
            </p>
            <div className="relative w-48 h-48 bg-white border-2 border-gray-200 rounded-lg p-2">
              <Image
                src={qrCodeUrl}
                alt="QR Code para Pagamento"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-sm mb-2">Como pagar:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
            <li>Aceda à app do seu banco ou ATM</li>
            <li>Selecione "Transferência Bancária"</li>
            <li>Insira os dados acima</li>
            <li>Confirme a transferência</li>
            <li>Envie o comprovativo abaixo</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
