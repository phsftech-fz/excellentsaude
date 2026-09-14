export default function PoliticaPrivacidade() {
  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold text-excellent-navy-900 mb-8">Política de Privacidade</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">1. Informações Coletadas</h2>
            <p className="mb-4">
              A Excellent Saúde coleta informações pessoais quando você preenche nossos formulários de cotação, 
              entra em contato conosco ou utiliza nossos serviços. As informações coletadas podem incluir:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone</li>
              <li>Estado de residência</li>
              <li>Tipo de plano de interesse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">2. Uso das Informações</h2>
            <p className="mb-4">
              Utilizamos suas informações pessoais para:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Fornecer cotações e informações sobre planos de saúde</li>
              <li>Entrar em contato para oferecer nossos serviços</li>
              <li>Melhorar nossos serviços e experiência do usuário</li>
              <li>Enviar comunicações relacionadas aos nossos serviços (com seu consentimento)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">3. Compartilhamento de Informações</h2>
            <p className="mb-4">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Quando necessário para fornecer os serviços solicitados (ex: operadoras de planos de saúde)</li>
              <li>Quando exigido por lei ou ordem judicial</li>
              <li>Com seu consentimento explícito</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">4. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger suas 
              informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">5. Seus Direitos (LGPD)</h2>
            <p className="mb-4">
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Confirmar a existência de tratamento de dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a eliminação dos dados</li>
              <li>Revogar seu consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">6. Cookies</h2>
            <p>
              Utilizamos cookies para melhorar sua experiência em nosso site. Você pode configurar seu 
              navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">7. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise 
              esta página regularmente para se manter informado sobre como protegemos suas informações.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">8. Contato</h2>
            <p className="mb-2">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
            </p>
            <p className="mb-2">
              <strong>E-mail:</strong> atendimento@excellentsaude.com.br
            </p>
            <p>
              <strong>Telefone:</strong> (11) 99999-9999
            </p>
          </section>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

