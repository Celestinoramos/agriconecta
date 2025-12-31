import { NextRequest, NextResponse } from 'next/server';
import {
  obterPedidoPorId,
  actualizarEstadoPedido,
  adicionarReferenciaPagamento,
} from '@/lib/db/pedidos';
import { ActualizarEstadoDTO, parseEnderecoEntrega } from '@/types/pedido';
import { enviarEmailPorMudancaEstado } from '@/lib/email/send';
import type { PedidoEmailData } from '@/lib/email/send';

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
      
      // Enviar email apropriado após actualizar estado
      const estadoAnterior = pedidoExistente.estado
      const estadoNovo = pedido.estado

      if (estadoAnterior !== estadoNovo) {
        // Preparar dados do pedido para email
        try {
          const pedidoParaEmail: PedidoEmailData = {
            id: pedido.id,
            numero: pedido.numero,
            clienteNome: pedido.clienteNome,
            clienteEmail: pedido.clienteEmail,
            : pedido. || '',
            itens: pedido.itens.map((item: any) => ({
              nome: item.produtoNome,
              quantidade: item.quantidade,
              precoUnitario: Number(item.produtoPreco),
              subtotal: Number(item.subtotal),
            })),
            subtotal: Number(pedido.subtotal),
            taxaEntrega: Number(pedido.taxaEntrega),
            total: Number(pedido.total),
            endereco: typeof pedido.enderecoEntrega === 'string' 
              ? parseEnderecoEntrega(pedido.enderecoEntrega)
              : pedido.enderecoEntrega,
            codigoRastreio: pedido.codigoRastreio,
          }

          // Enviar email em background (não bloquear resposta)
          enviarEmailPorMudancaEstado(pedidoParaEmail, estadoAnterior, estadoNovo, body.nota)
            .then(result => {
              console.log(`📧 Email enviado para mudança ${estadoAnterior} → ${estadoNovo}:`, result)
            })
            .catch(err => {
              console.error('❌ Erro ao enviar email de mudança de estado:', err)
            })
        } catch (emailError) {
          console.error('❌ Erro ao preparar email de mudança de estado:', emailError)
        }
      }
      
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
