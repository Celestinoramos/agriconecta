import { NextRequest, NextResponse } from 'next/server';
import { criarPedido, listarTodosPedidos } from '@/lib/db/pedidos';
import { CriarPedidoDTO, EstadoPedido } from '@/types/pedido';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const estado = searchParams.get('estado') as EstadoPedido | null;
    const pagina = parseInt(searchParams.get('pagina') || '1', 10);
    const limite = parseInt(searchParams.get('limite') || '20', 10);
    
    const resultado = await listarTodosPedidos({
      estado: estado || undefined,
      pagina,
      limite,
    });
    
    return NextResponse.json(resultado);
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    return NextResponse.json(
      { error: 'Erro ao listar pedidos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CriarPedidoDTO = await request.json();
    
    // Validação básica
    if (!body.clienteNome || !body.) {
      return NextResponse.json(
        { error: 'Nome e telefone do cliente são obrigatórios' },
        { status: 400 }
      );
    }
    
    if (!body.enderecoEntrega || !body.enderecoEntrega.provincia) {
      return NextResponse.json(
        { error: 'Endereço de entrega é obrigatório' },
        { status: 400 }
      );
    }
    
    if (!body.itens || body.itens.length === 0) {
      return NextResponse.json(
        { error: 'O pedido deve ter pelo menos um item' },
        { status: 400 }
      );
    }
    
    if (!body.metodoPagamento) {
      return NextResponse.json(
        { error: 'Método de pagamento é obrigatório' },
        { status: 400 }
      );
    }
    
    const pedido = await criarPedido(body);
    
    return NextResponse.json(pedido, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return NextResponse.json(
      { error: 'Erro ao criar pedido' },
      { status: 500 }
    );
  }
}
