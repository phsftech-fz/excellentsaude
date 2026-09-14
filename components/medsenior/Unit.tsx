import { FaWhatsapp } from 'react-icons/fa'
import { FiExternalLink, FiMapPin } from 'react-icons/fi'
import { AREA_COMERCIALIZACAO, OPERADORA } from '@/lib/medsenior'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Unit() {
  const { municipal, nacional } = AREA_COMERCIALIZACAO
  return (
    <section id="onde-usar" className="ms-section bg-ms-cream" aria-labelledby="unit-title">
      <div className="ms-container grid gap-10 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <SectionHeading
            id="unit-title"
            eyebrow="Onde você é atendido"
            title="Unidade própria MedSênior em Porto Alegre e rede em 8 estados"
            lead="Pronto atendimento, consultas e exames em unidade própria da operadora, além de hospitais credenciados. A rede é disponibilizada conforme o plano contratado."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={OPERADORA.redeUrl} target="_blank" rel="noopener noreferrer" className="ms-btn ms-btn-outline">
              Consultar rede credenciada <FiExternalLink aria-hidden="true" />
            </a>
            <a href={buildWhatsAppUrl({ origem: 'unidade' })} target="_blank" rel="noopener noreferrer" className="ms-btn ms-btn-wa">
              <FaWhatsapp size={20} aria-hidden="true" /> Tirar dúvidas sobre a rede
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-500">A rede credenciada pode sofrer alterações pela operadora, seguindo as diretrizes da ANS.</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-4">
            <article className="ms-card p-6">
              <span className="ms-eyebrow"><FiMapPin aria-hidden="true" /> Abrangência municipal</span>
              <h3 className="mt-2 text-lg font-bold text-ms-green-900">{municipal.planos}</h3>
              <p className="text-gray-700">{municipal.area}</p>
            </article>
            <article className="ms-card p-6">
              <span className="ms-eyebrow"><FiMapPin aria-hidden="true" /> Grupo de municípios</span>
              <h3 className="mt-2 text-lg font-bold text-ms-green-900">{nacional.planos}</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                {nacional.area.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
