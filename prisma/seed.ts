import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('A criar dados de seed...');
  
  // Criar utilizador de teste
  const user = await prisma.user.upsert({
    where: { email: 'teste@agriconecta.ao' },
    update: {},
    create: {
      email: 'teste@agriconecta.ao',
      telefone: '244923456789',
      nome: 'Utilizador Teste',
      isGuest: false,
      enderecos: {
        create: {
          nome: 'Casa',
          rua: 'Rua da Missão, 123',
          bairro: 'Maianga',
          municipio: 'Luanda',
          provincia: 'Luanda',
          referencia: 'Próximo ao mercado',
          principal: true,
        },
      },
    },
  });
  
  console.log('Utilizador criado:', user.email);
  
  // Criar pedido de exemplo
  const pedido = await prisma.pedido.create({
    data: {
      numero: 'AGC-2024-00001',
      faturaNumero: 'FT-2024-00001',
      faturaGeradaEm: new Date(),
      userId: user.id,
      clienteNome: 'Utilizador Teste',
      clienteEmail: 'teste@agriconecta.ao',
      enderecoEntrega: JSON.stringify({
        rua: 'Rua da Missão, 123',
        bairro: 'Maianga',
        municipio: 'Luanda',
        provincia: 'Luanda',
        referencia: 'Próximo ao mercado',
      }),
      metodoPagamento: 'TRANSFERENCIA_BANCARIA',
      subtotal: 10500,
      taxaEntrega: 500,
      desconto: 0,
      total: 11000,
      estado: 'PAGO',
      pagoEm: new Date(),
      itens: {
        create: [
          {
            produtoId: '1',
            produtoSlug: 'tomate-cereja-huila',
            produtoNome: 'Tomate Cereja',
            produtoPreco: 3500,
            produtoUnidade: 'kg',
            quantidade: 2,
            subtotal: 7000,
          },
          {
            produtoId: '2',
            produtoSlug: 'mandioca-fresca-malanje',
            produtoNome: 'Mandioca Fresca',
            produtoPreco: 3500,
            produtoUnidade: 'kg',
            quantidade: 1,
            subtotal: 3500,
          },
        ],
      },
      estadoHistorico: {
        create: [
          {
            estado: 'PENDENTE',
            nota: 'Pedido criado, aguardando pagamento',
            criadoPor: 'sistema',
            criadoEm: new Date(Date.now() - 3600000), // 1h atrás
          },
          {
            estado: 'PAGO',
            nota: 'Pagamento confirmado via transferência bancária',
            criadoPor: 'sistema',
            criadoEm: new Date(),
          },
        ],
      },
    },
  });
  
  console.log('Pedido criado:', pedido.numero);
  console.log('Código de rastreio:', pedido.codigoRastreio);
  
  console.log('Seed concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
