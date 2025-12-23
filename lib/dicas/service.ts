import { Dica } from './types'

// Mock data - será substituído por Supabase depois
const dicasMock: Dica[] = [
  {
    id:  '1',
    titulo: 'Benefícios da Cenoura Crua',
    resumo:  'A cenoura é rica em betacaroteno e excelente para a visão',
    conteudo: 
      'A cenoura crua é um alimento poderoso para sua saúde.  Rica em betacaroteno (vitamina A), ajuda a melhorar a visão, fortalecer o sistema imunológico e proteger a pele.  Consuma-a diariamente em saladas ou como snack para obter os melhores benefícios.',
    categoria: 'vegetais',
    imagem: '/images/dicas/cenoura.jpg',
    autor: 'Nutricionista João Silva',
    dataCriacao: new Date('2025-12-20'),
    destaque: true,
    tags:  ['visão', 'vitaminas', 'cenoura'],
  },
  {
    id: '2',
    titulo: 'Receita de Sopa Verde Detox',
    resumo: 'Uma receita deliciosa e nutritiva para limpar seu corpo',
    conteudo: 
      'A sopa verde é perfeita para desintoxicar seu corpo. Combine couve, brócolis, abóbora e cebola em água quente com um toque de limão. Essa combinação oferece antioxidantes poderosos e fibras que melhoram a digestão.  Sirva quente ou gelada.',
    categoria: 'receitas',
    imagem: '/images/dicas/sopa-verde.jpg',
    autor: 'Chef Maria Santos',
    dataCriacao: new Date('2025-12-18'),
    destaque: true,
    tags: ['receita', 'detox', 'sopa'],
  },
  {
    id: '3',
    titulo: 'Tomate:  O Alimento do Coração',
    resumo: 'Licopeno do tomate protege o coração e previne doenças',
    conteudo:
      'O tomate é rico em licopeno, um antioxidante poderoso que protege o coração e reduz o risco de doenças cardiovasculares. Melhor ainda quando cozido, pois aumenta a biodisponibilidade do licopeno. Inclua tomates em suas refeições diárias.',
    categoria: 'bem-estar',
    imagem:  '/images/dicas/tomate.jpg',
    autor: 'Dr. Paulo Oliveira',
    dataCriacao: new Date('2025-12-15'),
    tags: ['coração', 'tomate', 'antioxidantes'],
  },
  {
    id: '4',
    titulo: 'Espinafre: Ferro e Energia',
    resumo: 'Alimento rico em ferro, perfeito para combater anemia',
    conteudo: 
      'O espinafre é uma excelente fonte de ferro, especialmente importante para vegetarianos. Combine-o com alimentos ricos em vitamina C (como tomate ou laranja) para aumentar a absorção de ferro. Consuma cru em saladas ou cozido em sopas.',
    categoria: 'vegetais',
    imagem: '/images/dicas/espinafre.jpg',
    autor: 'Nutricionista Helena Costa',
    dataCriacao: new Date('2025-12-10'),
    tags: ['ferro', 'energia', 'anemia'],
  },
  {
    id: '5',
    titulo: 'Smoothie de Banana e Morango',
    resumo: 'Bebida rápida, nutritiva e deliciosa para qualquer hora',
    conteudo:
      'Bata 1 banana, 100g de morangos, 200ml de leite (ou bebida vegetal) e 1 colher de mel. Esse smoothie oferece potássio, vitamina C e antioxidantes. Perfeito para café da manhã ou como snack pré-treino.',
    categoria: 'receitas',
    imagem: '/images/dicas/smoothie. jpg',
    autor: 'Chef Silva',
    dataCriacao:  new Date('2025-12-08'),
    tags: ['smoothie', 'receita rápida', 'frutas'],
  },
  {
    id: '6',
    titulo: '5 Passos para uma Alimentação Saudável',
    resumo:  'Guia prático para transformar seus hábitos alimentares',
    conteudo:
      '1. Coma mais frutas e vegetais; 2. Reduza alimentos processados; 3. Beba água regularmente; 4. Faça refeições equilibradas; 5. Coma com moderação. Pequenas mudanças fazem grande diferença na sua saúde.',
    categoria: 'bem-estar',
    dataCriacao: new Date('2025-12-05'),
    autor: 'Nutricionista Ana Silva',
    tags: ['hábitos', 'saúde', 'guia'],
  },
]

/**
 * Obter todas as dicas
 */
export async function getDicas(): Promise<Dica[]> {
  // TODO: Substituir por chamada ao Supabase quando disponível
  return dicasMock
}

/**
 * Obter dicas por categoria
 */
export async function getDicasPorCategoria(
  categoria: string
): Promise<Dica[]> {
  return dicasMock.filter((d) => d.categoria === categoria)
}

/**
 * Obter dicas em destaque
 */
export async function getDicasDestaque(): Promise<Dica[]> {
  return dicasMock.filter((d) => d.destaque === true).slice(0, 3)
}

/**
 * Buscar dicas
 */
export async function buscarDicas(query: string): Promise<Dica[]> {
  const queryLower = query.toLowerCase()
  return dicasMock.filter(
    (d) =>
      d.titulo.toLowerCase().includes(queryLower) ||
      d.conteudo.toLowerCase().includes(queryLower) ||
      d.tags?. some((t) => t.toLowerCase().includes(queryLower))
  )
}

/**
 * Obter dica por ID
 */
export async function getDicaPorId(id: string): Promise<Dica | null> {
  return dicasMock.find((d) => d.id === id) || null
}