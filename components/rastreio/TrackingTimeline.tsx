'use client';

import { CheckCircle, Clock, Package, Truck, Home, XCircle } from 'lucide-react';
import { EstadoPedido } from '@/types/pedido';

interface TimelineItem {
  estado: EstadoPedido;
  data?: Date;
  descricao: string;
  icon: React.ReactNode;
  concluido: boolean;
  activo: boolean;
}

interface TrackingTimelineProps {
  estadoActual: EstadoPedido;
  estadoHistorico: Array<{
    estado: EstadoPedido;
    criadoEm: Date;
    nota?: string | null;
  }>;
}

const ESTADO_CONFIG = {
  PENDENTE: {
    label: 'Pedido Recebido',
    icon: Clock,
    descricao: 'Aguardando pagamento',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-500',
  },
  PAGO: {
    label: 'Pagamento Confirmado',
    icon: CheckCircle,
    descricao: 'Pagamento verificado',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-500',
  },
  EM_PREPARACAO: {
    label: 'Em Preparação',
    icon: Package,
    descricao: 'Preparando o seu pedido',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-500',
  },
  EM_TRANSITO: {
    label: 'Em Trânsito',
    icon: Truck,
    descricao: 'Pedido a caminho',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-500',
  },
  ENTREGUE: {
    label: 'Entregue',
    icon: Home,
    descricao: 'Pedido entregue com sucesso',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-500',
  },
  CANCELADO: {
    label: 'Cancelado',
    icon: XCircle,
    descricao: 'Pedido cancelado',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-500',
  },
};

const ORDEM_ESTADOS: EstadoPedido[] = ['PENDENTE', 'PAGO', 'EM_PREPARACAO', 'EM_TRANSITO', 'ENTREGUE'];

export default function TrackingTimeline({ estadoActual, estadoHistorico }: TrackingTimelineProps) {
  // Build timeline items
  const timelineItems: TimelineItem[] = [];
  
  if (estadoActual === 'CANCELADO') {
    // Show cancelled state
    const cancelledHistory = estadoHistorico.find(h => h.estado === 'CANCELADO');
    const config = ESTADO_CONFIG.CANCELADO;
    const Icon = config.icon;
    
    timelineItems.push({
      estado: 'CANCELADO',
      data: cancelledHistory?.criadoEm,
      descricao: cancelledHistory?.nota || config.descricao,
      icon: <Icon className="h-6 w-6" />,
      concluido: true,
      activo: true,
    });
  } else {
    // Normal flow
    const indiceEstadoActual = ORDEM_ESTADOS.indexOf(estadoActual);
    
    ORDEM_ESTADOS.forEach((estado, index) => {
      const config = ESTADO_CONFIG[estado];
      const Icon = config.icon;
      const history = estadoHistorico.find(h => h.estado === estado);
      const concluido = index <= indiceEstadoActual;
      const activo = estado === estadoActual;
      
      timelineItems.push({
        estado,
        data: history?.criadoEm,
        descricao: history?.nota || config.descricao,
        icon: <Icon className="h-6 w-6" />,
        concluido,
        activo,
      });
    });
  }

  return (
    <div className="space-y-6">
      {timelineItems.map((item, index) => {
        const config = ESTADO_CONFIG[item.estado];
        const isLast = index === timelineItems.length - 1;

        return (
          <div key={item.estado} className="relative">
            {/* Connector Line */}
            {!isLast && (
              <div
                className={`absolute left-[23px] top-[48px] w-0.5 h-full ${
                  item.concluido ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            )}

            {/* Timeline Item */}
            <div className="flex gap-4">
              {/* Icon */}
              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    item.concluido || item.activo
                      ? `${config.bgColor} ${config.borderColor} ${config.color}`
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}
                >
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div
                  className={`p-4 rounded-lg border-2 ${
                    item.activo
                      ? `${config.bgColor} ${config.borderColor}`
                      : item.concluido
                      ? 'bg-white border-green-500'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3
                      className={`font-semibold ${
                        item.activo || item.concluido ? config.color : 'text-gray-400'
                      }`}
                    >
                      {config.label}
                    </h3>
                    {item.concluido && (
                      <CheckCircle className={`h-5 w-5 ${config.color}`} />
                    )}
                  </div>
                  
                  <p
                    className={`text-sm ${
                      item.activo || item.concluido ? 'text-gray-700' : 'text-gray-400'
                    }`}
                  >
                    {item.descricao}
                  </p>
                  
                  {item.data && (
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(item.data).toLocaleString('pt-AO', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
