import prisma from '../prisma'
import { Produto, Prisma } from '@prisma/client'

/**
 * Database functions for Product management
 */

export interface CriarProdutoDTO {
  nome: string
  descricao?: string
  descricaoCompleta?: string
  preco: number
  unidade: string
  categoriaId: string
  imagens?: string[]
  stock?: number
  produtor?: string
  provincia?: string
  nutricional?: string // JSON string
  conservacao?: string
  activo?: boolean
  destaque?: boolean
}

export interface ActualizarProdutoDTO extends Partial<CriarProdutoDTO> {
  id: string
}

export interface FiltrosProduto {
  categoriaId?: string
  activo?: boolean
  destaque?: boolean
  pesquisa?: string
  pagina?: number
  porPagina?: number
}

// Gerar slug único
function gerarSlug(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function gerarSlugUnico(nome: string): Promise<string> {
  let slug = gerarSlug(nome)
  let contador = 0
  
  while (true) {
    const slugTeste = contador === 0 ? slug : `${slug}-${contador}`
    const existe = await prisma.produto.findUnique({ where: { slug: slugTeste } })
    if (!existe) return slugTeste
    contador++
  }
}

/**
 * Create a new product
 */
export async function criarProduto(dados: CriarProdutoDTO): Promise<Produto> {
  const slug = await gerarSlugUnico(dados.nome)
  
  return prisma.produto.create({
    data: {
      ...dados,
      slug,
      imagens: dados.imagens || [],
    },
    include: { categoria: true },
  })
}

/**
 * Get product by ID
 */
export async function obterProduto(id: string): Promise<(Produto & { categoria: any }) | null> {
  return prisma.produto.findUnique({
    where: { id },
    include: {
      categoria: true,
    },
  })
}

/**
 * Get product by slug
 */
export async function obterProdutoPorSlug(slug: string): Promise<Produto | null> {
  return prisma.produto.findUnique({
    where: { slug },
    include: {
      categoria: true,
    },
  })
}

/**
 * List products with filters and pagination
 */
export async function listarProdutos(filtros: FiltrosProduto = {}) {
  const { categoriaId, activo, destaque, pesquisa, pagina = 1, porPagina = 20 } = filtros
  
  const where: Prisma.ProdutoWhereInput = {}
  
  if (categoriaId) where.categoriaId = categoriaId
  if (activo !== undefined) where.activo = activo
  if (destaque !== undefined) where.destaque = destaque
  if (pesquisa) {
    where.OR = [
      { nome: { contains: pesquisa, mode: 'insensitive' } },
      { descricao: { contains: pesquisa, mode: 'insensitive' } },
      { produtor: { contains: pesquisa, mode: 'insensitive' } },
    ]
  }
  
  const [produtos, total] = await Promise.all([
    prisma.produto.findMany({
      where,
      include: { categoria: true },
      orderBy: { createdAt: 'desc' },
      skip: (pagina - 1) * porPagina,
      take: porPagina,
    }),
    prisma.produto.count({ where }),
  ])
  
  return {
    produtos,
    total,
    paginas: Math.ceil(total / porPagina),
    paginaActual: pagina,
  }
}

/**
 * Update product
 */
export async function actualizarProduto({ id, ...dados }: ActualizarProdutoDTO): Promise<Produto> {
  // Se o nome mudar, gerar novo slug
  let slug: string | undefined
  if (dados.nome) {
    const produtoActual = await prisma.produto.findUnique({ where: { id } })
    if (produtoActual && produtoActual.nome !== dados.nome) {
      slug = await gerarSlugUnico(dados.nome)
    }
  }
  
  return prisma.produto.update({
    where: { id },
    data: {
      ...dados,
      ...(slug && { slug }),
    },
    include: { categoria: true },
  })
}

/**
 * Delete product
 */
export async function eliminarProduto(id: string): Promise<Produto> {
  return prisma.produto.delete({ where: { id } })
}

/**
 * Toggle active status of product
 */
export async function toggleActivoProduto(id: string): Promise<Produto> {
  const produto = await prisma.produto.findUnique({ where: { id } })
  if (!produto) throw new Error('Produto não encontrado')
  
  return prisma.produto.update({
    where: { id },
    data: { activo: !produto.activo },
  })
}

/**
 * Toggle featured status of product
 */
export async function toggleDestaqueProduto(id: string): Promise<Produto> {
  const produto = await prisma.produto.findUnique({ where: { id } })
  if (!produto) throw new Error('Produto não encontrado')
  
  return prisma.produto.update({
    where: { id },
    data: { destaque: !produto.destaque },
  })
}

/**
 * Count products
 */
export async function contarProdutos(options?: {
  categoriaId?: string
  activo?: boolean
}): Promise<number> {
  const where: Prisma.ProdutoWhereInput = {}

  if (options?.categoriaId) {
    where.categoriaId = options.categoriaId
  }

  if (options?.activo !== undefined) {
    where.activo = options.activo
  }

  return prisma.produto.count({ where })
}

// Export obterProdutoPorId for backwards compatibility
export const obterProdutoPorId = obterProduto

