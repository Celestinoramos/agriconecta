import { Truck, Snowflake, Package, TrendingUp, Phone } from 'lucide-react'

/**
 * Services Page for Farmers
 * 
 * Showcases AgriConecta services for agricultural producers
 */
export default function ServicosPage() {
  const services = [
    {
      icon: <Truck className="w-12 h-12 text-green-600" />,
      title: 'Transporte Refrigerado',
      description:
        'Garantimos que os seus produtos chegam frescos aos clientes com a nossa frota de camiões refrigerados de última geração.',
      benefits: [
        'Temperatura controlada durante todo o transporte',
        'Rastreamento em tempo real',
        'Entregas programadas',
        'Redução de perdas pós-colheita',
      ],
    },
    {
      icon: <Snowflake className="w-12 h-12 text-green-600" />,
      title: 'Câmaras Frias',
      description:
        'Armazene os seus produtos em condições ideais nas nossas câmaras frias modernas e seguras.',
      benefits: [
        'Capacidade para grandes volumes',
        'Controlo de temperatura e humidade',
        'Segurança 24/7',
        'Prolongamento da vida útil dos produtos',
      ],
    },
    {
      icon: <Package className="w-12 h-12 text-green-600" />,
      title: 'Embalagem Profissional',
      description:
        'Serviços de embalagem que valorizam os seus produtos e garantem a sua integridade.',
      benefits: [
        'Embalagens adequadas para cada tipo de produto',
        'Etiquetagem profissional',
        'Conformidade com normas de segurança alimentar',
        'Aumento do valor percebido',
      ],
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-600" />,
      title: 'Gestão de Vendas',
      description:
        'Plataforma completa para gerir as suas vendas e expandir o seu negócio agrícola.',
      benefits: [
        'Acesso ao mercado urbano',
        'Preços justos e transparentes',
        'Pagamentos garantidos',
        'Análise de desempenho de vendas',
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Serviços para Agricultores
            </h1>
            <p className="text-xl text-green-50">
              Apoiamos os produtores agrícolas angolanos com infraestrutura e serviços 
              profissionais para maximizar a qualidade e o valor dos seus produtos.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm uppercase text-gray-700">
                    Benefícios:
                  </h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-green-50 rounded-2xl p-12 text-center">
            <Phone className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Interessado nos nossos serviços?
            </h2>
            <p className="text-gray-700 mb-8 text-lg">
              Entre em contacto connosco para discutir como podemos ajudar a expandir 
              o seu negócio agrícola.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contacto"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Entrar em Contacto
              </a>
              <a
                href="https://wa.me/244900000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
