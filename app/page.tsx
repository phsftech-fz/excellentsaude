import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import PlanTypes from '@/components/sections/PlanTypes'
import Operadoras from '@/components/sections/Operadoras'
import OperadorasDetalhes from '@/components/sections/OperadorasDetalhes'
import About from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'
import QuickQuote from '@/components/sections/QuickQuote'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <PlanTypes />
      <Operadoras />
      <OperadorasDetalhes />
      <About />
      <Testimonials />
      <QuickQuote />
    </>
  )
}

