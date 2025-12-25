/**
 * Script para migrar produtos de data/produtos.json para a base de dados
 * 
 * Uso: npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" scripts/migrate-produtos.ts
 */

import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface ProdutoJSON {
  id: number
  nome: string
  descricao: string
  descricaoCompleta?: string
  preco: number
  categoria: string
  imagem: string
  imagens?: string[]
  produtor?: string
  provincia?: string
  disponibilidade: boolean
  slug: string
  unidade?: string
  nutricional?: {
    calorias: number
    proteinas: number
    carboidratos: number
    fibras: number
    gorduras: number
    sodio?: number
  }
  conservacao?: string
}

// Mapeamento de categorias
const categoriaMap: { [key: string]: string } = {
  'Legumes': 'legumes',
  'Frutas': 'frutas',
  'Cereais': 'cereais',
  'Hortaliças': 'hortalicas',
  'Tubérculos': 'tuberculos',
}

async function main() {
  console.log('🚀 Iniciando migração de produtos...\n')

  // Ler produtos do JSON
  const jsonPath = path.join(process.cwd(), 'data', 'produtos.json')
  const jsonData = fs.readFileSync(jsonPath, 'utf-8')
  const produtosJSON: ProdutoJSON[] = JSON.parse(jsonData)

  console.log(`📦 Encontrados ${produtosJSON.length} produtos no JSON\n`)

  // Primeiro, criar/obter categorias
  console.log('📁 Criando categorias...')
  const categoriasUnicas = [...new Set(produtosJSON.map(p => p.categoria))]
  const categoriasMap = new Map<string, string>()

  for (const categoriaNome of categoriasUnicas) {
    const slug = categoriaMap[categoriaNome] || categoriaNome.toLowerCase().replace(/\s+/g, '-')
    
    // Verificar se categoria já existe
    let categoria = await prisma.categoria.findUnique({ where: { slug } })
    
    if (!categoria) {
      // Criar nova categoria
      categoria = await prisma.categoria.create({
        data: {
          slug,
          nome: categoriaNome,
          activa: true,
          ordem: categoriasUnicas.indexOf(categoriaNome),
        },
      })
      console.log(`  ✓ Criada: ${categoriaNome}`)
    } else {
      console.log(`  → Já existe: ${categoriaNome}`)
    }
    
    categoriasMap.set(categoriaNome, categoria.id)
  }

  console.log(`\n✅ ${categoriasMap.size} categorias processadas\n`)

  // Migrar produtos
  console.log('📦 Migrando produtos...')
  let criados = 0
  let actualizados = 0
  let erros = 0

  for (const produtoJSON of produtosJSON) {
    try {
      const categoriaId = categoriasMap.get(produtoJSON.categoria)
      if (!categoriaId) {
        console.log(`  ⚠ Categoria não encontrada para ${produtoJSON.nome}`)
        erros++
        continue
      }

      // Verificar se produto já existe
      const produtoExistente = await prisma.produto.findUnique({
        where: { slug: produtoJSON.slug },
      })

      // Preparar informação nutricional como JSON string
      const nutricional = produtoJSON.nutricional 
        ? JSON.stringify(produtoJSON.nutricional)
        : undefined

      const dadosProduto = {
        slug: produtoJSON.slug,
        nome: produtoJSON.nome,
        descricao: produtoJSON.descricao,
        descricaoCompleta: produtoJSON.descricaoCompleta,
        preco: produtoJSON.preco,
        unidade: produtoJSON.unidade || 'kg',
        categoriaId,
        imagens: produtoJSON.imagens || [produtoJSON.imagem],
        stock: 10, // Stock inicial padrão
        activo: produtoJSON.disponibilidade,
        destaque: false,
        produtor: produtoJSON.produtor,
        provincia: produtoJSON.provincia,
        nutricional,
        conservacao: produtoJSON.conservacao,
      }

      if (produtoExistente) {
        // Actualizar produto existente
        await prisma.produto.update({
          where: { id: produtoExistente.id },
          data: dadosProduto,
        })
        console.log(`  ↻ Actualizado: ${produtoJSON.nome}`)
        actualizados++
      } else {
        // Criar novo produto
        await prisma.produto.create({
          data: dadosProduto,
        })
        console.log(`  ✓ Criado: ${produtoJSON.nome}`)
        criados++
      }
    } catch (error) {
      console.error(`  ✗ Erro ao migrar ${produtoJSON.nome}:`, error)
      erros++
    }
  }

  console.log(`\n📊 Resultado da migração:`)
  console.log(`  ✓ Criados: ${criados}`)
  console.log(`  ↻ Actualizados: ${actualizados}`)
  console.log(`  ✗ Erros: ${erros}`)
  console.log(`\n✅ Migração concluída!`)
}

main()
  .catch((error) => {
    console.error('❌ Erro na migração:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
