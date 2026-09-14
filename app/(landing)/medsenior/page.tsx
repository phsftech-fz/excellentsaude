import type { Metadata } from 'next'
import { CONTATO, FAQ } from '@/lib/medsenior'
import LpHeader from '@/components/medsenior/LpHeader'
import Hero from '@/components/medsenior/Hero'
import TrustBar from '@/components/medsenior/TrustBar'
import WhyMedSenior from '@/components/medsenior/WhyMedSenior'
import Plans from '@/components/medsenior/Plans'
import Eligibility from '@/components/medsenior/Eligibility'
import HowItWorks from '@/components/medsenior/HowItWorks'
import Carencias from '@/components/medsenior/Carencias'
import Unit from '@/components/medsenior/Unit'
import WhyExcellent from '@/components/medsenior/WhyExcellent'
import Faq from '@/components/medsenior/Faq'
import FinalCta from '@/components/medsenior/FinalCta'
import LpFooter from '@/components/medsenior/LpFooter'
import StickyWhatsApp from '@/components/medsenior/StickyWhatsApp'

const TITLE = 'Plano de Saúde MedSênior em Porto Alegre | Excellent Saúde'
const DESCRIPTION =
  'Plano de saúde MedSênior por adesão para quem tem a partir de 44 anos em Porto Alegre. Sem coparticipação, unidade própria, pronto atendimento virtual 24h. Cotação pelo WhatsApp com a Excellent Saúde.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/medsenior' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/medsenior',
    siteName: 'Excellent Saúde',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/medsenior/og.jpg', width: 1200, height: 630, alt: 'Plano de saúde MedSênior com a Excellent Saúde' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/medsenior/og.jpg'] },
  robots: { index: true, follow: true },
}

const jsonLdAgency = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  name: 'Excellent Saúde',
  url: `${CONTATO.site}/medsenior`,
  telephone: `+${CONTATO.whatsapp}`,
  email: CONTATO.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Praia de Belas, 1212 – Sala 424',
    addressLocality: 'Porto Alegre',
    addressRegion: 'RS',
    postalCode: '90110-000',
    addressCountry: 'BR',
  },
  areaServed: 'Porto Alegre, RS',
}

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.pergunta,
    acceptedAnswer: { '@type': 'Answer', text: f.resposta },
  })),
}

const toJsonLd = (obj: unknown) => JSON.stringify(obj).replace(/</g, '\\u003c')

export default function MedSeniorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLdAgency) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLdFaq) }} />
      <LpHeader />
      <main id="topo" className="pb-24 md:pb-0">
        <Hero />
        <TrustBar />
        <WhyMedSenior />
        <Plans />
        <Eligibility />
        <HowItWorks />
        <Carencias />
        <Unit />
        <WhyExcellent />
        <Faq />
        <FinalCta />
      </main>
      <LpFooter />
      <StickyWhatsApp />
    </>
  )
}
