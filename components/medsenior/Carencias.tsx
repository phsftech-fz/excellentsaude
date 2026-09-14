import { CARENCIAS, NOTA_CARENCIAS } from '@/lib/medsenior'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Carencias() {
  return (
    <section id="carencias" className="ms-section bg-white" aria-labelledby="car-title">
      <div className="ms-container">
        <Reveal>
          <SectionHeading
            id="car-title"
            eyebrow="Carências"
            title="Já tem plano há 6 meses? Quase tudo libera em 24 horas"
            lead="Veja os prazos contratuais e como a portabilidade de carências funciona na MedSênior."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 overflow-x-auto rounded-3xl rounded-tl-none border border-ms-green-100">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Prazos de carência com e sem plano anterior</caption>
              <thead className="bg-ms-green-700 text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-bold">Procedimento</th>
                  <th scope="col" className="px-5 py-4 font-bold">Sem plano anterior</th>
                  <th scope="col" className="px-5 py-4 font-bold">Com plano anterior (mín. 6 meses)</th>
                </tr>
              </thead>
              <tbody>
                {CARENCIAS.map((c, i) => (
                  <tr key={c.procedimento} className={i % 2 ? 'bg-ms-cream' : 'bg-white'}>
                    <th scope="row" className="px-5 py-3 font-medium text-ms-ink">{c.procedimento}</th>
                    <td className="px-5 py-3 text-gray-700">{c.semPlano}</td>
                    <td className="px-5 py-3 font-semibold text-ms-green-700">{c.comPlano}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mt-6 text-sm leading-relaxed text-gray-600">{NOTA_CARENCIAS}</p>
      </div>
    </section>
  )
}
