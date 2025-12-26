import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Cliente com service role para operações de storage no servidor
// Only initialize if environment variables are available
export const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

export const PRODUTOS_BUCKET = 'produtos'

/**
 * Upload de imagem de produto para Supabase Storage
 * @param file - Ficheiro a fazer upload
 * @param produtoId - ID do produto (para organização em pastas)
 * @returns URL público da imagem
 */
export async function uploadProductImage(
  file: File,
  produtoId: string
): Promise<string> {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client not initialized')
  }
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${produtoId}/${Date.now()}.${fileExt}`
  
  const { error } = await supabaseAdmin.storage
    .from(PRODUTOS_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) throw error
  
  const { data: { publicUrl } } = supabaseAdmin.storage
    .from(PRODUTOS_BUCKET)
    .getPublicUrl(fileName)
  
  return publicUrl
}

/**
 * Eliminar imagem de produto do Supabase Storage
 * @param imageUrl - URL completo da imagem
 */
export async function deleteProductImage(imageUrl: string): Promise<void> {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client not initialized')
  }
  
  // Extrair path do URL
  const path = imageUrl.split(`${PRODUTOS_BUCKET}/`)[1]
  if (!path) return
  
  const { error } = await supabaseAdmin.storage
    .from(PRODUTOS_BUCKET)
    .remove([path])
  
  if (error) throw error
}

/**
 * Upload de imagem de categoria para Supabase Storage
 * @param file - Ficheiro a fazer upload
 * @param categoriaId - ID da categoria
 * @returns URL público da imagem
 */
export async function uploadCategoryImage(
  file: File,
  categoriaId: string
): Promise<string> {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client not initialized')
  }
  
  const fileExt = file.name.split('.').pop()
  const fileName = `categorias/${categoriaId}/${Date.now()}.${fileExt}`
  
  const { error } = await supabaseAdmin.storage
    .from(PRODUTOS_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) throw error
  
  const { data: { publicUrl } } = supabaseAdmin.storage
    .from(PRODUTOS_BUCKET)
    .getPublicUrl(fileName)
  
  return publicUrl
}

/**
 * Eliminar imagem de categoria do Supabase Storage
 * @param imageUrl - URL completo da imagem
 */
export async function deleteCategoryImage(imageUrl: string): Promise<void> {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client not initialized')
  }
  
  const path = imageUrl.split(`${PRODUTOS_BUCKET}/`)[1]
  if (!path) return
  
  const { error } = await supabaseAdmin.storage
    .from(PRODUTOS_BUCKET)
    .remove([path])
  
  if (error) throw error
}
