import prisma from '@/lib/prisma';
import { CriarUserDTO, CriarEnderecoDTO } from '@/types/user';

export async function criarUser(dados: CriarUserDTO) {
  return prisma.user.create({
    data: {
      email: dados.email,
      telefone: dados.telefone,
      nome: dados.nome,
      password: dados.password, // Deve ser hash bcrypt
      isGuest: dados.isGuest ?? false,
    },
  });
}

export async function obterUserPorId(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      enderecos: true,
    },
  });
}

export async function obterUserPorEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      enderecos: true,
    },
  });
}

export async function obterUserPorTelefone(telefone: string) {
  return prisma.user.findUnique({
    where: { telefone },
    include: {
      enderecos: true,
    },
  });
}

export async function adicionarEndereco(userId: string, dados: CriarEnderecoDTO) {
  // Se este for o principal, remover principal dos outros
  if (dados.principal) {
    await prisma.endereco.updateMany({
      where: { userId },
      data: { principal: false },
    });
  }
  
  return prisma.endereco.create({
    data: {
      userId,
      ...dados,
    },
  });
}

export async function listarEnderecosDoUser(userId: string) {
  return prisma.endereco.findMany({
    where: { userId },
    orderBy: { principal: 'desc' },
  });
}

export async function actualizarUser(id: string, dados: Partial<CriarUserDTO>) {
  return prisma.user.update({
    where: { id },
    data: dados,
  });
}

export async function converterConvidadoEmUser(
  userId: string,
  dados: { email: string; password: string; nome?: string }
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      email: dados.email,
      password: dados.password, // Deve ser hash bcrypt
      nome: dados.nome,
      isGuest: false,
    },
  });
}
