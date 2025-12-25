import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { toggleDestaqueProduto } from '@/lib/db/produtos'
import { canManageProducts } from '@/lib/auth/permissions'

// POST - Toggle destaque status
export async function POST(
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
    
    // Verificar permissão
    if (!canManageProducts({ userRole })) {
      return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
    }
    
    const produto = await toggleDestaqueProduto(params.id)
    return NextResponse.json(produto)
  } catch (error) {
    console.error('Erro ao toggle destaque:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
