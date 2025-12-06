import Image from 'next/image'

interface Operadora {
  nome: string
  logo: string
  alt: string
}

const operadoras: Operadora[] = [
  {
    nome: 'BRADESCO SAÚDE',
    logo: '/bradesco.jpg.bv.webp',
    alt: 'Bradesco Saúde',
  },
  {
    nome: 'SUL AMÉRICA',
    logo: '/sulamerica.jpg.bv.webp',
    alt: 'SulAmérica',
  },
  {
    nome: 'AMIL',
    logo: '/amil.webp.bv.webp',
    alt: 'Amil',
  },
  {
    nome: 'DOCTOR CLIN',
    logo: '/doctorclin.png.bv.webp',
    alt: 'Doctor Clin',
  },
  {
    nome: 'MED SÊNIOR',
    logo: '/medsenior.png.bv.webp',
    alt: 'MedSênior',
  },
  {
    nome: 'ONMED',
    logo: '/onmed.webp.bv.webp',
    alt: 'Onmed',
  },
  {
    nome: 'SULMED',
    logo: '/sulmed.webp.bv.webp',
    alt: 'Sulmed',
  },
]

export default function Operadoras() {
  return (
    <section id="operadoras" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-excellent-navy-900 mb-4">
            Operadoras <span className="text-excellent-green-500">Parceiras</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trabalhamos com as principais operadoras do mercado para oferecer as melhores opções
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {operadoras.map((operadora, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 flex items-center justify-center min-h-[120px] border-2 border-gray-200 hover:border-excellent-green-500 transition-all duration-300 hover:shadow-lg"
            >
              <Image
                src={operadora.logo}
                alt={operadora.alt}
                width={150}
                height={80}
                className="h-auto w-full max-w-[150px] object-contain"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Entre em contato para conhecer todas as operadoras disponíveis e encontrar o plano ideal
          </p>
          <a href="#cotacao" className="btn-primary inline-flex items-center space-x-2">
            <span>Solicitar Cotação</span>
          </a>
        </div>
      </div>
    </section>
  )
}

