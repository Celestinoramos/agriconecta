/**
 * Privacy Policy Page
 */
export default function PrivacidadePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Política de Privacidade
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
            <h2>1. Introdução</h2>
            <p>
              A AgriConecta respeita a sua privacidade e está comprometida em proteger 
              os seus dados pessoais. Esta política explica como recolhemos, usamos e 
              protegemos as suas informações.
            </p>

            <h2>2. Informações que Recolhemos</h2>
            <p>Recolhemos as seguintes informações:</p>
            <ul>
              <li>
                <strong>Informações de conta:</strong> Nome, email, telefone, endereço
              </li>
              <li>
                <strong>Informações de pedidos:</strong> Histórico de compras, preferências
              </li>
              <li>
                <strong>Informações técnicas:</strong> Endereço IP, tipo de navegador, 
                dispositivo
              </li>
              <li>
                <strong>Informações de pagamento:</strong> Dados necessários para 
                processar transações (não armazenamos dados de cartão completos)
              </li>
            </ul>

            <h2>3. Como Usamos as Suas Informações</h2>
            <p>Utilizamos as suas informações para:</p>
            <ul>
              <li>Processar e entregar os seus pedidos</li>
              <li>Comunicar sobre o estado dos pedidos</li>
              <li>Melhorar os nossos serviços</li>
              <li>Enviar informações promocionais (com o seu consentimento)</li>
              <li>Cumprir obrigações legais</li>
            </ul>

            <h2>4. Partilha de Informações</h2>
            <p>
              Não vendemos as suas informações pessoais. Podemos partilhar dados com:
            </p>
            <ul>
              <li>Fornecedores de serviços (entrega, pagamento)</li>
              <li>Autoridades legais quando exigido por lei</li>
              <li>Parceiros com o seu consentimento explícito</li>
            </ul>

            <h2>5. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança apropriadas para proteger os seus 
              dados contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
            <ul>
              <li>Encriptação de dados em trânsito (HTTPS)</li>
              <li>Acesso restrito a informações pessoais</li>
              <li>Revisões regulares de segurança</li>
            </ul>

            <h2>6. Os Seus Direitos</h2>
            <p>Você tem o direito de:</p>
            <ul>
              <li>Aceder aos seus dados pessoais</li>
              <li>Corrigir informações incorrectas</li>
              <li>Solicitar a eliminação dos seus dados</li>
              <li>Opor-se ao processamento de dados</li>
              <li>Retirar o consentimento</li>
            </ul>

            <h2>7. Cookies</h2>
            <p>
              Utilizamos cookies para melhorar a sua experiência na plataforma. 
              Pode configurar o seu navegador para recusar cookies, mas isso pode 
              afectar algumas funcionalidades.
            </p>

            <h2>8. Retenção de Dados</h2>
            <p>
              Mantemos os seus dados pessoais apenas pelo tempo necessário para 
              cumprir os propósitos descritos nesta política ou conforme exigido por lei.
            </p>

            <h2>9. Menores</h2>
            <p>
              Os nossos serviços não são destinados a menores de 18 anos. Não 
              recolhemos intencionalmente informações de menores.
            </p>

            <h2>10. Alterações a Esta Política</h2>
            <p>
              Podemos actualizar esta política periodicamente. Notificaremos sobre 
              alterações significativas através da plataforma ou por email.
            </p>

            <h2>11. Contacto</h2>
            <p>
              Para questões sobre privacidade ou para exercer os seus direitos, 
              contacte-nos em privacidade@agriconecta.ao
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
