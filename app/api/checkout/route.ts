import { NextRequest, NextResponse } from 'next/server';
import { checkoutSchema } from '@/lib/validations/checkout';
import { criarPedido } from '@/lib/db/pedidos';
import { enviarEmailPedidoCriado } from '@/lib/email/send';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = checkoutSchema.parse(body);

    // Create order in database
    const pedido = await criarPedido({
      clienteNome: validatedData.clienteNome,
      clienteEmail: validatedData.clienteEmail,
      clienteTelefone: validatedData.clienteTelefone || undefined,
      enderecoEntrega: validatedData.endereco,
      itens: validatedData.itens,
      metodoPagamento: 'TRANSFERENCIA_BANCARIA',
      notasCliente: validatedData.notas,
      userId: undefined, // Guest checkout for now
    });

    // Enviar emails (não bloquear resposta se falhar)
    try {
      const pedidoParaEmail = {
        id: pedido.id,
        numero: pedido.numero,
        clienteNome: pedido.clienteNome,
        clienteEmail: pedido.clienteEmail,
        clienteTelefone: pedido.clienteTelefone || '',
        total: pedido.total,
        subtotal: pedido.subtotal,
        taxaEntrega: pedido.taxaEntrega,
        itens: pedido.itens.map(item => ({
          produtoNome: item.produtoNome,
          quantidade: item.quantidade,
          produtoPreco: item.produtoPreco,
          subtotal: item.subtotal,
        })),
        enderecoEntrega: JSON.parse(pedido.enderecoEntrega),
        codigoRastreio: pedido.codigoRastreio,
      }
      
      // Enviar em background (não aguardar)
      enviarEmailPedidoCriado(pedidoParaEmail).catch(err => {
        console.error('Erro ao enviar emails do pedido:', err)
      })
    } catch (emailError) {
      console.error('Erro ao preparar emails:', emailError)
    }

    return NextResponse.json({
      success: true,
      pedidoId: pedido.id,
      numero: pedido.numero,
      message: 'Pedido criado com sucesso',
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar pedido:', error);

    if ((error as any).name === 'ZodError') {
      return NextResponse.json({
        success: false,
        error: 'Dados inválidos',
        details: (error as any).errors,
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: (error as Error).message || 'Erro ao processar pedido',
    }, { status: 500 });
  }
}
