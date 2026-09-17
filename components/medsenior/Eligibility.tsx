import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { FiBriefcase, FiFileText, FiHeart } from 'react-icons/fi'
import { ELEGIBILIDADE } from '@/lib/medsenior'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Eligibility() {
  const { entidade, dependentes, documentosTitular } = ELEGIBILIDADE
  return (
    <section id="quem-pode" className="ms-section bg-white" aria-labelledby="elig-title">
      <div className="ms-container">
        <Reveal>
          <SectionHeading
            id="elig-title"
            eyebrow="Quem pode aderir"
            title="Planos por adesão: para quem tem a partir de 44 anos e vínculo com uma entidade de classe"
            lead="A adesão é feita por meio da ASSGAPA, entidade parceira desta oferta. A Excellent cuida da filiação junto com você — sem burocracia."
          />
        </Reveal>

        <Reveal>
          <article className="mt-12 ms-card p-6 md:p-8 lg:flex lg:items-start lg:gap-10">
            <div className="flex items-center gap-4 shrink-0">
              <Image src="/medsenior/logo-assgapa.png" alt="" width={96} height={96} className="h-16 w-16" />
              <div>
                <span className="ms-eyebrow"><FiBriefcase aria-hidden="true" /> Entidade de classe</span>
                <h3 className="mt-1 text-3xl font-extrabold text-ms-green-900">{entidade.sigla}</h3>
              </div>
            </div>
            <div className="mt-5 lg:mt-0">
              <p className="font-semibold text-ms-green-900">{entidade.titulo}</p>
              <p className="mt-1 text-gray-600">{entidade.subtitulo}</p>
              <p className="mt-4 text-sm font-semibold text-ms-green-900">Documentação:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                {entidade.documentos.map((d) => <li key={d}>{d}</li>)}
              </ul>
              <p className="mt-3 text-sm text-gray-500">{entidade.observacao}</p>
            </div>
          </article>
        </Reveal>

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
          <p className="text-gray-700">Ficou com dúvida sobre a filiação? A Excellent explica tudo e também trabalha com outras operadoras.</p>
          <a href={buildWhatsAppUrl({ origem: 'elegibilidade' })} target="_blank" rel="noopener noreferrer" className="ms-btn ms-btn-primary">
            <FaWhatsapp size={20} aria-hidden="true" /> Falar com um consultor
          </a>
        </div>
      </div>
    </section>
  )
}
