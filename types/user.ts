export type { User, Endereco } from '@prisma/client';

export interface CriarUserDTO {
  email?: string;
  telefone?: string;
  nome?: string;
  password?: string;
  isGuest?: boolean;
}

export interface CriarEnderecoDTO {
  nome: string;
  rua: string;
  bairro: string;
  municipio: string;
  provincia: string;
  referencia?: string;
  principal?: boolean;
}
