export interface Avaliacao {
  id: string;
  autor: string;
  avatar?: string;
  nota: number; // 1-5
  comentario: string;
  data: string; // ISO date
}

export interface Produtor {
  nome: string;
  descricao: string;
  imagem?: string;
  desde: number; // Ano de início
  certificacoes?: string[];
}

export interface InfoNutricional {
  calorias: number; // por 100g
  proteinas: number;
  carboidratos: number;
  fibras: number;
  gorduras: number;
  sodio?: number;
}

export interface Origem {
  fazenda: string;
  localizacao: string;
  provincia: string;
}

export interface ProdutoDetalhado {
  // Campos existentes
  id: string | number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
  produtor: string; // Manter para compatibilidade
  provincia: string;
  disponibilidade: boolean | string;

  // Novos campos
  slug: string;
  descricaoCompleta: string;
  imagens: string[];
  unidade: string; // "kg", "unidade", "molho"
  pesoAproximado?: string;
  origem: Origem;
  produtorInfo: Produtor;
  nutricional: InfoNutricional;
  conservacao: string;
  epocaColheita?: string[];
  produtosRelacionados: string[];
  tags: string[];
  avaliacoes: Avaliacao[];
  mediaAvaliacoes: number;
  totalAvaliacoes: number;
}
