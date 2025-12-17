import { NextRequest, NextResponse } from 'next/server';
import { checkoutSchema } from '@/lib/validations/checkout';
import { criarPedido } from '@/lib/db/pedidos';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = checkoutSchema.parse(body);

    // Create order in database
    const pedido = await criarPedido({
      clienteNome: validatedData.clienteNome,
      clienteEmail: validatedData.clienteEmail || undefined,
      clienteTelefone: validatedData.clienteTelefone,
      enderecoEntrega: validatedData.endereco,
      itens: validatedData.itens,
      metodoPagamento: 'TRANSFERENCIA_BANCARIA',
      notasCliente: validatedData.notas,
      userId: undefined, // Guest checkout for now
    });

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
