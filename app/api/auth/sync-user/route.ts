import { createServerSupabaseClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { USER_ROLES } from '@/lib/auth/roles'

export async function POST() {
  try {
    // Verify authentication
    const supabase = await createServerSupabaseClient()
    const { data: { user: supabaseUser }, error: authError } = await supabase.auth.getUser()

    if (authError || !supabaseUser) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    // Get or create user in Prisma database
    let user = await prisma.user.findFirst({
      where: {
        email: supabaseUser.email,
      },
    })

    if (!user) {
      // Create new user with data from Supabase
      const metadata = supabaseUser.user_metadata || {}
      
      user = await prisma.user.create({
        data: {
          email: supabaseUser.email!,
          nome: metadata.nome || metadata.full_name || null,
          telefone: metadata.telefone || metadata.phone || null,
          emailVerified: supabaseUser.email_confirmed_at ? new Date(supabaseUser.email_confirmed_at) : null,
          role: USER_ROLES.CUSTOMER,
        },
      })
    }

    // Return user data including role
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        telefone: user.telefone,
        role: user.role,
        emailVerified: user.emailVerified,
      },
    })
  } catch (error) {
    console.error('Error syncing user:', error)
    return NextResponse.json(
      { error: 'Erro ao sincronizar utilizador' },
      { status: 500 }
    )
  }
}
