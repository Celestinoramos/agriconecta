// Estados do pedido como constantes
export const ESTADOS_PEDIDO = {
  PENDENTE: 'PENDENTE',
  PAGO: 'PAGO',
  EM_PREPARACAO: 'EM_PREPARACAO',
  EM_TRANSITO: 'EM_TRANSITO',
  ENTREGUE: 'ENTREGUE',
  CANCELADO: 'CANCELADO',
} as const;

export type EstadoPedido = keyof typeof ESTADOS_PEDIDO;

export const METODOS_PAGAMENTO = {
  MULTICAIXA_EXPRESS: 'MULTICAIXA_EXPRESS',
  TRANSFERENCIA_BANCARIA: 'TRANSFERENCIA_BANCARIA',
} as const;

export type MetodoPagamento = keyof typeof METODOS_PAGAMENTO;

// Tipos base do Prisma (sem enums)
export type { Pedido, ItemPedido, EstadoHistorico, User, Endereco } from '@prisma/client';

import { Prisma } from '@prisma/client';

// Pedido com relações
export type PedidoCompleto = Prisma.PedidoGetPayload<{
  include: {
    itens: true;
    estadoHistorico: true;
    user: true;
  };
}>;

// DTOs para criação
export interface CriarPedidoDTO {
  clienteNome: string;
  clienteEmail?: string;
  clienteTelefone: string;
  enderecoEntrega: {
    rua: string;
    bairro: string;
    municipio: string;
    provincia: string;
    referencia?: string;
  };
  itens: {
    produtoId: string;
    produtoSlug: string;
    produtoNome: string;
    produtoPreco: number;
    produtoImagem?: string;
    produtoUnidade?: string;
    quantidade: number;
  }[];
  metodoPagamento: 'MULTICAIXA_EXPRESS' | 'TRANSFERENCIA_BANCARIA';
  notasCliente?: string;
  userId?: string;
}

export interface ActualizarEstadoDTO {
  estado: 'PENDENTE' | 'PAGO' | 'EM_PREPARACAO' | 'EM_TRANSITO' | 'ENTREGUE' | 'CANCELADO';
  nota?: string;
  criadoPor?: string;
}

// Endereço de entrega (JSON armazenado)
export interface EnderecoEntrega {
  rua: string;
  bairro: string;
  municipio: string;
  provincia: string;
  referencia?: string;
}

// Helper para parse do endereço
export function parseEnderecoEntrega(endereco: string): EnderecoEntrega {
  try {
    return JSON.parse(endereco);
  } catch {
    return {
      rua: '',
      bairro: '',
      municipio: '',
      provincia: '',
    };
  }
}
