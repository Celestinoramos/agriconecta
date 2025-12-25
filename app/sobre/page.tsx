import { Users, Target, Heart, Sprout } from 'lucide-react'

/**
 * About Page
 * 
 * Information about AgriConecta mission, vision, and team
 */
export default function SobrePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre a AgriConecta</h1>
            <p className="text-xl text-green-50">
              Conectando agricultores angolanos aos consumidores urbanos
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <Target className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Missão</h2>
              <p className="text-gray-700">
                Promover o desenvolvimento do sector agrícola angolano através de uma 
                plataforma que conecta produtores directamente aos consumidores, 
                garantindo produtos frescos, preços justos e suporte logístico completo.
              </p>
            </div>
            <div className="text-center">
              <Heart className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Visão</h2>
              <p className="text-gray-700">
                Ser a principal plataforma de comércio agrícola em Angola, 
                contribuindo para a segurança alimentar e o crescimento económico 
                do país através da inovação e tecnologia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Os Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-center">
              <Sprout className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Sustentabilidade</h3>
              <p className="text-gray-700">
                Promovemos práticas agrícolas sustentáveis que respeitam o meio ambiente.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Transparência</h3>
              <p className="text-gray-700">
                Operamos com total transparência em preços, origem e qualidade dos produtos.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Compromisso</h3>
              <p className="text-gray-700">
                Comprometidos com o sucesso dos agricultores e satisfação dos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">A Nossa História</h2>
            <div className="prose prose-lg text-gray-700">
              <p>
                A AgriConecta nasceu da necessidade de criar uma ponte entre os 
                produtores agrícolas angolanos e os consumidores nas cidades. 
                Percebemos que muitos agricultores enfrentam dificuldades para 
                comercializar os seus produtos, enquanto os consumidores urbanos 
                procuram produtos frescos e de qualidade.
              </p>
              <p>
                Através da nossa plataforma digital e infraestrutura logística, 
                eliminamos intermediários desnecessários, garantimos preços justos 
                para os produtores e oferecemos produtos frescos aos consumidores 
                a preços acessíveis.
              </p>
              <p>
                Hoje, trabalhamos com dezenas de agricultores em várias províncias 
                de Angola e servimos milhares de famílias em Luanda e outras cidades.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
