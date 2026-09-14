import Link from 'next/link'
import Image from 'next/image'
import { FiInstagram, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { CONTATO, OPERADORA, TEXTO_RESPONSABILIDADE } from '@/lib/medsenior'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export default function LpFooter() {
  return (
    <footer className="bg-ms-green-900 text-ms-green-100" aria-label="Rodapé">
      <div className="ms-container py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image src="/logoexcellent.png.bv.webp" alt="Excellent Saúde" width={180} height={60} className="h-11 w-auto brightness-0 invert" />
            <p className="mt-4 text-sm leading-relaxed">
              Corretora de planos e seguros de saúde em Porto Alegre. Atuamos com ética, empatia e foco no bem-estar dos nossos clientes.
            </p>
            <p className="mt-3 text-xs text-ms-green-100/70">Registro SUSEP {CONTATO.susep}</p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><FiMapPin className="mt-1 shrink-0 text-ms-lime" aria-hidden="true" /><span>{CONTATO.endereco}</span></li>
              <li className="flex gap-2"><FiPhone className="mt-1 shrink-0 text-ms-lime" aria-hidden="true" /><a className="hover:text-white" href={buildWhatsAppUrl({ origem: 'header' })} target="_blank" rel="noopener noreferrer">WhatsApp {CONTATO.whatsappFormatado}</a></li>
              <li className="flex gap-2"><FiMail className="mt-1 shrink-0 text-ms-lime" aria-hidden="true" /><a className="hover:text-white" href={`mailto:${CONTATO.email}`}>{CONTATO.email}</a></li>
              <li className="flex gap-2"><FiInstagram className="mt-1 shrink-0 text-ms-lime" aria-hidden="true" /><a className="hover:text-white" href={CONTATO.instagram} target="_blank" rel="noopener noreferrer">@excellentsaude</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Informações legais</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-white underline-offset-4 hover:underline" href="/politica-privacidade">Política de Privacidade</Link></li>
              <li><Link className="hover:text-white underline-offset-4 hover:underline" href="/lgpd">LGPD e cookies</Link></li>
              <li><Link className="hover:text-white underline-offset-4 hover:underline" href="/termos-uso">Termos de Uso</Link></li>
              <li><a className="hover:text-white underline-offset-4 hover:underline" href={OPERADORA.redeUrl} target="_blank" rel="noopener noreferrer">Rede credenciada {OPERADORA.nome}</a></li>
            </ul>
            <p className="mt-4 text-xs text-ms-green-100/70">{OPERADORA.nome} — ANS nº {OPERADORA.ans}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 space-y-3 text-xs text-ms-green-100/80">
          <p className="font-semibold text-ms-green-100">{TEXTO_RESPONSABILIDADE()}</p>
          <p>Plano de saúde coletivo por adesão, conforme Resoluções Normativas da ANS. Valores informados pelo consultor conforme faixa etária. Rede credenciada sujeita a alterações pela operadora.</p>
          <p>© {new Date().getFullYear()} Excellent Saúde. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
