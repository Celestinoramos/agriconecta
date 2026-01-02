import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const ADMIN_SESSION_DURATION_SECONDS = 60 * 60 * 24 // 24 horas

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    // Buscar utilizador na base de dados
    const user = await prisma.user.findFirst({
      where: { email: email.toLowerCase() }
    })
    
    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Email ou palavra-passe incorretos' },
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
        { error: 'Acesso não autorizado' },
        { status: 403 }
      )
    }
    
    // Criar sessão simples via cookie
    const cookieStore = await cookies()
    cookieStore.set('admin-session', JSON.stringify({
      id: user.id,
      email: user.email,
      nome: user.nome,
      role: user.role,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ADMIN_SESSION_DURATION_SECONDS,
      path: '/',
    })
    
    return NextResponse.json({
      success: true,
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
      { error: 'Erro ao processar login' },
      { status: 500 }
    )
  }
}
