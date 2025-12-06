import { FiShield, FiUsers, FiHeart, FiBriefcase, FiCheckCircle, FiClock } from 'react-icons/fi'

const services = [
  {
    icon: FiShield,
    title: 'Compromisso com você',
    description: 'Nosso compromisso é sempre encontrar as melhores alternativas para a sua necessidade. Por isso contamos com planos para pessoa física e jurídica.',
  },
  {
    icon: FiCheckCircle,
    title: 'Qualidade com responsabilidade',
    description: 'Aqui você encontra todos os melhores planos de saúde, odontológicos e também seguros do mercado. Você precisa? Você encontra.',
  },
  {
    icon: FiUsers,
    title: 'Dedicação profissional',
    description: 'Aqui na Excellent Saúde trabalhamos com um quadro de profissionais dedicados e atentos ao mercado atual. Nosso time não mede esforços para lhe atender.',
  },
  {
    icon: FiClock,
    title: 'Atendimento diferenciado',
    description: 'Cuidar da saúde e bem estar das pessoas com segurança, transparência e agilidade no atendimento é o nosso objetivo. É por isso que somos referência em atendimento.',
  },
]

export default function Services() {
  return (
    <section id="servicos" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-excellent-navy-900 mb-4">
            Por que escolher a <span className="text-excellent-green-500">Excellent</span> <span className="text-excellent-blue-500">Saúde</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos especialistas em encontrar o plano ideal para você e sua família
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-excellent-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Icon className="text-excellent-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-excellent-navy-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

