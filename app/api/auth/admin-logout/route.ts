import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('admin-session')
    
    return NextResponse.json({ 
      success: true,
      message: 'Logout realizado com sucesso'
    })
  } catch (error) {
    console.error('Admin logout error:', error)
    return NextResponse.json(
      { error: 'Erro ao fazer logout' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Suportar GET para redirecionamento direto
  const cookieStore = await cookies()
  cookieStore.delete('admin-session')
  
  return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'))
}
