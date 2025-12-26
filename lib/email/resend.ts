import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY não configurada - emails não serão enviados')
}

export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@agriconecta.ao'
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@agriconecta.ao'
