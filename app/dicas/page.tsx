import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Leaf, Sprout, Users, Tractor } from 'lucide-react'
import { DicaCard } from '@/components/dicas/dica-card'
import { getDicas } from '@/lib/dicas/service'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = {
  title: 'Dicas para Consumidores e Agricultores | AgriConecta',
  description: 
    'Dicas de conservação de alimentos para consumidores e técnicas de cultivo para agricultores. Aprenda com os especialistas do AgriConecta.',
}

export default async function DicasPage() {
  const dicas = await getDicas()
  
  // Separar dicas por categoria
  const dicasConsumidores = dicas.filter(d => d.categoria === 'consumidor')
  const dicasAgricultores = dicas.filter(d => d.categoria === 'agricultor')

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 mb-6">
            <Leaf className="w-10 h-10 flex-shrink-0" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dicas AgriConecta 🌾
          </h1>
          <p className="text-lg md:text-xl text-green-50 max-w-3xl">
            Informações valiosas para consumidores conservarem melhor os alimentos 
            e para agricultores melhorarem suas técnicas de cultivo e produção.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Tabs defaultValue="consumidores" className="w-full">
          {/* Tabs Navigation */}
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-auto">
              <TabsTrigger 
                value="consumidores" 
                className="flex items-center gap-2 py-3 data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                <Users className="w-5 h-5" />
                <span className="font-semibold">Para Consumidores</span>
              </TabsTrigger>
              <TabsTrigger 
                value="agricultores"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                <Tractor className="w-5 h-5" />
                <span className="font-semibold">Para Agricultores</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dicas para Consumidores */}
          <TabsContent value="consumidores" className="mt-0">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Sprout className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Dicas para Consumidores
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Aprenda a conservar e aproveitar melhor os produtos frescos do AgriConecta
              </p>
            </div>

            {dicasConsumidores.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {dicasConsumidores.map((dica) => (
                  <DicaCard key={dica.id} dica={dica} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Nenhuma dica disponível no momento. Volte em breve!
                </p>
              </div>
            )}
          </TabsContent>

          {/* Dicas para Agricultores */}
          <TabsContent value="agricultores" className="mt-0">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Tractor className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Dicas para Agricultores
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Melhore suas técnicas de cultivo, colheita e comercialização de produtos
              </p>
            </div>

            {dicasAgricultores.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {dicasAgricultores.map((dica) => (
                  <DicaCard key={dica.id} dica={dica} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Nenhuma dica disponível no momento. Volte em breve!
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <section className="bg-green-50 rounded-lg p-8 md:p-12 border border-green-200 mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quer compartilhar uma dica? 
          </h2>
          <p className="text-gray-600 mb-6">
            Se você tem uma dica de conservação ou técnica de cultivo que gostaria 
            de compartilhar com nossa comunidade, entre em contacto connosco!
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Enviar Sugestão
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </section>
    </main>
  )
}