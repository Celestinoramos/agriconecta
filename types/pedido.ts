import { Prisma } from '@prisma/client';

// Tipos base gerados pelo Prisma
export type { Pedido, ItemPedido, EstadoHistorico, User, Endereco } from '@prisma/client';
export { EstadoPedido, MetodoPagamento } from '@prisma/client';

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
