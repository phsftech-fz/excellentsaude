import { NOTAS_NUMEROS, NUMEROS } from '@/lib/medsenior'
import Reveal from './Reveal'

export default function TrustBar() {
  return (
    <section className="bg-ms-cream border-y border-ms-green-100" aria-label="Números da MedSênior">
      <div className="ms-container py-10">
        <Reveal>
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {NUMEROS.map((n) => (
              <div key={n.rotulo} className="flex flex-col-reverse text-center">
                <dt className="mt-1 text-sm font-medium text-gray-600">{n.rotulo}</dt>
                <dd className="text-3xl font-extrabold text-ms-green-700 md:text-4xl">{n.valor}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <p className="mt-6 text-center text-xs text-gray-500">{NOTAS_NUMEROS.join(' ')}</p>
      </div>
    </section>
  )
}
