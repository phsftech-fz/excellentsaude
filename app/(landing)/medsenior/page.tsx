import LpHeader from '@/components/medsenior/LpHeader'
import LpFooter from '@/components/medsenior/LpFooter'
import StickyWhatsApp from '@/components/medsenior/StickyWhatsApp'
import Hero from '@/components/medsenior/Hero'
import TrustBar from '@/components/medsenior/TrustBar'
import WhyMedSenior from '@/components/medsenior/WhyMedSenior'
import Plans from '@/components/medsenior/Plans'
import Eligibility from '@/components/medsenior/Eligibility'
import HowItWorks from '@/components/medsenior/HowItWorks'
import Carencias from '@/components/medsenior/Carencias'
import Unit from '@/components/medsenior/Unit'

export default function MedSeniorPage() {
  return (
    <>
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
      </main>
      <LpFooter />
      <StickyWhatsApp />
    </>
  )
}
