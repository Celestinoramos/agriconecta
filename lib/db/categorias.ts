import prisma from '../prisma'
import { Categoria, Prisma } from '@prisma/client'

/**
 * Database functions for Category management
 */

export interface CriarCategoriaDTO {
  nome: string
  descricao?: string
  imagem?: string
  ordem?: number
  activa?: boolean
}

export interface ActualizarCategoriaDTO extends Partial<CriarCategoriaDTO> {
  id: string
}

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
    const existe = await prisma.categoria.findUnique({ where: { slug: slugTeste } })
    if (!existe) return slugTeste
    contador++
  }
}

/**
 * Create a new category
 */
export async function criarCategoria(dados: CriarCategoriaDTO): Promise<Categoria> {
  const slug = await gerarSlugUnico(dados.nome)
  
  // Obter próxima ordem se não especificada
  let ordem = dados.ordem
  if (ordem === undefined) {
    const ultima = await prisma.categoria.findFirst({ orderBy: { ordem: 'desc' } })
    ordem = (ultima?.ordem ?? 0) + 1
  }
  
  return prisma.categoria.create({
    data: { ...dados, slug, ordem },
  })
}

/**
 * Get category by ID
 */
export async function obterCategoria(id: string): Promise<any | null> {
  return prisma.categoria.findUnique({
    where: { id },
    include: {
      _count: { select: { produtos: true } },
    },
  })
}

/**
 * Get category by slug
 */
export async function obterCategoriaPorSlug(slug: string): Promise<Categoria | null> {
  return prisma.categoria.findUnique({
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
export async function listarCategorias(incluirInactivas = false): Promise<any[]> {
  return prisma.categoria.findMany({
    where: incluirInactivas ? {} : { activa: true },
    orderBy: { ordem: 'asc' },
    include: {
      _count: { select: { produtos: true } },
    },
  })
}

/**
 * Update category
 */
export async function actualizarCategoria({ id, ...dados }: ActualizarCategoriaDTO): Promise<Categoria> {
  let slug: string | undefined
  if (dados.nome) {
    const categoriaActual = await prisma.categoria.findUnique({ where: { id } })
    if (categoriaActual && categoriaActual.nome !== dados.nome) {
      slug = await gerarSlugUnico(dados.nome)
    }
  }
  
  return prisma.categoria.update({
    where: { id },
    data: { ...dados, ...(slug && { slug }) },
  })
}

/**
 * Delete category
 */
export async function eliminarCategoria(id: string): Promise<Categoria> {
  // Verificar se tem produtos associados
  const categoria = await prisma.categoria.findUnique({
    where: { id },
    include: { _count: { select: { produtos: true } } },
  })
  
  if (categoria && categoria._count.produtos > 0) {
    throw new Error(`Não é possível eliminar categoria com ${categoria._count.produtos} produtos associados`)
  }
  
  return prisma.categoria.delete({ where: { id } })
}

/**
 * Reorder categories
 */
export async function reordenarCategorias(ordens: { id: string; ordem: number }[]): Promise<void> {
  await prisma.$transaction(
    ordens.map(({ id, ordem }) =>
      prisma.categoria.update({ where: { id }, data: { ordem } })
    )
  )
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

  return prisma.categoria.count({ where })
}

// Export obterCategoriaPorId for backwards compatibility
export const obterCategoriaPorId = obterCategoria

