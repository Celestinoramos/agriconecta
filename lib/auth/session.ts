import { createServerSupabaseClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@/lib/auth/roles'

export interface ServerSession {
  user: {
    id: string
    email: string
    nome: string | null
    role: UserRole
  }
}

export async function getServerSession(): Promise<ServerSession | null> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user: supabaseUser } } = await supabase.auth.getUser()

    if (!supabaseUser?.email) {
      return null
    }

    const user = await prisma.user.findFirst({
      where: { email: supabaseUser.email },
      select: {
        id: true,
        email: true,
        nome: true,
        role: true,
      }
    })

    if (!user) {
      return null
    }

    return {
      user: {
        id: user.id,
        email: user.email!,
        nome: user.nome,
        role: user.role as UserRole,
      }
    }
  } catch (error) {
    console.error('Error getting server session:', error)
    return null
  }
}
