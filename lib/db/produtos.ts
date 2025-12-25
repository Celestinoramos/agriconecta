import prisma from '../prisma'
import { Produto, Prisma } from '@prisma/client'

/**
 * Database functions for Product management
 */

export interface CriarProdutoDTO {
  slug: string
  nome: string
  descricao?: string
  preco: number
  unidade: string
  categoriaId: string
  imagens?: string[]
  stock?: number
  activo?: boolean
  destaque?: boolean
  produtor?: string
  origem?: string
}

/**
 * Create a new product
 */
export async function criarProduto(data: CriarProdutoDTO): Promise<Produto> {
  return await prisma.produto.create({
    data: {
      ...data,
      imagens: data.imagens || [],
    },
  })
}

/**
 * Get product by ID
 */
export async function obterProdutoPorId(id: string): Promise<Produto | null> {
  return await prisma.produto.findUnique({
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
  return await prisma.produto.findUnique({
    where: { slug },
    include: {
      categoria: true,
    },
  })
}

/**
 * List products with filters
 */
export async function listarProdutos(options?: {
  categoriaId?: string
  activo?: boolean
  destaque?: boolean
  busca?: string
  skip?: number
  take?: number
}): Promise<Produto[]> {
  const where: Prisma.ProdutoWhereInput = {}

  if (options?.categoriaId) {
    where.categoriaId = options.categoriaId
  }

  if (options?.activo !== undefined) {
    where.activo = options.activo
  }

  if (options?.destaque !== undefined) {
    where.destaque = options.destaque
  }

  if (options?.busca) {
    where.OR = [
      { nome: { contains: options.busca, mode: 'insensitive' } },
      { descricao: { contains: options.busca, mode: 'insensitive' } },
    ]
  }

  return await prisma.produto.findMany({
    where,
    include: {
      categoria: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: options?.skip,
    take: options?.take,
  })
}

/**
 * Update product
 */
export async function actualizarProduto(
  id: string,
  data: Partial<CriarProdutoDTO>
): Promise<Produto> {
  return await prisma.produto.update({
    where: { id },
    data,
  })
}

/**
 * Delete product
 */
export async function eliminarProduto(id: string): Promise<void> {
  await prisma.produto.delete({
    where: { id },
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

  return await prisma.produto.count({ where })
}
