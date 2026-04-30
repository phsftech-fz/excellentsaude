import { FiArrowRight, FiUser, FiBriefcase } from 'react-icons/fi'

const SULAMERICA_PF_URL = 'https://sulamericaodontoindividual.com.br/?corretora=excellentseguros'

export default function OdontoSulAmerica() {
  return (
    <section id="odonto" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-excellent-navy-900 mb-4">
            Plano <span className="text-excellent-green-500">Odontologico</span> SulAmerica
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cuide do seu sorriso com a credibilidade da SulAmerica. Escolha a opcao ideal de acordo com o seu perfil.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="bg-gradient-to-r from-excellent-green-500 to-excellent-green-700 p-8 text-white">
              <FiUser size={48} className="mb-4" />
              <h3 className="text-2xl font-bold mb-2">Pessoa Fisica (PF)</h3>
              <p className="text-white/90">Plano individual ou familiar</p>
            </div>

            <div className="p-8">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Contrate online de forma rapida e segura o plano odontologico individual da SulAmerica, com cobertura nacional e ampla rede credenciada.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-2">
                  <span className="text-excellent-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Contratacao 100% online</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-excellent-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Cobertura nacional</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-excellent-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Ampla rede credenciada</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-excellent-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Inclusao de dependentes</span>
                </li>
              </ul>

              <a
                href={SULAMERICA_PF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <span>Contratar Online</span>
                <FiArrowRight />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="bg-gradient-to-r from-excellent-blue-500 to-excellent-blue-700 p-8 text-white">
              <FiBriefcase size={48} className="mb-4" />
              <h3 className="text-2xl font-bold mb-2">Pessoa Juridica (PJ)</h3>
              <p className="text-white/90">Plano empresarial e PME</p>
            </div>

            <div className="p-8">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Para empresas, oferecemos uma cotacao personalizada do plano odontologico SulAmerica de acordo com o porte e perfil da sua equipe.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-2">
                  <span className="text-excellent-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Condicoes especiais por CNPJ</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-excellent-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Cotacao personalizada</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-excellent-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Atendimento consultivo</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-excellent-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Gestao dedicada para sua empresa</span>
                </li>
              </ul>

              <a
                href={SULAMERICA_PF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full flex items-center justify-center space-x-2"
              >
                <span>Solicitar Cotacao</span>
                <FiArrowRight />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600">
            Ficou em duvida sobre qual opcao e a ideal? <a href="https://wa.me/5551995567277" target="_blank" rel="noopener noreferrer" className="text-excellent-green-600 font-semibold hover:underline">Fale com um especialista no WhatsApp</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
