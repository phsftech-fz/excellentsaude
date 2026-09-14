import { FaWhatsapp } from 'react-icons/fa'
import { FiBriefcase, FiFileText, FiHeart } from 'react-icons/fi'
import { ELEGIBILIDADE } from '@/lib/medsenior'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Eligibility() {
  const { assena, arpl, dependentes, documentosTitular } = ELEGIBILIDADE
  return (
    <section id="quem-pode" className="ms-section bg-white" aria-labelledby="elig-title">
      <div className="ms-container">
        <Reveal>
          <SectionHeading
            id="elig-title"
            eyebrow="Quem pode aderir"
            title="Planos por adesão: para quem tem a partir de 44 anos e vínculo com uma entidade de classe"
            lead="A adesão é feita por meio de associações parceiras. A Excellent cuida da filiação junto com você — sem burocracia."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="ms-card h-full p-6 md:p-8">
              <span className="ms-eyebrow"><FiBriefcase aria-hidden="true" /> {assena.sigla}</span>
              <h3 className="mt-3 text-2xl font-extrabold text-ms-green-900">{assena.titulo}</h3>
              <p className="text-gray-600">{assena.subtitulo}</p>
              <p className="mt-4 text-sm font-semibold text-ms-green-900">Documentação:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                {assena.documentos.map((d) => <li key={d}>{d}</li>)}
              </ul>
              <p className="mt-3 text-sm text-gray-500">{assena.observacao}</p>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article className="ms-card h-full p-6 md:p-8">
              <span className="ms-eyebrow"><FiFileText aria-hidden="true" /> {arpl.sigla}</span>
              <h3 className="mt-3 text-2xl font-extrabold text-ms-green-900">{arpl.titulo}</h3>
              <p className="text-gray-600">{arpl.subtitulo}</p>
              <p className="mt-4 text-sm font-semibold text-ms-green-900">Documentação:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                {arpl.documentos.map((d) => <li key={d}>{d}</li>)}
              </ul>
              <details className="mt-4 group">
                <summary className="cursor-pointer list-none font-semibold text-ms-green-700 underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
                  Ver as {arpl.profissoes.length} profissões aceitas
                </summary>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {arpl.profissoes.map((p) => (
                    <li key={p} className="rounded-full bg-ms-green-50 px-3 py-1 text-sm text-ms-green-900">{p}</li>
                  ))}
                </ul>
              </details>
            </article>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="mt-6 grid gap-6 rounded-3xl rounded-tl-none bg-ms-cream p-6 md:grid-cols-2 md:p-8">
            <div>
              <span className="ms-eyebrow"><FiHeart aria-hidden="true" /> Dependentes aceitos</span>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-gray-700">
                {dependentes.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
            <div>
              <span className="ms-eyebrow"><FiFileText aria-hidden="true" /> Documentos do titular</span>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">
                {documentosTitular.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-gray-700">Não se encaixa em nenhuma entidade? A Excellent trabalha com outras operadoras.</p>
          <a href={buildWhatsAppUrl({ origem: 'elegibilidade' })} target="_blank" rel="noopener noreferrer" className="ms-btn ms-btn-primary">
            <FaWhatsapp size={20} aria-hidden="true" /> Falar com um consultor
          </a>
        </div>
      </div>
    </section>
  )
}
