import Image from 'next/image'
import type { IconType } from 'react-icons'
import { FiActivity, FiGift, FiHome, FiMonitor, FiUsers, FiVideo } from 'react-icons/fi'
import { DIFERENCIAIS } from '@/lib/medsenior'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const ICONES: Record<string, IconType> = {
  leaf: FiActivity,
  monitor: FiMonitor,
  video: FiVideo,
  users: FiUsers,
  building: FiHome,
  gift: FiGift,
}

export default function WhyMedSenior() {
  return (
    <section id="diferenciais" className="ms-section bg-white" aria-labelledby="why-title">
      <div className="ms-container">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              id="why-title"
              eyebrow="Por que MedSênior"
              title="Uma operadora criada para cuidar de quem tem a partir de 44 anos"
              lead="Desde 2010 a MedSênior faz medicina preventiva de verdade: acompanha sua saúde de perto, com equipe própria, para você viver mais e melhor."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl rounded-tl-none">
              <Image src="/medsenior/bem-envelhecer.jpg" alt="Mulher sorrindo durante teleconsulta em casa" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DIFERENCIAIS.map((d, i) => {
            const Icon = ICONES[d.icone] ?? FiActivity
            return (
              <Reveal key={d.titulo} delay={i * 60}>
                <article className="ms-card h-full p-6 transition-shadow hover:shadow-lg">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ms-green-50 text-ms-green-700">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-ms-green-900">{d.titulo}</h3>
                  <p className="mt-2 leading-relaxed text-gray-600">{d.texto}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
