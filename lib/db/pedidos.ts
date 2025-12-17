import prisma from '@/lib/prisma';
import { CriarPedidoDTO, ActualizarEstadoDTO, EstadoPedido } from '@/types/pedido';

// Constantes de configuração
const TAXA_ENTREGA_PADRAO = 0; // Pode ser calculado baseado na localização

// Gerar número do pedido: AGC-2024-00001
async function gerarNumeroPedido(): Promise<string> {
  const ano = new Date().getFullYear();
  const prefixo = `AGC-${ano}-`;
  
  // Usar transação para evitar race conditions
  return await prisma.$transaction(async (tx) => {
    const ultimoPedido = await tx.pedido.findFirst({
      where: { numero: { startsWith: prefixo } },
      orderBy: { numero: 'desc' },
      select: { numero: true },
    });
    
    let sequencia = 1;
    if (ultimoPedido) {
      const ultimoNumero = parseInt(ultimoPedido.numero.split('-')[2], 10);
      sequencia = ultimoNumero + 1;
    }
    
    return `${prefixo}${sequencia.toString().padStart(5, '0')}`;
  });
}

// Gerar número da fatura: FT-2024-00001
async function gerarNumeroFatura(): Promise<string> {
  const ano = new Date().getFullYear();
  const prefixo = `FT-${ano}-`;
  
  // Usar transação para evitar race conditions
  return await prisma.$transaction(async (tx) => {
    const ultimaFatura = await tx.pedido.findFirst({
      where: { faturaNumero: { startsWith: prefixo } },
      orderBy: { faturaNumero: 'desc' },
      select: { faturaNumero: true },
    });
    
    let sequencia = 1;
    if (ultimaFatura && ultimaFatura.faturaNumero) {
      const ultimoNumero = parseInt(ultimaFatura.faturaNumero.split('-')[2], 10);
      sequencia = ultimoNumero + 1;
    }
    
    return `${prefixo}${sequencia.toString().padStart(5, '0')}`;
  });
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
  const taxaEntrega = TAXA_ENTREGA_PADRAO;
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
      enderecoEntrega: JSON.stringify(dados.enderecoEntrega), // Stringify para SQLite
      metodoPagamento: dados.metodoPagamento,
      notasCliente: dados.notasCliente,
      subtotal,
      taxaEntrega,
      desconto,
      total,
      estado: 'PENDENTE',
      itens: {
        create: itensComSubtotal.map(item => ({
          produtoId: item.produtoId,
          produtoSlug: item.produtoSlug,
          produtoNome: item.produtoNome,
          produtoPreco: item.produtoPreco,
          produtoImagem: item.produtoImagem,
          produtoUnidade: item.produtoUnidade || 'unidade',
          quantidade: item.quantidade,
          subtotal: item.subtotal,
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
