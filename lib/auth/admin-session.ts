import { cookies } from 'next/headers'

export interface AdminSession {
  id: string
  email: string
  nome: string | null
  role: string
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin-session')
    
    if (!sessionCookie?.value) {
      return null
    }
    
    return JSON.parse(sessionCookie.value) as AdminSession
  } catch {
    return null
  }
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('admin-session')
}
