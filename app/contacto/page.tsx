'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

/**
 * Contact Page
 * 
 * Contact form and information
 */
export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    // TODO: Implement actual form submission
    // For now, just simulate a successful submission
    setTimeout(() => {
      setStatus('success')
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: '',
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Entre em Contacto</h1>
            <p className="text-xl text-green-50">
              Estamos aqui para ajudar. Envie-nos uma mensagem!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Informações de Contacto</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Telefone</p>
                      <p className="text-gray-600">+244 900 000 000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">info@agriconecta.ao</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Endereço</p>
                      <p className="text-gray-600">
                        Luanda, Angola
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Horário de Atendimento</h3>
                <p className="text-sm text-gray-700">
                  Segunda a Sexta: 8h - 18h<br />
                  Sábado: 8h - 13h<br />
                  Domingo: Fechado
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border p-8">
                <h2 className="text-2xl font-bold mb-6">Envie-nos uma Mensagem</h2>
                
                {status === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                    Mensagem enviada com sucesso! Entraremos em contacto em breve.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium mb-2">
                      Nome completo *
                    </label>
                    <input
                      id="nome"
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium mb-2">
                        Telefone
                      </label>
                      <input
                        id="telefone"
                        type="tel"
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="assunto" className="block text-sm font-medium mb-2">
                      Assunto *
                    </label>
                    <input
                      id="assunto"
                      type="text"
                      value={formData.assunto}
                      onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="mensagem"
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {status === 'sending' ? 'A enviar...' : 'Enviar Mensagem'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
