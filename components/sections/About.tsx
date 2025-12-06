import { FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi'

const stats = [
  { icon: FiUsers, number: '10.000+', label: 'Clientes Atendidos' },
  { icon: FiAward, number: '50+', label: 'Operadoras Parceiras' },
  { icon: FiTrendingUp, number: '15+', label: 'Anos de Experiência' },
]

export default function About() {
  return (
    <section id="sobre" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-excellent-navy-900 mb-6">
              Especialista em <span className="text-excellent-green-500">Saúde</span>, comprometida com pessoas e resultados
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              A <strong>Excellent Saúde Corretora de Seguros Ltda</strong> oferece soluções personalizadas 
              em planos e seguros de saúde e odontológicos, unindo inteligência, ética e atendimento 
              humanizado para atender empresas, órgãos públicos e entidades de autogestão.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Atuamos principalmente no segmento empresarial e coletivo, com experiência consolidada 
              no mercado e profissionais com décadas de atuação no setor.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              <strong>Registro na SUSEP:</strong> nº 202083498
            </p>
            <div className="flex flex-wrap gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <Icon className="text-excellent-blue-500 mx-auto mb-2" size={32} />
                    <div className="text-3xl font-bold text-excellent-navy-900">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-excellent-navy-900 mb-6">Diferenciais</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="text-excellent-green-500 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-excellent-navy-900 mb-1">Atendimento humanizado e foco no cliente</h4>
                  <p className="text-gray-600">Priorizamos o relacionamento próximo e personalizado com cada cliente</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-excellent-green-500 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-excellent-navy-900 mb-1">Experiência consolidada no mercado</h4>
                  <p className="text-gray-600">Anos de atuação e conhecimento profundo do setor de saúde suplementar</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-excellent-green-500 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-excellent-navy-900 mb-1">Profissionais com décadas de atuação</h4>
                  <p className="text-gray-600">Equipe experiente e especializada para oferecer o melhor atendimento</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-excellent-green-500 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-excellent-navy-900 mb-1">Agilidade nos processos e respostas</h4>
                  <p className="text-gray-600">Cotações rápidas e processos simplificados para sua comodidade</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-excellent-green-500 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-excellent-navy-900 mb-1">Consultoria técnica personalizada</h4>
                  <p className="text-gray-600">Análise detalhada para encontrar a melhor solução para seu perfil</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-excellent-green-500 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-excellent-navy-900 mb-1">Melhor relação custo benefício do mercado</h4>
                  <p className="text-gray-600">Soluções que combinam qualidade e preço justo</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

