import { FiArrowRight, FiUsers, FiBriefcase, FiHeart } from 'react-icons/fi'
import Link from 'next/link'

const planTypes = [
  {
    icon: FiBriefcase,
    title: 'Planos Empresariais',
    description: 'Soluções para empresas de todos os portes — inclusive órgãos públicos, associações, sindicatos e entidades de autogestão. Condições competitivas por CNPJ/CNAE, rede regional ou nacional, telemedicina e gestão ativa de carteira para reduzir sinistralidade.',
    features: [
      'Empresas de todos os portes',
      'Órgãos públicos e entidades',
      'Rede regional ou nacional',
      'Telemedicina inclusa',
      'Gestão ativa de carteira',
    ],
    color: 'from-excellent-blue-500 to-excellent-blue-700',
  },
  {
    icon: FiUsers,
    title: 'Planos PME (Pequenas e Médias Empresas)',
    description: 'Ideal para times em crescimento, com adesão ágil e documentação simplificada. Opções com coparticipação, redes regionais e nacionais, mantendo ótimo custo-benefício (a partir de 2 vidas).',
    features: [
      'Adesão ágil',
      'Documentação simplificada',
      'Coparticipação disponível',
      'Redes regionais e nacionais',
      'A partir de 2 vidas',
    ],
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: FiHeart,
    title: 'Planos Individuais e Familiares',
    description: 'Proteção para você e sua família, sem necessidade de CNPJ, com telemedicina, programas de bem-estar e combinações de cobertura (ambulatorial + hospitalar, obstetrícia) e opções de acomodação.',
    features: [
      'Sem necessidade de CNPJ',
      'Telemedicina inclusa',
      'Programas de bem-estar',
      'Diversas combinações de cobertura',
      'Opções de acomodação',
    ],
    color: 'from-green-500 to-green-700',
  },
  {
    icon: FiBriefcase,
    title: 'Planos Personalizados',
    description: 'Construímos a solução sob medida ao seu perfil e uso esperado: mix de coberturas e rede, acomodação (coletivo/privativo), coparticipação e iniciativas de prevenção — focado em controle de custos e melhor experiência.',
    features: [
      'Solução sob medida',
      'Mix de coberturas personalizado',
      'Acomodação coletivo/privativo',
      'Iniciativas de prevenção',
      'Controle de custos',
    ],
    color: 'from-purple-500 to-purple-700',
  },
]

export default function PlanTypes() {
  return (
    <section id="planos" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-excellent-navy-900 mb-4">
            Conheça os <span className="text-excellent-green-500">Tipos de Planos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja os diferentes tipos de planos de saúde que oferecemos para você
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {planTypes.map((plan, index) => {
            const Icon = plan.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`bg-gradient-to-r ${plan.color} p-8 text-white`}>
                  <Icon size={48} className="mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                </div>
                
                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-excellent-green-500 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#cotacao"
                    className="btn-secondary w-full flex items-center justify-center space-x-2"
                  >
                    <span>Solicitar Cotação</span>
                    <FiArrowRight />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

