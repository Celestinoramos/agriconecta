'use client';

import { CheckCircle, Clock, Package, Truck, Home, XCircle } from 'lucide-react';
import { EstadoPedido } from '@/types/pedido';

interface TrackingStatusProps {
  estado: EstadoPedido;
  nota?: string | null;
}

const ESTADO_CONFIG = {
  PENDENTE: {
    label: 'Aguardando Pagamento',
    icon: Clock,
    descricao: 'O seu pedido foi recebido. Aguardamos a confirmação do pagamento.',
    cor: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-500',
  },
  PAGO: {
    label: 'Pagamento Confirmado',
    icon: CheckCircle,
    descricao: 'Pagamento confirmado! O seu pedido será preparado em breve.',
    cor: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-500',
  },
  EM_PREPARACAO: {
    label: 'Em Preparação',
    icon: Package,
    descricao: 'O seu pedido está a ser preparado pelos nossos agricultores.',
    cor: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-500',
  },
  EM_TRANSITO: {
    label: 'Em Trânsito',
    icon: Truck,
    descricao: 'O seu pedido está a caminho! Em breve será entregue.',
    cor: 'text-purple-600',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-500',
  },
  ENTREGUE: {
    label: 'Entregue',
    icon: Home,
    descricao: 'Pedido entregue com sucesso! Obrigado por comprar no AgriConecta.',
    cor: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-500',
  },
  CANCELADO: {
    label: 'Cancelado',
    icon: XCircle,
    descricao: 'Este pedido foi cancelado.',
    cor: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-500',
  },
};

export default function TrackingStatus({ estado, nota }: TrackingStatusProps) {
  const config = ESTADO_CONFIG[estado];
  const Icon = config.icon;

  return (
    <div className={`p-6 rounded-lg border-2 ${config.borderColor} ${config.bgColor}`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full ${config.bgColor} ${config.cor}`}>
          <Icon className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <h2 className={`text-2xl font-bold mb-2 ${config.cor}`}>
            {config.label}
          </h2>
          <p className="text-gray-700">
            {nota || config.descricao}
          </p>
        </div>
      </div>
    </div>
  );
}
