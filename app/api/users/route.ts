import { NextRequest, NextResponse } from 'next/server';
import { criarUser, obterUserPorEmail, obterUserPorTelefone } from '@/lib/db/users';
import { CriarUserDTO } from '@/types/user';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body: CriarUserDTO = await request.json();
    
    // Validação básica
    if (!body.email && !body.telefone) {
      return NextResponse.json(
        { error: 'Email ou telefone é obrigatório' },
        { status: 400 }
      );
    }
    
    // Verificar se já existe
    if (body.email) {
      const existente = await obterUserPorEmail(body.email);
      if (existente) {
        return NextResponse.json(
          { error: 'Este email já está registado' },
          { status: 409 }
        );
      }
    }
    
    if (body.telefone) {
      const existente = await obterUserPorTelefone(body.telefone);
      if (existente) {
        return NextResponse.json(
          { error: 'Este telefone já está registado' },
          { status: 409 }
        );
      }
    }
    
    // Hash da password se fornecida
    let passwordHash: string | undefined;
    if (body.password) {
      passwordHash = await bcrypt.hash(body.password, 12);
    }
    
    const user = await criarUser({
      ...body,
      password: passwordHash,
    });
    
    // Não retornar a password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userSemPassword } = user;
    
    return NextResponse.json(userSemPassword, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar utilizador:', error);
    return NextResponse.json(
      { error: 'Erro ao criar utilizador' },
      { status: 500 }
    );
  }
}
