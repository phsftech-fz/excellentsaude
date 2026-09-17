import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { CORRETORA_AUTORIZADA } from '@/lib/medsenior'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const SELO_PATH = path.join(process.cwd(), 'public', 'medsenior', 'selo-autorizada.png')

export default function LpHeader() {
  const temSelo = fs.existsSync(SELO_PATH)
  const href = buildWhatsAppUrl({ origem: 'header' })

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-ms-green-100">
      <div className="ms-container flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2 md:h-20 md:flex-nowrap md:py-0">
        {/* Marca principal: corretora + corretora autorizada */}
        <a href="#topo" className="order-1 flex items-center gap-2 sm:gap-3 shrink-0 min-w-0" aria-label="Excellent Saúde e Novo Rumo – início da página">
          <Image src="/logoexcellent.png.bv.webp" alt="Excellent Saúde" width={180} height={60} className="h-8 sm:h-11 w-auto" />
          <span className="hidden sm:inline text-ms-green-100 text-xl font-light" aria-hidden="true">+</span>
          <span className="leading-none">
            <span className="block text-base sm:text-lg font-extrabold tracking-tight text-excellent-navy-500">{CORRETORA_AUTORIZADA.nome}</span>
            <span className="block max-w-[7.5rem] sm:max-w-none text-[10px] sm:text-[11px] font-semibold uppercase leading-tight tracking-wider text-ms-green-700">{CORRETORA_AUTORIZADA.descricao}</span>
          </span>
        </a>

        {/* Operadora em destaque + administradora + entidade (linha própria no mobile) */}
        <div className="order-3 flex basis-full items-center justify-center gap-4 border-t border-ms-green-100 pt-2 md:order-2 md:basis-auto md:justify-start md:gap-5 md:border-0 md:pt-0">
          <Image
            src="/medsenior/logo-medsenior.png"
            alt="MedSênior"
            width={900}
            height={311}
            className="relative -top-0.5 md:-top-1 h-9 md:h-12 w-auto shrink-0"
            priority
          />
          <span aria-hidden="true" className="h-7 md:h-8 w-px bg-ms-green-100" />
          <Image
            src="/medsenior/logo-g2c.png"
            alt="G2C Administradora de Benefícios"
            width={400}
            height={400}
            className="h-9 w-9 md:h-11 md:w-11 rounded-lg shrink-0"
          />
          <span aria-hidden="true" className="h-7 md:h-8 w-px bg-ms-green-100" />
          <Image
            src="/medsenior/logo-assgapa.png"
            alt="ASSGAPA – Associação de Suboficiais e Sargentos da Guarnição de Aeronáutica de Porto Alegre"
            width={96}
            height={96}
            className="h-9 w-9 md:h-11 md:w-11 shrink-0"
          />
        </div>

        {temSelo && (
          <Image src="/medsenior/selo-autorizada.png" alt="Selo de corretora autorizada MedSênior" width={200} height={64} className="order-4 hidden xl:block h-12 w-auto" />
        )}

        <a href={href} target="_blank" rel="noopener noreferrer" className="order-2 md:order-5 ms-btn ms-btn-wa px-4 sm:px-5 shrink-0">
          <FaWhatsapp size={22} aria-hidden="true" />
          <span className="hidden lg:inline">Falar com consultor</span>
          <span className="sr-only lg:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  )
}
