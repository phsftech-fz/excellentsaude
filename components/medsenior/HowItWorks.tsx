import { PASSOS } from '@/lib/medsenior'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="ms-section bg-ms-green-900 text-white" aria-labelledby="how-title">
      <div className="ms-container">
        <Reveal>
          <SectionHeading id="how-title" dark align="center" eyebrow="Como funciona" title="Da conversa à carteirinha em três passos" />
        </Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {PASSOS.map((p, i) => (
            <Reveal key={p.titulo} delay={i * 100} className="h-full">
              <li className="h-full rounded-3xl rounded-tl-none bg-white/5 p-6 ring-1 ring-white/10 md:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ms-lime text-xl font-extrabold text-ms-green-900">{i + 1}</span>
                <h3 className="mt-5 text-xl font-bold">{p.titulo}</h3>
                <p className="mt-2 leading-relaxed text-ms-green-100">{p.texto}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
