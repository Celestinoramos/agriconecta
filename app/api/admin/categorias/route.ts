import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { listarCategorias, criarCategoria } from '@/lib/db/categorias'
import { USER_ROLES } from '@/lib/auth/roles'
import { z } from 'zod'

const criarCategoriaSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  descricao: z.string().optional(),
  imagem: z.string().optional(),
  ordem: z.number().int().min(0).optional(),
  activa: z.boolean().optional(),
})

// GET - Listar categorias
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const incluirInactivas = searchParams.get('incluirInactivas') === 'true'
    
    const categorias = await listarCategorias(incluirInactivas)
    return NextResponse.json(categorias)
  } catch (error) {
    console.error('Erro ao listar categorias:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// POST - Criar categoria (apenas SUPER_ADMIN)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
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
    
    // Apenas SUPER_ADMIN pode criar categorias
    if (userRole !== USER_ROLES.SUPER_ADMIN) {
      return NextResponse.json({ error: 'Apenas Super Administradores podem criar categorias' }, { status: 403 })
    }
    
    const body = await request.json()
    const dados = criarCategoriaSchema.parse(body)
    
    const categoria = await criarCategoria(dados)
    return NextResponse.json(categoria, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.issues }, { status: 400 })
    }
    console.error('Erro ao criar categoria:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
