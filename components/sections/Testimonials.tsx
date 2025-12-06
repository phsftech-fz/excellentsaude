import { FiStar } from 'react-icons/fi'

const testimonials = [
  {
    name: 'Juliano Freitas',
    role: 'Empresário',
    content: 'O que mais me chamou a atenção foi a rapidez no atendimento. Achei que fosse ser muita burocracia contratar um plano de saúde, mas o que vi na verdade foi tudo muito simplificado e transparente. Hoje minha empresa conta com um plano que alia qualidade e preço para os meus colaboradores.',
    rating: 5,
  },
  {
    name: 'Camila Guimarães',
    role: 'Profissional Autônoma',
    content: 'Fui super bem atendida desde o início, sentindo que realmente houve uma preocupação em buscar o melhor caminho de acordo com a minha necessidade. Muito obrigada!',
    rating: 5,
  },
  {
    name: 'Adriano Guapo',
    role: 'Empresário',
    content: 'Não sabia muito sobre planos de saúde e odontológicos e agradeço pela paciência em me explicarem todas as minhas dúvidas. Com certeza fiz a melhor escolha para a minha empresa com a Excellent Saúde.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-excellent-navy-900 mb-4">
            O que Falam Sobre a <span className="text-excellent-green-500">Excellent</span> <span className="text-excellent-blue-500">Saúde</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A satisfação dos nossos clientes é a nossa maior conquista
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="text-excellent-green-500 fill-excellent-green-500" size={20} />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-excellent-navy-900">{testimonial.name}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

