import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { obterCategoria, actualizarCategoria, eliminarCategoria } from '@/lib/db/categorias'
import { USER_ROLES } from '@/lib/auth/roles'
import { z } from 'zod'

const actualizarCategoriaSchema = z.object({
  nome: z.string().min(2).optional(),
  descricao: z.string().optional(),
  imagem: z.string().optional(),
  ordem: z.number().int().min(0).optional(),
  activa: z.boolean().optional(),
})

// GET - Obter categoria
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoria = await obterCategoria(params.id)
    
    if (!categoria) {
      return NextResponse.json({ error: 'Categoria não encontrada' }, { status: 404 })
    }
    
    return NextResponse.json(categoria)
  } catch (error) {
    console.error('Erro ao obter categoria:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// PATCH - Actualizar categoria (apenas SUPER_ADMIN)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Apenas SUPER_ADMIN pode actualizar categorias
    if (userRole !== USER_ROLES.SUPER_ADMIN) {
      return NextResponse.json({ error: 'Apenas Super Administradores podem actualizar categorias' }, { status: 403 })
    }
    
    const body = await request.json()
    const dados = actualizarCategoriaSchema.parse(body)
    
    const categoria = await actualizarCategoria({ id: params.id, ...dados })
    return NextResponse.json(categoria)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.issues }, { status: 400 })
    }
    console.error('Erro ao actualizar categoria:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// DELETE - Eliminar categoria (apenas SUPER_ADMIN)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Apenas SUPER_ADMIN pode eliminar categorias
    if (userRole !== USER_ROLES.SUPER_ADMIN) {
      return NextResponse.json({ error: 'Apenas Super Administradores podem eliminar categorias' }, { status: 403 })
    }
    
    await eliminarCategoria(params.id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message && error.message.includes('produtos associados')) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Erro ao eliminar categoria:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
