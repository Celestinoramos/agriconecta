'use client';

import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DeliveryAddressProps {
  clienteNome: string;
  rua: string;
  bairro: string;
  municipio: string;
  provincia: string;
  referencia?: string;
}

export default function DeliveryAddress({
  clienteNome,
  rua,
  bairro,
  municipio,
  provincia,
  referencia,
}: DeliveryAddressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          Endereço de Entrega
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <p className="font-semibold text-gray-900">{clienteNome}</p>
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <p>{rua}</p>
          <p>{bairro}</p>
          <p>{municipio}, {provincia}</p>
        </div>
        {referencia && (
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-600">Ponto de Referência</p>
            <p className="text-sm text-gray-700">{referencia}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
