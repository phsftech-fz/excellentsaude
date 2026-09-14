import LeadForm from './LeadForm'
import Reveal from './Reveal'

export default function FinalCta() {
  return (
    <section id="cotacao" className="relative isolate overflow-hidden bg-ms-green-900 py-16 text-white md:py-24" aria-labelledby="cta-title">
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-ms-lime/10 blur-3xl" />
      <div className="ms-container relative grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <h2 id="cta-title" className="text-3xl font-extrabold leading-tight md:text-4xl">
            Pronto para cuidar da sua saúde com um plano feito para quem tem a partir de 44 anos?
          </h2>
          <p className="mt-4 text-lg text-ms-green-100">
            Deixe seu contato e receba a cotação da sua faixa etária no WhatsApp. Sem compromisso, sem custo extra.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="ms-card p-6 text-ms-ink md:p-8">
            <LeadForm origem="final" compact />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
