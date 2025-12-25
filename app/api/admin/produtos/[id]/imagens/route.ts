import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { uploadProductImage, deleteProductImage } from '@/lib/supabase/storage'
import { obterProduto, actualizarProduto } from '@/lib/db/produtos'
import { canManageProducts } from '@/lib/auth/permissions'

// POST - Upload de imagens
export async function POST(
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
    
    // Verificar permissão
    if (!canManageProducts({ userRole })) {
      return NextResponse.json({ error: 'Sem permissão para fazer upload de imagens' }, { status: 403 })
    }
    
    const produto = await obterProduto(params.id)
    if (!produto) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 })
    }
    
    const formData = await request.formData()
    const files = formData.getAll('imagens') as File[]
    
    if (files.length === 0) {
      return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 })
    }
    
    // Validar ficheiros
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    
    for (const file of files) {
      if (file.size > maxSize) {
        return NextResponse.json({ error: `Ficheiro ${file.name} excede 5MB` }, { status: 400 })
      }
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: `Tipo de ficheiro não permitido: ${file.type}` }, { status: 400 })
      }
    }
    
    // Upload das imagens
    const urls = await Promise.all(
      files.map(file => uploadProductImage(file, params.id))
    )
    
    // Actualizar produto com novas URLs
    const imagensActualizadas = [...(produto.imagens || []), ...urls]
    await actualizarProduto({ id: params.id, imagens: imagensActualizadas })
    
    return NextResponse.json({ urls, total: imagensActualizadas.length })
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    return NextResponse.json({ error: 'Erro ao fazer upload' }, { status: 500 })
  }
}

// DELETE - Remover imagem específica
export async function DELETE(
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
    
    // Verificar permissão
    if (!canManageProducts({ userRole })) {
      return NextResponse.json({ error: 'Sem permissão para remover imagens' }, { status: 403 })
    }
    
    const { imageUrl } = await request.json()
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'URL da imagem é obrigatória' }, { status: 400 })
    }
    
    const produto = await obterProduto(params.id)
    if (!produto) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 })
    }
    
    // Remover do storage
    await deleteProductImage(imageUrl).catch(err => {
      console.error('Erro ao remover do storage:', err)
      // Continuar mesmo se falhar
    })
    
    // Actualizar produto
    const imagensActualizadas = (produto.imagens || []).filter(img => img !== imageUrl)
    await actualizarProduto({ id: params.id, imagens: imagensActualizadas })
    
    return NextResponse.json({ success: true, total: imagensActualizadas.length })
  } catch (error) {
    console.error('Erro ao remover imagem:', error)
    return NextResponse.json({ error: 'Erro ao remover imagem' }, { status: 500 })
  }
}
