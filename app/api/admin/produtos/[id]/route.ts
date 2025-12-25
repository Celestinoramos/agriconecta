import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { obterProduto, actualizarProduto, eliminarProduto } from '@/lib/db/produtos'
import { deleteProductImage } from '@/lib/supabase/storage'
import { canManageProducts } from '@/lib/auth/permissions'
import { z } from 'zod'

const actualizarProdutoSchema = z.object({
  nome: z.string().min(2).optional(),
  descricao: z.string().optional(),
  descricaoCompleta: z.string().optional(),
  preco: z.number().positive().optional(),
  unidade: z.string().min(1).optional(),
  categoriaId: z.string().min(1).optional(),
  imagens: z.array(z.string()).optional(),
  stock: z.number().int().min(0).optional(),
  produtor: z.string().optional(),
  provincia: z.string().optional(),
  nutricional: z.string().optional(),
  conservacao: z.string().optional(),
  activo: z.boolean().optional(),
  destaque: z.boolean().optional(),
})

// GET - Obter produto
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const produto = await obterProduto(params.id)
    
    if (!produto) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 })
    }
    
    return NextResponse.json(produto)
  } catch (error) {
    console.error('Erro ao obter produto:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// PATCH - Actualizar produto
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Verificar permissão
    if (!canManageProducts({ userRole })) {
      return NextResponse.json({ error: 'Sem permissão para actualizar produtos' }, { status: 403 })
    }
    
    const body = await request.json()
    const dados = actualizarProdutoSchema.parse(body)
    
    const produto = await actualizarProduto({ id: params.id, ...dados })
    return NextResponse.json(produto)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.errors }, { status: 400 })
    }
    console.error('Erro ao actualizar produto:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// DELETE - Eliminar produto
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Verificar permissão
    if (!canManageProducts({ userRole })) {
      return NextResponse.json({ error: 'Sem permissão para eliminar produtos' }, { status: 403 })
    }
    
    // Obter produto para eliminar imagens
    const produto = await obterProduto(params.id)
    if (!produto) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 })
    }
    
    // Eliminar imagens do storage
    if (produto.imagens && produto.imagens.length > 0) {
      await Promise.all(
        produto.imagens.map(img => deleteProductImage(img).catch(err => {
          console.error('Erro ao eliminar imagem:', err)
          // Continuar mesmo se falhar a eliminar imagem
        }))
      )
    }
    
    await eliminarProduto(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao eliminar produto:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
