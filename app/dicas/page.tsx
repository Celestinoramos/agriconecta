import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Leaf, Heart, Utensils } from 'lucide-react'
import { DicaCard } from '@/components/dicas/dica-card'
import { getDicas } from '@/lib/dicas/service'

export const metadata: Metadata = {
  title: 'Dicas Nutricionais | AgriConecta',
  description: 
    'Aprenda dicas nutricionais valiosas para uma alimentação saudável com produtos frescos do AgriConecta.',
}

export default async function DicasPage() {
  const dicas = await getDicas()

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 mb-6">
            <Heart className="w-10 h-10 flex-shrink-0" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dicas de Nutrição & Saúde 🌾
          </h1>
          <p className="text-lg md:text-xl text-green-50 max-w-2xl">
            Descubra como aproveitar melhor os produtos frescos do AgriConecta
            para uma alimentação saudável e balanceada.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        {/* Category Navigation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Categorias de Dicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CategoryButton
              icon={<Leaf className="w-5 h-5" />}
              label="Vegetais & Frutas"
              category="vegetais"
            />
            <CategoryButton
              icon={<Utensils className="w-5 h-5" />}
              label="Receitas Saudáveis"
              category="receitas"
            />
            <CategoryButton
              icon={<Heart className="w-5 h-5" />}
              label="Bem-estar"
              category="bem-estar"
            />
          </div>
        </div>

        {/* Dicas Grid */}
        {dicas && dicas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {dicas.map((dica) => (
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

        {/* CTA Section */}
        <section className="bg-green-50 rounded-lg p-8 md:p-12 border border-green-200 mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quer compartilhar uma dica? 
          </h2>
          <p className="text-gray-600 mb-6">
            Se você tem uma receita ou dica nutritiva que gostaria de compartilhar
            com nossa comunidade, entre em contato conosco!
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

// Category Button Component
function CategoryButton({
  icon,
  label,
  category,
}:  {
  icon: React.ReactNode
  label: string
  category: string
}) {
  return (
    <button className="flex items-center gap-3 p-4 bg-white border-2 border-green-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all">
      <span className="text-green-600">{icon}</span>
      <span className="font-semibold text-gray-800">{label}</span>
    </button>
  )
}