'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * FAQ Page
 * 
 * Frequently Asked Questions with accordion
 */

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Como faço um pedido na AgriConecta?',
    answer: 'Navegue pelo catálogo de produtos, adicione os itens desejados ao carrinho e siga para o checkout. Pode fazer login para uma experiência mais rápida ou continuar como convidado.',
  },
  {
    question: 'Quais são as formas de pagamento aceites?',
    answer: 'Aceitamos Multicaixa Express e transferência bancária. Após fazer o pedido, receberá as instruções de pagamento.',
  },
  {
    question: 'Quanto tempo demora a entrega?',
    answer: 'O tempo de entrega varia de acordo com a sua localização. Geralmente, as entregas em Luanda são realizadas em 24-48 horas após a confirmação do pagamento.',
  },
  {
    question: 'Como posso rastrear o meu pedido?',
    answer: 'Após fazer o pedido, receberá um código de rastreio por email ou SMS. Use esse código na página de rastreio para acompanhar o estado do seu pedido em tempo real.',
  },
  {
    question: 'Os produtos são frescos?',
    answer: 'Sim! Trabalhamos directamente com agricultores locais e utilizamos transporte refrigerado para garantir que os produtos chegam frescos à sua porta.',
  },
  {
    question: 'Posso cancelar o meu pedido?',
    answer: 'Sim, pode cancelar o pedido antes de ele entrar em preparação. Entre em contacto connosco o mais rápido possível através do email ou telefone.',
  },
  {
    question: 'Têm um valor mínimo de pedido?',
    answer: 'O valor mínimo de pedido varia de acordo com a zona de entrega. Esta informação é apresentada durante o checkout.',
  },
  {
    question: 'Como funcionam as entregas em outras províncias?',
    answer: 'Actualmente, focamos principalmente em Luanda, mas estamos a expandir para outras províncias. Entre em contacto connosco para verificar a disponibilidade na sua região.',
  },
  {
    question: 'Sou agricultor, como posso vender na plataforma?',
    answer: 'Fantástico! Visite a nossa página de Serviços para Agricultores ou entre em contacto directamente connosco. Teremos todo o gosto em discutir uma parceria.',
  },
  {
    question: 'Posso devolver produtos?',
    answer: 'Por questões de segurança alimentar, não aceitamos devoluções de produtos frescos. No entanto, se houver algum problema com a qualidade, entre em contacto connosco imediatamente.',
  },
]

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 px-6 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-lg">{item.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-green-600 flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-gray-700">{item.answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Perguntas Frequentes
            </h1>
            <p className="text-xl text-green-50">
              Encontre respostas para as perguntas mais comuns
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border shadow-sm">
              {faqs.map((faq, index) => (
                <FAQAccordion key={index} item={faq} />
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 bg-green-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Não encontrou a resposta que procurava?
              </h2>
              <p className="text-gray-700 mb-6">
                A nossa equipa está pronta para ajudar!
              </p>
              <a
                href="/contacto"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Entre em Contacto
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
