import LpHeader from '@/components/medsenior/LpHeader'
import LpFooter from '@/components/medsenior/LpFooter'
import StickyWhatsApp from '@/components/medsenior/StickyWhatsApp'
import Hero from '@/components/medsenior/Hero'

export default function MedSeniorPage() {
  return (
    <>
      <LpHeader />
      <main id="topo" className="pb-24 md:pb-0">
        <Hero />
      </main>
      <LpFooter />
      <StickyWhatsApp />
    </>
  )
}
