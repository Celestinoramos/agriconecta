import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { listarProdutos, criarProduto } from '@/lib/db/produtos'
import { canManageProducts } from '@/lib/auth/permissions'
import { z } from 'zod'

const criarProdutoSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  descricao: z.string().optional(),
  descricaoCompleta: z.string().optional(),
  preco: z.number().positive('Preço deve ser positivo'),
  unidade: z.string().min(1),
  categoriaId: z.string().min(1, 'Categoria é obrigatória'),
  imagens: z.array(z.string()).optional(),
  stock: z.number().int().min(0).optional(),
  produtor: z.string().optional(),
  provincia: z.string().optional(),
  nutricional: z.string().optional(),
  conservacao: z.string().optional(),
  activo: z.boolean().optional(),
  destaque: z.boolean().optional(),
})

// GET - Listar produtos
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    
    // Buscar role do utilizador da base de dados
    const { data: userData } = await supabase
      .from('User')
      .select('role')
      .eq('id', user.id)
      .single()
    
    const userRole = userData?.role || 'CUSTOMER'
    
    // Verificar se tem permissão (STAFF, ADMIN ou SUPER_ADMIN podem ver produtos)
    const canView = ['STAFF', 'ADMIN', 'SUPER_ADMIN'].includes(userRole)
    if (!canView) {
      return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
    }
    
    const { searchParams } = new URL(request.url)
    const filtros = {
      categoriaId: searchParams.get('categoriaId') || undefined,
      activo: searchParams.get('activo') === 'true' ? true : searchParams.get('activo') === 'false' ? false : undefined,
      destaque: searchParams.get('destaque') === 'true' ? true : undefined,
      pesquisa: searchParams.get('pesquisa') || undefined,
      pagina: parseInt(searchParams.get('pagina') || '1'),
      porPagina: parseInt(searchParams.get('porPagina') || '20'),
    }
    
    const resultado = await listarProdutos(filtros)
    return NextResponse.json(resultado)
  } catch (error) {
    console.error('Erro ao listar produtos:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// POST - Criar produto
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    
    // Buscar role do utilizador
    const { data: userData } = await supabase
      .from('User')
      .select('role')
      .eq('id', user.id)
      .single()
    
    const userRole = userData?.role || 'CUSTOMER'
    
    // Verificar permissão ADMIN ou SUPER_ADMIN
    if (!canManageProducts({ userRole })) {
      return NextResponse.json({ error: 'Sem permissão para criar produtos' }, { status: 403 })
    }
    
    const body = await request.json()
    const dados = criarProdutoSchema.parse(body)
    
    const produto = await criarProduto(dados)
    return NextResponse.json(produto, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.errors }, { status: 400 })
    }
    console.error('Erro ao criar produto:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
