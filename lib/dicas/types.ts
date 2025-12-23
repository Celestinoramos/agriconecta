export interface Dica {
  id: string
  titulo: string
  resumo?:  string
  conteudo: string
  categoria: 'vegetais' | 'receitas' | 'bem-estar' | string
  imagem?: string
  autor?: string
  dataCriacao: Date
  dataAtualizacao?:  Date
  destaque?: boolean
  tags?: string[]
}

export interface CreateDicaInput {
  titulo: string
  resumo?: string
  conteudo: string
  categoria: string
  imagem?: string
  autor?: string
  destaque?: boolean
  tags?: string[]
}