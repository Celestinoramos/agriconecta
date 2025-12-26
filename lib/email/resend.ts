import { Resend } from 'resend'

// Verificar se API key está configurada
const apiKey = process.env.RESEND_API_KEY

if (!apiKey) {
  console.warn('⚠️ RESEND_API_KEY não configurada - emails serão apenas logados')
}

export const resend = apiKey ? new Resend(apiKey) : null

export const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || 'AgriConecta <noreply@agriconecta.ao>',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@agriconecta.ao',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  banco: {
    banco: process.env.BANCO_NOME || 'BFA - Banco de Fomento Angola',
    iban: process.env.BANCO_IBAN || 'AO06.0000.0000.0000.0000.0000.0',
    titular: process.env.BANCO_TITULAR || 'AgriConecta Lda',
  },
}

// Função helper para verificar se emails estão activos
export function isEmailEnabled(): boolean {
  return resend !== null
}

// Manter exports antigos para compatibilidade
export const EMAIL_FROM = EMAIL_CONFIG.from
export const ADMIN_EMAIL = EMAIL_CONFIG.adminEmail
