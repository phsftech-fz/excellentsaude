import Image from 'next/image'
import { FiCheck } from 'react-icons/fi'
import { OPERADORA } from '@/lib/medsenior'
import LeadForm from './LeadForm'

const BULLETS = [
  'Unidades próprias MedSênior em Porto Alegre e em 8 estados',
  'Sem coparticipação: consultas e exames sem custo extra',
  'Programa Bem Envelhecer e pronto atendimento virtual 24h',
]

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ms-green-900 text-white" aria-labelledby="hero-title">
      <Image
        src="/medsenior/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-60"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ms-green-900 via-ms-green-900/85 to-ms-green-900/40" />
      <div aria-hidden="true" className="absolute -left-32 -bottom-40 h-[28rem] w-[28rem] rounded-full bg-ms-lime/10 blur-3xl" />

      <div className="ms-container relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-ms-lime ring-1 ring-white/15">
            Plano de saúde coletivo por adesão · Porto Alegre
          </span>
          <h1 id="hero-title" className="mt-6 text-4xl font-extrabold leading-[1.1] md:text-5xl lg:text-[3.5rem]">
            Plano de saúde feito para quem tem <span className="text-ms-lime">a partir de 44 anos</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ms-green-100 md:text-xl">
            {OPERADORA.nome} é a operadora especializada em bem envelhecer, com unidades próprias, pronto atendimento virtual 24h e sem coparticipação. A Excellent Saúde cuida da sua adesão do início ao fim.
          </p>

          <ul className="mt-8 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-base md:text-lg">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ms-lime text-ms-green-900">
                  <FiCheck size={16} strokeWidth={3} aria-hidden="true" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-ms-green-100/80">
            {OPERADORA.nome} — ANS nº {OPERADORA.ans} · Operadora desde {OPERADORA.fundacao}
          </p>
        </div>

        <div className="ms-card p-6 md:p-8 text-ms-ink shadow-2xl">
          <h2 className="text-2xl font-extrabold text-ms-green-900">Receba sua cotação em minutos</h2>
          <p className="mt-2 text-gray-600">Preencha e continue a conversa no WhatsApp com um consultor da Excellent.</p>
          <div className="mt-6">
            <LeadForm origem="hero" />
          </div>
        </div>
      </div>
    </section>
  )
}
