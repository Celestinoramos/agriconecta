import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { reordenarCategorias } from '@/lib/db/categorias'
import { USER_ROLES } from '@/lib/auth/roles'
import { z } from 'zod'

const reordenarSchema = z.object({
  ordens: z.array(z.object({
    id: z.string(),
    ordem: z.number().int().min(0)
  }))
})

// POST - Reordenar categorias (apenas SUPER_ADMIN)
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
    
    // Apenas SUPER_ADMIN pode reordenar categorias
    if (userRole !== USER_ROLES.SUPER_ADMIN) {
      return NextResponse.json({ error: 'Apenas Super Administradores podem reordenar categorias' }, { status: 403 })
    }
    
    const body = await request.json()
    const { ordens } = reordenarSchema.parse(body)
    
    await reordenarCategorias(ordens)
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.errors }, { status: 400 })
    }
    console.error('Erro ao reordenar categorias:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
