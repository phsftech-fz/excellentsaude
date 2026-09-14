'use client'

import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { FAQ } from '@/lib/medsenior'
import SectionHeading from './SectionHeading'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="ms-section bg-ms-cream" aria-labelledby="faq-title">
      <div className="ms-container max-w-4xl">
        <SectionHeading id="faq-title" align="center" eyebrow="Dúvidas frequentes" title="O que as pessoas perguntam antes de contratar" />
        <div className="mt-10 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            const panelId = `faq-panel-${i}`
            const btnId = `faq-btn-${i}`
            return (
              <div key={item.pergunta} className="ms-card overflow-hidden">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-bold text-ms-green-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ms-lime/60"
                  >
                    {item.pergunta}
                    <FiChevronDown aria-hidden="true" className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="px-6 pb-6 leading-relaxed text-gray-700">
                  {item.resposta}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
