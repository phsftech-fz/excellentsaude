import { FaWhatsapp } from 'react-icons/fa'
import { FiCheck, FiHome, FiMap, FiShield } from 'react-icons/fi'
import { PLANOS, type Plano } from '@/lib/medsenior'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function PlanCard({ plano, index }: { plano: Plano; index: number }) {
  const destaque = Boolean(plano.destaque)
  return (
    <Reveal delay={index * 80} className="h-full">
      <article
        className={`ms-card relative flex h-full flex-col p-6 transition-transform hover:-translate-y-1 hover:shadow-xl ${destaque ? 'ring-2 ring-ms-green-500' : ''}`}
        aria-labelledby={`plano-${plano.id}`}
      >
        {plano.destaque && (
          <span className="absolute -top-3 right-6 rounded-full bg-ms-lime px-3 py-1 text-xs font-bold uppercase tracking-wide text-ms-green-900">
            {plano.destaque}
          </span>
        )}
        <h3 id={`plano-${plano.id}`} className="text-xl font-extrabold leading-tight text-ms-green-900">{plano.nome}</h3>
        <p className="mt-2 text-sm text-gray-600">{plano.descricao}</p>

        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex items-center gap-2"><FiHome className="text-ms-green-600" aria-hidden="true" /><dt className="sr-only">Acomodação</dt><dd><strong>{plano.acomodacao}</strong></dd></div>
          <div className="flex items-start gap-2"><FiMap className="mt-0.5 shrink-0 text-ms-green-600" aria-hidden="true" /><dt className="sr-only">Abrangência</dt><dd><strong>{plano.abrangencia}</strong> — {plano.abrangenciaDetalhe}</dd></div>
          <div className="flex items-start gap-2"><FiShield className="mt-0.5 shrink-0 text-ms-green-600" aria-hidden="true" /><dt className="sr-only">Segmentação</dt><dd>{plano.segmentacao}</dd></div>
        </dl>

        <ul className="mt-5 space-y-2 border-t border-ms-green-100 pt-5 text-sm">
          <li className="flex items-center gap-2 font-semibold text-ms-green-700"><FiCheck aria-hidden="true" />{plano.coparticipacao ? 'Com coparticipação' : 'Sem coparticipação'}</li>
          {plano.beneficios.map((b) => (
            <li key={b} className="flex items-start gap-2 text-gray-700"><FiCheck className="mt-0.5 shrink-0 text-ms-green-500" aria-hidden="true" />{b}</li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <a
            href={buildWhatsAppUrl({ plano: plano.nome, origem: 'plano' })}
            target="_blank"
            rel="noopener noreferrer"
            className={`ms-btn w-full ${destaque ? 'ms-btn-wa' : 'ms-btn-outline'}`}
          >
            <FaWhatsapp size={20} aria-hidden="true" />
            Quero cotação deste plano
          </a>
          <p className="mt-3 text-center text-xs text-gray-500">Reg. ANS {plano.registroAns}</p>
        </div>
      </article>
    </Reveal>
  )
}

export default function Plans() {
  return (
    <section id="planos" className="ms-section bg-ms-cream" aria-labelledby="plans-title">
      <div className="ms-container">
        <Reveal>
          <SectionHeading
            id="plans-title"
            eyebrow="Planos disponíveis"
            title="Quatro opções, todas sem coparticipação"
            lead="Escolha entre cobertura em Porto Alegre ou rede em 8 estados. O consultor da Excellent envia os valores da sua faixa etária no WhatsApp."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PLANOS.map((p, i) => (
            <PlanCard key={p.id} plano={p} index={i} />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-gray-600">
          Todos os planos são coletivos por adesão, com segmentação ambulatorial + hospitalar sem obstetrícia. Os valores variam por faixa etária e são informados pelo consultor. Reajuste anual em janeiro.
        </p>
      </div>
    </section>
  )
}
