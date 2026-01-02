import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e palavra-passe são obrigatórios' },
        { status: 400 }
      )
    }
    
    // Buscar utilizador na base de dados
    const user = await prisma.user.findFirst({
      where: { email: email.toLowerCase().trim() }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Email ou palavra-passe incorretos' },
        { status: 401 }
      )
    }
    
    if (!user.password) {
      return NextResponse.json(
        { error: 'Esta conta não tem palavra-passe definida. Use o login normal.' },
        { status: 401 }
      )
    }
    
    // Verificar password
    const validPassword = await bcrypt.compare(password, user.password)
    
    if (!validPassword) {
      return NextResponse.json(
        { error: 'Email ou palavra-passe incorretos' },
        { status: 401 }
      )
    }
    
    // Verificar se é admin
    if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Acesso não autorizado. Apenas administradores podem aceder.' },
        { status: 403 }
      )
    }
    
    // Criar sessão via cookie
    const sessionData = {
      id: user.id,
      email: user.email,
      nome: user.nome,
      role: user.role,
      loginAt: new Date().toISOString(),
    }
    
    const cookieStore = await cookies()
    cookieStore.set('admin-session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 horas
      path: '/',
    })
    
    return NextResponse.json({
      success: true,
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
      }
    })
    
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Erro interno ao processar login' },
      { status: 500 }
    )
  }
}
