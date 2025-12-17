import { NextRequest, NextResponse } from 'next/server';
import {
  obterPedidoPorId,
  actualizarEstadoPedido,
  adicionarReferenciaPagamento,
} from '@/lib/db/pedidos';
import { ActualizarEstadoDTO } from '@/types/pedido';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pedido = await obterPedidoPorId(params.id);
    
    if (!pedido) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(pedido);
  } catch (error) {
    console.error('Erro ao obter pedido:', error);
    return NextResponse.json(
      { error: 'Erro ao obter pedido' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Verificar se o pedido existe
    const pedidoExistente = await obterPedidoPorId(params.id);
    if (!pedidoExistente) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }
    
    // Actualizar estado
    if (body.estado) {
      const dados: ActualizarEstadoDTO = {
        estado: body.estado,
        nota: body.nota,
        criadoPor: body.criadoPor,
      };
      
      const pedido = await actualizarEstadoPedido(params.id, dados);
      return NextResponse.json(pedido);
    }
    
    // Actualizar referência de pagamento
    if (body.referenciaPagamento) {
      const pedido = await adicionarReferenciaPagamento(
        params.id,
        body.referenciaPagamento,
        body.comprovativoUrl
      );
      return NextResponse.json(pedido);
    }
    
    return NextResponse.json(
      { error: 'Nenhum campo para actualizar' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Erro ao actualizar pedido:', error);
    return NextResponse.json(
      { error: 'Erro ao actualizar pedido' },
      { status: 500 }
    );
  }
}
