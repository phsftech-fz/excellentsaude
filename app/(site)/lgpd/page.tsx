export default function LGPD() {
  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold text-excellent-navy-900 mb-8">LGPD - Lei Geral de Proteção de Dados</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">Sobre a LGPD</h2>
            <p>
              A Excellent Saúde está comprometida com a proteção dos dados pessoais de seus clientes 
              e visitantes, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">Seus Direitos</h2>
            <p className="mb-4">
              De acordo com a LGPD, você tem os seguintes direitos sobre seus dados pessoais:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <strong>Confirmação e Acesso:</strong> Você pode solicitar confirmação sobre o tratamento 
                de seus dados e acessar uma cópia dos dados que possuímos sobre você.
              </li>
              <li>
                <strong>Correção:</strong> Você pode solicitar a correção de dados incompletos, 
                inexatos ou desatualizados.
              </li>
              <li>
                <strong>Anonimização, Bloqueio ou Eliminação:</strong> Você pode solicitar a anonimização, 
                bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade 
                com a LGPD.
              </li>
              <li>
                <strong>Portabilidade:</strong> Você pode solicitar a portabilidade dos dados para outro 
                fornecedor de serviço.
              </li>
              <li>
                <strong>Eliminação:</strong> Você pode solicitar a eliminação dos dados pessoais tratados 
                com seu consentimento.
              </li>
              <li>
                <strong>Revogação do Consentimento:</strong> Você pode revogar seu consentimento a 
                qualquer momento.
              </li>
              <li>
                <strong>Informação:</strong> Você pode solicitar informações sobre entidades públicas e 
                privadas com as quais compartilhamos dados.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">Como Exercer Seus Direitos</h2>
            <p className="mb-4">
              Para exercer qualquer um de seus direitos, entre em contato conosco através de:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-2">
                <strong>E-mail:</strong> lgpd@excellentsaude.com.br
              </p>
              <p className="mb-2">
                <strong>Telefone:</strong> (11) 99999-9999
              </p>
              <p>
                <strong>Horário de Atendimento:</strong> Segunda a Sexta, das 9h às 18h
              </p>
            </div>
            <p className="mt-4">
              Ao fazer sua solicitação, informe claramente qual direito deseja exercer e forneça 
              informações suficientes para que possamos identificá-lo e processar sua solicitação.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">Prazo de Resposta</h2>
            <p>
              Comprometemo-nos a responder suas solicitações no prazo máximo de 15 (quinze) dias, 
              conforme estabelecido pela LGPD. Caso seja necessário um prazo maior, informaremos 
              os motivos e o novo prazo estimado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">Segurança dos Dados</h2>
            <p className="mb-4">
              Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais, 
              incluindo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Criptografia de dados sensíveis</li>
              <li>Controles de acesso restritos</li>
              <li>Monitoramento de segurança</li>
              <li>Treinamento regular da equipe</li>
              <li>Backup e recuperação de dados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">Encarregado de Proteção de Dados (DPO)</h2>
            <p className="mb-4">
              Nomeamos um Encarregado de Proteção de Dados (DPO) para atuar como canal de comunicação 
              entre a Excellent Saúde, os titulares dos dados e a Autoridade Nacional de Proteção de 
              Dados (ANPD):
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-2">
                <strong>E-mail do DPO:</strong> dpo@excellentsaude.com.br
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-excellent-navy-900 mb-4">Autoridade Nacional de Proteção de Dados</h2>
            <p>
              Caso você tenha dúvidas ou queira apresentar uma reclamação sobre o tratamento de seus 
              dados pessoais, você também pode entrar em contato com a Autoridade Nacional de Proteção 
              de Dados (ANPD) através do site{' '}
              <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-excellent-blue-600 hover:underline">
                www.gov.br/anpd
              </a>.
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

