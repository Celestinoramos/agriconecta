import prisma from '@/lib/prisma';
import { CriarPedidoDTO, ActualizarEstadoDTO, EstadoPedido } from '@/types/pedido';
import { Decimal } from '@prisma/client/runtime/library';

// Gerar número do pedido: AGC-2024-00001
async function gerarNumeroPedido(): Promise<string> {
  const ano = new Date().getFullYear();
  const prefixo = `AGC-${ano}-`;
  
  const ultimoPedido = await prisma.pedido.findFirst({
    where: { numero: { startsWith: prefixo } },
    orderBy: { numero: 'desc' },
  });
  
  let sequencia = 1;
  if (ultimoPedido) {
    const ultimoNumero = parseInt(ultimoPedido.numero.split('-')[2], 10);
    sequencia = ultimoNumero + 1;
  }
  
  return `${prefixo}${sequencia.toString().padStart(5, '0')}`;
}

// Gerar número da fatura: FT-2024-00001
async function gerarNumeroFatura(): Promise<string> {
  const ano = new Date().getFullYear();
  const prefixo = `FT-${ano}-`;
  
  const ultimaFatura = await prisma.pedido.findFirst({
    where: { faturaNumero: { startsWith: prefixo } },
    orderBy: { faturaNumero: 'desc' },
  });
  
  let sequencia = 1;
  if (ultimaFatura && ultimaFatura.faturaNumero) {
    const ultimoNumero = parseInt(ultimaFatura.faturaNumero.split('-')[2], 10);
    sequencia = ultimoNumero + 1;
  }
  
  return `${prefixo}${sequencia.toString().padStart(5, '0')}`;
}

export async function criarPedido(dados: CriarPedidoDTO) {
  const numero = await gerarNumeroPedido();
  const faturaNumero = await gerarNumeroFatura();
  
  // Calcular subtotais e total
  const itensComSubtotal = dados.itens.map(item => ({
    ...item,
    subtotal: item.produtoPreco * item.quantidade,
  }));
  
  const subtotal = itensComSubtotal.reduce((acc, item) => acc + item.subtotal, 0);
  const taxaEntrega = 0; // Pode ser calculado baseado na localização
  const desconto = 0;
  const total = subtotal + taxaEntrega - desconto;
  
  const pedido = await prisma.pedido.create({
    data: {
      numero,
      faturaNumero,
      faturaGeradaEm: new Date(),
      userId: dados.userId,
      clienteNome: dados.clienteNome,
      clienteEmail: dados.clienteEmail,
      clienteTelefone: dados.clienteTelefone,
      enderecoEntrega: dados.enderecoEntrega,
      metodoPagamento: dados.metodoPagamento,
      notasCliente: dados.notasCliente,
      subtotal: new Decimal(subtotal),
      taxaEntrega: new Decimal(taxaEntrega),
      desconto: new Decimal(desconto),
      total: new Decimal(total),
      itens: {
        create: itensComSubtotal.map(item => ({
          produtoId: item.produtoId,
          produtoSlug: item.produtoSlug,
          produtoNome: item.produtoNome,
          produtoPreco: new Decimal(item.produtoPreco),
          produtoImagem: item.produtoImagem,
          produtoUnidade: item.produtoUnidade || 'unidade',
          quantidade: item.quantidade,
          subtotal: new Decimal(item.subtotal),
        })),
      },
      estadoHistorico: {
        create: {
          estado: 'PENDENTE',
          nota: 'Pedido criado, aguardando pagamento',
          criadoPor: 'sistema',
        },
      },
    },
    include: {
      itens: true,
      estadoHistorico: true,
    },
  });
  
  return pedido;
}

export async function obterPedidoPorId(id: string) {
  return prisma.pedido.findUnique({
    where: { id },
    include: {
      itens: true,
      estadoHistorico: {
        orderBy: { criadoEm: 'desc' },
      },
      user: true,
    },
  });
}

export async function obterPedidoPorNumero(numero: string) {
  return prisma.pedido.findUnique({
    where: { numero },
    include: {
      itens: true,
      estadoHistorico: {
        orderBy: { criadoEm: 'desc' },
      },
    },
  });
}

export async function obterPedidoPorCodigoRastreio(codigoRastreio: string) {
  return prisma.pedido.findUnique({
    where: { codigoRastreio },
    include: {
      itens: true,
      estadoHistorico: {
        orderBy: { criadoEm: 'asc' },
      },
    },
  });
}

export async function listarPedidosDoUsuario(userId: string) {
  return prisma.pedido.findMany({
    where: { userId },
    include: {
      itens: true,
    },
    orderBy: { criadoEm: 'desc' },
  });
}

export async function listarTodosPedidos(filtros?: {
  estado?: EstadoPedido;
  pagina?: number;
  limite?: number;
}) {
  const pagina = filtros?.pagina || 1;
  const limite = filtros?.limite || 20;
  const skip = (pagina - 1) * limite;
  
  const where = filtros?.estado ? { estado: filtros.estado } : {};
  
  const [pedidos, total] = await Promise.all([
    prisma.pedido.findMany({
      where,
      include: {
        itens: true,
      },
      orderBy: { criadoEm: 'desc' },
      skip,
      take: limite,
    }),
    prisma.pedido.count({ where }),
  ]);
  
  return {
    pedidos,
    total,
    pagina,
    totalPaginas: Math.ceil(total / limite),
  };
}

export async function actualizarEstadoPedido(
  id: string,
  dados: ActualizarEstadoDTO
) {
  const camposData: Record<string, Date> = {};
  
  switch (dados.estado) {
    case 'PAGO':
      camposData.pagoEm = new Date();
      break;
    case 'EM_PREPARACAO':
      camposData.preparadoEm = new Date();
      break;
    case 'EM_TRANSITO':
      camposData.enviadoEm = new Date();
      break;
    case 'ENTREGUE':
      camposData.entregueEm = new Date();
      break;
    case 'CANCELADO':
      camposData.canceladoEm = new Date();
      break;
  }
  
  const pedido = await prisma.pedido.update({
    where: { id },
    data: {
      estado: dados.estado,
      ...camposData,
      estadoHistorico: {
        create: {
          estado: dados.estado,
          nota: dados.nota,
          criadoPor: dados.criadoPor || 'sistema',
        },
      },
    },
    include: {
      itens: true,
      estadoHistorico: {
        orderBy: { criadoEm: 'desc' },
      },
    },
  });
  
  return pedido;
}

export async function adicionarReferenciaPagamento(
  id: string,
  referencia: string,
  comprovativoUrl?: string
) {
  return prisma.pedido.update({
    where: { id },
    data: {
      referenciaPagamento: referencia,
      comprovativoUrl,
    },
  });
}
