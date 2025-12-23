import { NextRequest, NextResponse } from 'next/server';
import { checkoutSchema } from '@/lib/validations/checkout';
import { criarPedido } from '@/lib/db/pedidos';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function enviarEmailRastreio({

  nome,
  codigoRastreio,
  numeroPedido
}: {
  email: string,
  nome: string,
  codigoRastreio: string,
  numeroPedido: string
}) {
  return resend.emails.send({
    from: "no-reply@teudominio.com",
    to: 'ramoscumbica2@gmail.com',
    subject: `Seu pedido (#${numeroPedido}) foi realizado!`,
    html: `
      <p>Olá ${nome},</p>
      <p>Seu pedido foi recebido com sucesso!</p>
      <p><b>Código de rastreio:</b> <code>${codigoRastreio}</code></p>
      <p>Pode acompanhar o status <a href="https://teusite.com/pedido/${numeroPedido}/rastreio">neste link.</a></p>
      <br>
      <p>Obrigado por comprar no AgriConecta!</p>
    `
  });
}

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

// >>>>>>>> CHAMA O EMAIL AQUI <<<<<<<<<<
    if (pedido.clienteEmail) { // só se existe e-mail!
      await enviarEmailRastreio({
        email: pedido.clienteEmail,
        nome: pedido.clienteNome,
        codigoRastreio: pedido.codigoRastreio,
        numeroPedido: pedido.numero,
  });
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
