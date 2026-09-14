import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import '../globals.css'
import CookieBanner from '@/components/medsenior/CookieBanner'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://excellentsaude.com.br'),
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className="font-montserrat bg-white text-ms-ink antialiased">
        <noscript><style>{`.ms-reveal{opacity:1!important;transform:none!important}`}</style></noscript>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
