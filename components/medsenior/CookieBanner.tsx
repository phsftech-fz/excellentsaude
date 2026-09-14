'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const KEY = 'ms-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  function aceitar() {
    try {
      localStorage.setItem(KEY, new Date().toISOString())
    } catch {
      // armazenamento indisponível: apenas fecha o banner nesta visita
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div role="region" aria-label="Aviso de cookies" className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:max-w-md z-50 ms-card p-5 shadow-2xl">
      <p className="text-sm text-gray-700">
        Usamos cookies para melhorar sua experiência e medir o desempenho desta página. Saiba mais na nossa{' '}
        <Link href="/politica-privacidade" className="font-semibold text-ms-green-700 underline underline-offset-2">Política de Privacidade</Link>{' '}
        e em <Link href="/lgpd" className="font-semibold text-ms-green-700 underline underline-offset-2">LGPD</Link>.
      </p>
      <button type="button" onClick={aceitar} className="ms-btn ms-btn-primary mt-4 w-full min-h-[44px]">
        Entendi e aceito
      </button>
    </div>
  )
}
