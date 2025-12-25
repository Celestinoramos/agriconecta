import { Dica } from './types'

// Mock data - será substituído por Supabase depois
const dicasMock: Dica[] = [
  // ========== DICAS PARA CONSUMIDORES (Conservação) ==========
  {
    id: 'consumidor-1',
    titulo: 'Como Conservar Frutas Tropicais',
    resumo: 'Manga, papaia e banana: dicas para prolongar a frescura',
    conteudo: 
      'Frutas tropicais como manga, papaia e banana devem ser mantidas em temperatura ambiente até amadurecerem. Após maduras, refrigere para prolongar a vida útil por 2-3 dias. Evite lavar antes de guardar - lave apenas antes de consumir. Separe frutas que liberam etileno (banana, manga) das outras para evitar amadurecimento acelerado.',
    categoria: 'consumidor',
    autor: 'Especialista AgriConecta',
    dataCriacao: new Date('2025-12-20'),
    destaque: true,
    tags: ['conservação', 'frutas tropicais', 'manga', 'papaia', 'banana'],
  },
  {
    id: 'consumidor-2',
    titulo: 'Armazenamento de Vegetais Folhosos',
    resumo: 'Mantenha couves e alfaces frescas por mais tempo',
    conteudo:
      'Lave os vegetais folhosos e seque completamente com papel toalha. Envolva em papel toalha limpo e guarde em saco plástico perfurado no frigorífico. A humidade controlada mantém a crocância. Couve pode durar 5-7 dias, alface 3-5 dias. Remova folhas amareladas imediatamente para evitar contaminação.',
    categoria: 'consumidor',
    autor: 'Nutricionista Maria Santos',
    dataCriacao: new Date('2025-12-19'),
    tags: ['vegetais', 'conservação', 'couve', 'alface'],
  },
  {
    id: 'consumidor-3',
    titulo: 'Tempo de Validade de Produtos Frescos',
    resumo: 'Guia rápido de quanto tempo cada produto dura',
    conteudo:
      'Temperatura ambiente: Tomate (3-5 dias), Banana (2-4 dias), Cebola (2 semanas), Batata (1-2 semanas). No frigorífico: Cenoura (3-4 semanas), Pepino (1 semana), Folhosos (3-7 dias), Frutas maduras (3-7 dias). Sempre verifique sinais de deterioração: manchas, cheiro alterado, textura mole.',
    categoria: 'consumidor',
    autor: 'Equipa AgriConecta',
    dataCriacao: new Date('2025-12-18'),
    destaque: true,
    tags: ['validade', 'conservação', 'guia rápido'],
  },
  {
    id: 'consumidor-4',
    titulo: 'Como Saber se um Produto Está Maduro',
    resumo: 'Sinais de maturação para frutas e vegetais',
    conteudo:
      'Manga: aroma doce na base, cede levemente à pressão. Papaia: casca amarela/laranja, textura macia. Abacate: cede à pressão suave, cor escura. Tomate: vermelho uniforme, firme mas não duro. Banana: amarelo com pontos marrons. Melão: aroma doce no talo, som oco ao bater. Use os sentidos: visão, toque e olfato.',
    categoria: 'consumidor',
    autor: 'Chef Paulo Oliveira',
    dataCriacao: new Date('2025-12-17'),
    tags: ['maturação', 'frutas', 'qualidade'],
  },
  {
    id: 'consumidor-5',
    titulo: 'Congelamento Correcto de Alimentos',
    resumo: 'Técnicas para congelar sem perder qualidade',
    conteudo:
      'Lave, corte e seque completamente os alimentos. Use sacos próprios para congelação, retirando o ar. Etiquete com nome e data. Frutas: congele em camada única antes de embalar. Vegetais: branqueie 2-3 minutos antes de congelar. Ervas: congele em cubos de gelo com azeite. Duração: frutas 8-12 meses, vegetais 10-12 meses.',
    categoria: 'consumidor',
    autor: 'Nutricionista Ana Silva',
    dataCriacao: new Date('2025-12-16'),
    tags: ['congelamento', 'conservação', 'técnicas'],
  },
  {
    id: 'consumidor-6',
    titulo: 'Conservação de Raízes e Tubérculos',
    resumo: 'Mandioca, batata-doce e inhame: armazenamento ideal',
    conteudo:
      'Mantenha em local fresco, seco e escuro. Temperatura ideal: 10-15°C. Não refrigere batata e batata-doce - o frio converte amido em açúcar. Mandioca fresca dura 2-3 dias; descasque e congele para maior duração. Batata-doce: 2-3 semanas. Não lave antes de guardar. Remova unidades com sinais de brotamento ou podridão.',
    categoria: 'consumidor',
    autor: 'Especialista AgriConecta',
    dataCriacao: new Date('2025-12-15'),
    tags: ['tubérculos', 'mandioca', 'batata-doce', 'conservação'],
  },
  {
    id: 'consumidor-7',
    titulo: 'Mantendo Ervas Aromáticas Frescas',
    resumo: 'Truques para coentro, salsa e manjericão durarem mais',
    conteudo:
      'Trate ervas como flores: corte as pontas, coloque em copo com água e cubra folhas com saco plástico. Mantenha no frigorífico (excepto manjericão - temperatura ambiente). Outra opção: envolva em papel toalha húmido e guarde em recipiente. Duram 5-7 dias. Para preservação longa: seque ou congele em azeite.',
    categoria: 'consumidor',
    autor: 'Chef Helena Costa',
    dataCriacao: new Date('2025-12-14'),
    tags: ['ervas', 'aromáticas', 'conservação'],
  },
  {
    id: 'consumidor-8',
    titulo: 'Armazenamento de Cereais e Grãos',
    resumo: 'Milho, feijão e arroz: proteja contra pragas e humidade',
    conteudo:
      'Use recipientes herméticos de vidro ou plástico alimentar. Mantenha em local fresco e seco, longe da luz directa. Adicione folhas de louro para repelir insectos. Verifique regularmente por sinais de humidade ou infestação. Arroz e feijão: 6-12 meses. Farinha: 3-6 meses. Congele 48h antes de armazenar para eliminar possíveis ovos de insectos.',
    categoria: 'consumidor',
    autor: 'Equipa AgriConecta',
    dataCriacao: new Date('2025-12-13'),
    tags: ['cereais', 'grãos', 'armazenamento', 'conservação'],
  },

  // ========== DICAS PARA AGRICULTORES (Cultivo e Produção) ==========
  {
    id: 'agricultor-1',
    titulo: 'Melhores Práticas de Irrigação em Angola',
    resumo: 'Optimização de água para clima tropical',
    conteudo:
      'Irrigue nas horas mais frescas (manhã cedo ou final da tarde) para reduzir evaporação. Use sistema de gotejamento para economizar até 50% de água. Na época das chuvas (Outubro-Abril), reduza irrigação. Na época seca (Maio-Setembro), aumente frequência. Mulching (cobertura morta) ajuda a reter humidade. Monitore a humidade do solo antes de irrigar.',
    categoria: 'agricultor',
    autor: 'Engenheiro Agrónomo João Fernandes',
    dataCriacao: new Date('2025-12-20'),
    destaque: true,
    tags: ['irrigação', 'água', 'Angola', 'clima tropical'],
  },
  {
    id: 'agricultor-2',
    titulo: 'Controlo Natural de Pragas',
    resumo: 'Métodos orgânicos e sustentáveis',
    conteudo:
      'Consórcio de plantas: plante manjericão perto de tomates para repelir moscas. Use calda de nim (neem) contra pulgões e lagartas. Solução de sabão neutro elimina cochonilhas. Armadilhas amarelas atraem moscas brancas. Rotação de culturas previne pragas específicas. Incentive predadores naturais: joaninhas comem pulgões, aves comem lagartas.',
    categoria: 'agricultor',
    autor: 'Especialista em Agricultura Orgânica',
    dataCriacao: new Date('2025-12-19'),
    tags: ['pragas', 'orgânico', 'controlo natural', 'sustentabilidade'],
  },
  {
    id: 'agricultor-3',
    titulo: 'Preparação do Solo para Plantio',
    resumo: 'Fundamentos para solo fértil e produtivo',
    conteudo:
      'Análise do solo: verifique pH (ideal 6.0-7.0) e nutrientes. Adicione matéria orgânica: composto, estrume curtido (3-5 kg/m²). Are o solo 20-30cm de profundidade para melhorar drenagem e arejamento. Corrija pH se necessário: calcário para solo ácido, enxofre para alcalino. Deixe descansar 2-3 semanas antes do plantio. Evite trabalhar solo encharcado.',
    categoria: 'agricultor',
    autor: 'Engenheiro Agrónomo Pedro Santos',
    dataCriacao: new Date('2025-12-18'),
    destaque: true,
    tags: ['solo', 'preparação', 'fertilidade', 'plantio'],
  },
  {
    id: 'agricultor-4',
    titulo: 'Calendário de Cultivo por Região',
    resumo: 'Quando plantar em diferentes províncias de Angola',
    conteudo:
      'Luanda/Litoral (época das chuvas Out-Abr): Tomate, pimento, couve, alface. Huíla/Planalto Central (clima ameno): Batata, cenoura, repolho ano todo. Cunene/Sul (seco): Milho, feijão na época das chuvas. Plantar 2-4 semanas antes das chuvas. Culturas de ciclo curto (30-60 dias): alface, rabanete. Ciclo longo (90-120 dias): tomate, pimento, couve.',
    categoria: 'agricultor',
    autor: 'Instituto de Desenvolvimento Agrário',
    dataCriacao: new Date('2025-12-17'),
    tags: ['calendário', 'plantio', 'regiões', 'Angola'],
  },
  {
    id: 'agricultor-5',
    titulo: 'Técnicas de Colheita para Máxima Qualidade',
    resumo: 'Momento e método correctos de colheita',
    conteudo:
      'Colha nas horas frescas do dia (manhã cedo). Use ferramentas limpas e afiadas. Tomates: colha quando 70% vermelho. Folhosos: corte pela manhã quando túrgidos. Frutas: colha no ponto de maturação ideal. Manuseie com cuidado para evitar danos. Limpe e seque antes de embalar. Refrigere rapidamente produtos perecíveis. Colha regularmente para estimular produção contínua.',
    categoria: 'agricultor',
    autor: 'Especialista em Pós-Colheita',
    dataCriacao: new Date('2025-12-16'),
    tags: ['colheita', 'qualidade', 'técnicas', 'manuseio'],
  },
  {
    id: 'agricultor-6',
    titulo: 'Embalagem e Transporte de Produtos Frescos',
    resumo: 'Reduza perdas no transporte até o mercado',
    conteudo:
      'Use caixas ventiladas e limpas. Evite empilhamento excessivo - máximo 3-4 caixas. Produtos delicados: acolchoamento com papel ou folhas. Transporte nas horas frescas ou à noite. Evite exposição solar directa. Separe produtos por grau de maturação. Não misture produtos com odores fortes. Cubra com lona húmida em climas quentes. Organize entrega rápida - máximo 12h após colheita.',
    categoria: 'agricultor',
    autor: 'Consultor de Logística Agrícola',
    dataCriacao: new Date('2025-12-15'),
    tags: ['transporte', 'embalagem', 'logística', 'perdas'],
  },
  {
    id: 'agricultor-7',
    titulo: 'Certificação de Produtos Orgânicos',
    resumo: 'Passos para certificação orgânica em Angola',
    conteudo:
      'Período de conversão: 2-3 anos sem uso de agroquímicos sintéticos. Documente todas as práticas: insumos usados, rotação de culturas, controlo de pragas. Procure entidades certificadoras reconhecidas. Mantenha registos detalhados de produção. Separe área orgânica de convencional (mínimo 10m). Benefícios: acesso a mercados premium, preços 20-30% superiores, sustentabilidade ambiental.',
    categoria: 'agricultor',
    autor: 'Consultor em Agricultura Orgânica',
    dataCriacao: new Date('2025-12-14'),
    tags: ['orgânico', 'certificação', 'sustentabilidade', 'mercado'],
  },
  {
    id: 'agricultor-8',
    titulo: 'Como Precificar Produtos para o Mercado',
    resumo: 'Estratégias de preço competitivo e lucrativo',
    conteudo:
      'Calcule custos: sementes, insumos, mão-de-obra, água, transporte. Adicione margem de lucro (30-50% sobre custos). Pesquise preços de mercado na sua região. Considere qualidade: orgânico ou superior vale mais. Ajuste por sazonalidade: época de abundância, reduza preço; escassez, aumente. Ofereça descontos para volume. Mantenha preços estáveis para fidelizar clientes. Use o AgriConecta para alcançar mais compradores!',
    categoria: 'agricultor',
    autor: 'Economista Agrícola',
    dataCriacao: new Date('2025-12-13'),
    tags: ['preço', 'mercado', 'lucro', 'estratégia'],
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