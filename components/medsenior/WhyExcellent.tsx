import Image from 'next/image'
import { FiCheckCircle } from 'react-icons/fi'
import { RAZOES_EXCELLENT } from '@/lib/medsenior'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function WhyExcellent() {
  return (
    <section id="excellent" className="ms-section bg-white" aria-labelledby="exc-title">
      <div className="ms-container grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl rounded-tl-none">
            <Image src="/medsenior/excellent.jpg" alt="Consultora da Excellent Saúde atendendo cliente" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <SectionHeading
            id="exc-title"
            eyebrow="Por que contratar pela Excellent"
            title="Mesmo valor da operadora, com um especialista do seu lado"
            lead="Somos uma corretora de Porto Alegre especializada em planos de saúde. Você fala com gente, não com robô."
          />
          <ul className="mt-8 space-y-5">
            {RAZOES_EXCELLENT.map((r) => (
              <li key={r.titulo} className="flex gap-4">
                <FiCheckCircle className="mt-1 h-6 w-6 shrink-0 text-ms-green-500" aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-ms-green-900">{r.titulo}</h3>
                  <p className="text-gray-600">{r.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
