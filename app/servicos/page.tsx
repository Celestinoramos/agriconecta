import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Serviços para Agricultores - AgriConecta",
  description: "Serviços especializados para apoiar agricultores angolanos: logística, conservação, embalagem e gestão",
};

export default function ServicosPage() {
  const servicos = [
    {
      id: 1,
      titulo: "Logística e Transporte",
      icon: "🚚",
      descricao: "Transporte seguro e eficiente dos seus produtos desde a fazenda até os consumidores.",
      beneficios: [
        "Veículos refrigerados para produtos perecíveis",
        "Cobertura em todas as províncias de Angola",
        "Rastreamento em tempo real",
        "Seguros incluídos"
      ]
    },
    {
      id: 2,
      titulo: "Conservação e Armazenamento",
      icon: "🏭",
      descricao: "Soluções profissionais de armazenamento para manter seus produtos frescos por mais tempo.",
      beneficios: [
        "Câmaras frigoríficas modernas",
        "Armazéns climatizados",
        "Controlo de humidade e temperatura",
        "Gestão de stock integrada"
      ]
    },
    {
      id: 3,
      titulo: "Embalagem e Rotulagem",
      icon: "📦",
      descricao: "Embalagens profissionais que protegem seus produtos e valorizam sua marca.",
      beneficios: [
        "Design de embalagens personalizadas",
        "Materiais eco-friendly",
        "Rotulagem com código de barras",
        "Certificação de qualidade"
      ]
    },
    {
      id: 4,
      titulo: "Gestão e Consultoria",
      icon: "📊",
      descricao: "Apoio especializado para melhorar a produtividade e rentabilidade da sua fazenda.",
      beneficios: [
        "Análise de solo e clima",
        "Planeamento de culturas",
        "Gestão financeira",
        "Formação e capacitação"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header - Mobile First */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-8 px-4 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-blue-100 hover:text-white mb-3 inline-flex items-center min-h-[44px] active:scale-95 transition-transform sm:mb-4">
            <span className="mr-2">←</span>
            <span>Voltar para Início</span>
          </Link>
          <h1 className="text-3xl font-bold mb-3 sm:text-4xl md:text-5xl md:mb-4">
            Serviços para Agricultores
          </h1>
          <p className="text-base text-blue-100 sm:text-lg md:text-xl">
            Soluções completas para apoiar o crescimento do seu negócio agrícola
          </p>
        </div>
      </section>

      {/* Services Grid - Mobile First (Stack -> 2 cols) */}
      <section className="py-8 px-4 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 sm:text-3xl md:mb-4">
              Os Nossos Serviços
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto sm:text-lg">
              Oferecemos uma gama completa de serviços para ajudar os agricultores angolanos a maximizar a sua produção e rentabilidade
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
            {servicos.map((servico) => (
              <Card key={servico.id} className="hover:shadow-lg transition-shadow active:scale-[0.98]">
                <CardHeader className="pb-4">
                  <div className="flex flex-col gap-3 mb-2 sm:flex-row sm:items-center sm:gap-4">
                    <div className="text-4xl sm:text-5xl">{servico.icon}</div>
                    <CardTitle className="text-xl sm:text-2xl">{servico.titulo}</CardTitle>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    {servico.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-gray-900">Benefícios:</h4>
                  <ul className="space-y-2">
                    {servico.beneficios.map((beneficio, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-gray-700 text-sm sm:text-base">{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 min-h-[44px]">Solicitar Orçamento</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Mobile First Stack */}
      <section className="py-10 px-4 bg-white sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 sm:text-3xl md:mb-4">
              Como Funciona
            </h2>
            <p className="text-base text-gray-600 sm:text-lg">
              Processo simples em 3 passos
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            <div className="text-center px-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 sm:text-xl">Contacte-nos</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Entre em contacto através do formulário ou telefone para discutir as suas necessidades
              </p>
            </div>

            <div className="text-center px-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 sm:text-xl">Avaliação</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Nossa equipa avalia as suas necessidades e prepara uma proposta personalizada
              </p>
            </div>

            <div className="text-center px-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 sm:text-xl">Implementação</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Iniciamos a prestação do serviço com acompanhamento contínuo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-blue-600 text-white sm:py-14 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3 sm:text-3xl md:text-4xl md:mb-4">
            Pronto para levar o seu negócio ao próximo nível?
          </h2>
          <p className="text-base mb-6 text-blue-100 sm:text-lg md:text-xl md:mb-8">
            Entre em contacto connosco hoje mesmo para uma consulta gratuita
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-center">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 w-full sm:w-auto min-h-[44px]">
              Solicitar Contacto
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 w-full sm:w-auto min-h-[44px]">
              <Link href="/produtos">Ver Produtos</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
