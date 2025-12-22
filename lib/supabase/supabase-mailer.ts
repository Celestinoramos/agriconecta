import { createServerSupabaseClient } from "@/lib/supabase/server"

export interface EmailParams {
    to: string
    subject: string
    html: string
    text?: string
}

export async function sendEmail(params: EmailParams) {
    try {
        const supabase = await createServerSupabaseClient()
        
        const { data, error } = await supabase. functions.invoke('send-email', {
            body: {
                to: params.to,
                subject: params.subject,
                html: params.html,
                text: params.text,
            },
        })

        if (error) throw error
        return { success: true, data }
    } catch (error) {
        console.error('Erro ao enviar email', error)
        throw error
    }
}

export async function sendWelcomeEmail(email: string, name: string) {
    return sendEmail({
        to: email,
        subject: 'Bem-vindo ao AgriConecta!',
        html: `
            <h1>Bem-vindo, ${name}!</h1>
            <p>Obrigado por se registrar no AgriConecta. </p>
            <p>Sua conta foi criada com sucesso e você já pode começar a usar nossa plataforma.</p>
            `,
    })
}

export async function sendOrderConfirmation(
    email: string,
    orderId: string,
    products: any[]
){
    return sendEmail({
        to: email,
        subject: `Pedido confirmado #${orderId}`,
    html: `
      <h1>Pedido Confirmado</h1>
      <p>Seu pedido <strong>#${orderId}</strong> foi confirmado com sucesso! </p>
      <h2>Produtos:</h2>
      <ul>
        ${products.map((p) => `<li>${p.name} - ${p.price} AOA</li>`).join('')}
      </ul>
        `,
    })
}