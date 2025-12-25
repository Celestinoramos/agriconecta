import { z } from 'zod';

export const checkoutSchema = z.object({
  clienteNome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  clienteTelefone: z.string().regex(/^244\d{9}$/, 'Telefone inválido (formato: 244XXXXXXXXX)').optional().or(z.literal('')),
  clienteEmail: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  endereco: z.object({
    rua: z.string().min(5, 'Endereço muito curto'),
    bairro: z.string().min(2, 'Bairro obrigatório'),
    municipio: z.string().min(2, 'Município obrigatório'),
    provincia: z.string().min(2, 'Província obrigatória'),
    referencia: z.string().optional(),
  }),
  notas: z.string().optional(),
  metodoPagamento: z.literal('TRANSFERENCIA_BANCARIA'),
  itens: z.array(z.object({
    produtoId: z.string(),
    produtoSlug: z.string(),
    produtoNome: z.string(),
    produtoPreco: z.number().positive(),
    produtoImagem: z.string().optional(),
    produtoUnidade: z.string().optional(),
    quantidade: z.number().int().min(1).max(99),
  })).min(1, 'Carrinho vazio'),
});

export type CheckoutData = z.infer<typeof checkoutSchema>;
