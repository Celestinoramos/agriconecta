import prisma from '../prisma'
import { Categoria, Prisma } from '@prisma/client'

/**
 * Database functions for Category management
 */

export interface CriarCategoriaDTO {
  slug: string
  nome: string
  descricao?: string
  imagem?: string
  ordem?: number
  activa?: boolean
}

/**
 * Create a new category
 */
export async function criarCategoria(data: CriarCategoriaDTO): Promise<Categoria> {
  return await prisma.categoria.create({
    data,
  })
}

/**
 * Get category by ID
 */
export async function obterCategoriaPorId(id: string): Promise<Categoria | null> {
  return await prisma.categoria.findUnique({
    where: { id },
    include: {
      produtos: {
        where: { activo: true },
        take: 10,
      },
    },
  })
}

/**
 * Get category by slug
 */
export async function obterCategoriaPorSlug(slug: string): Promise<Categoria | null> {
  return await prisma.categoria.findUnique({
    where: { slug },
    include: {
      produtos: {
        where: { activo: true },
      },
    },
  })
}

/**
 * List all categories
 */
export async function listarCategorias(options?: {
  activa?: boolean
}): Promise<Categoria[]> {
  const where: Prisma.CategoriaWhereInput = {}

  if (options?.activa !== undefined) {
    where.activa = options.activa
  }

  return await prisma.categoria.findMany({
    where,
    orderBy: {
      ordem: 'asc',
    },
    include: {
      _count: {
        select: { produtos: true },
      },
    },
  })
}

/**
 * Update category
 */
export async function actualizarCategoria(
  id: string,
  data: Partial<CriarCategoriaDTO>
): Promise<Categoria> {
  return await prisma.categoria.update({
    where: { id },
    data,
  })
}

/**
 * Delete category
 */
export async function eliminarCategoria(id: string): Promise<void> {
  await prisma.categoria.delete({
    where: { id },
  })
}

/**
 * Count categories
 */
export async function contarCategorias(options?: {
  activa?: boolean
}): Promise<number> {
  const where: Prisma.CategoriaWhereInput = {}

  if (options?.activa !== undefined) {
    where.activa = options.activa
  }

  return await prisma.categoria.count({ where })
}
