import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { FiCheckCircle } from 'react-icons/fi'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const SELO_PATH = path.join(process.cwd(), 'public', 'medsenior', 'selo-autorizada.png')

export default function LpHeader() {
  const temSelo = fs.existsSync(SELO_PATH)
  const href = buildWhatsAppUrl({ origem: 'header' })

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-ms-green-100">
      <div className="ms-container flex items-center justify-between gap-4 h-20">
        <a href="#topo" className="flex items-center shrink-0" aria-label="Excellent Saúde – início da página">
          <Image src="/logoexcellent.png.bv.webp" alt="Excellent Saúde" width={180} height={60} className="h-11 w-auto" />
        </a>

        {temSelo ? (
          <Image src="/medsenior/selo-autorizada.png" alt="Corretora autorizada MedSênior" width={200} height={64} className="hidden sm:block h-12 w-auto" />
        ) : (
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-ms-green-100 bg-ms-green-50 px-4 py-2 text-sm font-semibold text-ms-green-700">
            <FiCheckCircle aria-hidden="true" />
            Corretora autorizada MedSênior
          </span>
        )}

        <a href={href} target="_blank" rel="noopener noreferrer" className="ms-btn ms-btn-wa px-5">
          <FaWhatsapp size={22} aria-hidden="true" />
          <span className="hidden md:inline">Falar com consultor</span>
          <span className="md:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  )
}
