export default function TermosUso() {
  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold text-excellent-navy-900 mb-8">Termos de Uso</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar o site da Excellent Saúde, você concorda em cumprir e estar vinculado 
              a estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve 
              utilizar nosso site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">2. Uso do Site</h2>
            <p className="mb-4">
              O site da Excellent Saúde é fornecido para fins informativos e para solicitação de cotações 
              de planos de saúde. Você concorda em:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Fornecer informações precisas e atualizadas ao preencher formulários</li>
              <li>Não utilizar o site para fins ilegais ou não autorizados</li>
              <li>Não tentar acessar áreas restritas do site</li>
              <li>Não interferir ou interromper o funcionamento do site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">3. Serviços Oferecidos</h2>
            <p className="mb-4">
              A Excellent Saúde atua como corretora de planos de saúde, oferecendo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Orientação sobre planos de saúde disponíveis</li>
              <li>Cotações personalizadas</li>
              <li>Intermediação na contratação de planos</li>
              <li>Atendimento e suporte aos clientes</li>
            </ul>
            <p className="mt-4">
              A Excellent Saúde não é uma operadora de planos de saúde, mas sim uma corretora que 
              intermedia a contratação entre clientes e operadoras.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">4. Formulários e Cotações</h2>
            <p className="mb-4">
              Ao preencher formulários de cotação em nosso site:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Você autoriza o contato da Excellent Saúde para fornecer informações sobre planos</li>
              <li>As cotações são estimativas e podem variar conforme condições específicas</li>
              <li>Valores finais serão confirmados após análise detalhada</li>
              <li>A contratação está sujeita à aprovação da operadora escolhida</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">5. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo do site, incluindo textos, gráficos, logos, ícones e imagens, é de 
              propriedade da Excellent Saúde ou de seus fornecedores de conteúdo e está protegido por 
              leis de direitos autorais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">6. Limitação de Responsabilidade</h2>
            <p className="mb-4">
              A Excellent Saúde não se responsabiliza por:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Danos diretos, indiretos ou consequenciais decorrentes do uso do site</li>
              <li>Interrupções ou erros no funcionamento do site</li>
              <li>Decisões tomadas com base em informações do site sem consulta adequada</li>
              <li>Condições e termos específicos das operadoras de planos de saúde</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">7. Links para Sites de Terceiros</h2>
            <p>
              Nosso site pode conter links para sites de terceiros (operadoras, parceiros). Não temos 
              controle sobre o conteúdo desses sites e não nos responsabilizamos por suas práticas 
              ou políticas de privacidade.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">8. Modificações dos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As 
              alterações entrarão em vigor imediatamente após a publicação no site. Recomendamos 
              que você revise periodicamente estes termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">9. Lei Aplicável</h2>
            <p>
              Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa relacionada 
              a estes termos será resolvida nos tribunais competentes do Brasil.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">10. Contato</h2>
            <p className="mb-2">
              Para questões sobre estes Termos de Uso, entre em contato:
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

