/**
 * Terms and Conditions Page
 */
export default function TermosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Termos e Condições
            </h1>
            <p className="text-xl text-green-50">
              Última actualização: Dezembro 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao aceder e utilizar a plataforma AgriConecta, você concorda em cumprir 
              e estar vinculado aos seguintes termos e condições de uso.
            </p>

            <h2>2. Uso da Plataforma</h2>
            <p>
              A AgriConecta é uma plataforma de marketplace que conecta produtores 
              agrícolas aos consumidores. Ao utilizar os nossos serviços, você concorda em:
            </p>
            <ul>
              <li>Fornecer informações precisas e actualizadas</li>
              <li>Não utilizar a plataforma para fins ilegais</li>
              <li>Respeitar os direitos de propriedade intelectual</li>
              <li>Não interferir com o funcionamento da plataforma</li>
            </ul>

            <h2>3. Pedidos e Pagamentos</h2>
            <p>
              Ao fazer um pedido na AgriConecta, você está a fazer uma oferta para 
              comprar os produtos seleccionados. Todos os pedidos estão sujeitos à 
              disponibilidade e confirmação de pagamento.
            </p>
            <ul>
              <li>Os preços estão expressos em Kwanzas angolanos (AOA)</li>
              <li>O pagamento deve ser efectuado através dos métodos indicados</li>
              <li>Os pedidos só são processados após confirmação do pagamento</li>
            </ul>

            <h2>4. Entregas</h2>
            <p>
              Fazemos o possível para entregar os seus pedidos dentro dos prazos 
              estimados, mas não podemos garantir datas específicas de entrega devido 
              a factores fora do nosso controlo.
            </p>

            <h2>5. Política de Cancelamento</h2>
            <p>
              Pode cancelar o seu pedido antes de entrar em preparação. Após este 
              ponto, o cancelamento pode não ser possível. Contacte-nos imediatamente 
              se precisar de cancelar.
            </p>

            <h2>6. Responsabilidade</h2>
            <p>
              A AgriConecta actua como intermediária entre produtores e consumidores. 
              Embora façamos todos os esforços para garantir a qualidade dos produtos, 
              não somos responsáveis por defeitos não aparentes no momento da entrega.
            </p>

            <h2>7. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo da plataforma AgriConecta, incluindo textos, gráficos, 
              logótipos e imagens, é propriedade da AgriConecta ou dos seus 
              licenciadores e está protegido por leis de direitos autorais.
            </p>

            <h2>8. Modificações</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. 
              As alterações entrarão em vigor imediatamente após a publicação na 
              plataforma.
            </p>

            <h2>9. Lei Aplicável</h2>
            <p>
              Estes termos são regidos pelas leis da República de Angola.
            </p>

            <h2>10. Contacto</h2>
            <p>
              Para questões sobre estes termos, contacte-nos em info@agriconecta.ao
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
