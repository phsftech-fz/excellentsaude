import { FaWhatsapp } from 'react-icons/fa'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export default function StickyWhatsApp() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 md:hidden bg-white/90 backdrop-blur border-t border-ms-green-100">
      <a href={buildWhatsAppUrl({ origem: 'sticky' })} target="_blank" rel="noopener noreferrer" className="ms-btn ms-btn-wa w-full">
        <FaWhatsapp size={22} aria-hidden="true" />
        Receber cotação no WhatsApp
      </a>
    </div>
  )
}
