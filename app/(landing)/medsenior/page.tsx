import LpHeader from '@/components/medsenior/LpHeader'
import LpFooter from '@/components/medsenior/LpFooter'
import StickyWhatsApp from '@/components/medsenior/StickyWhatsApp'

export default function MedSeniorPage() {
  return (
    <>
      <LpHeader />
      <main id="topo" className="pb-24 md:pb-0">
        <section className="ms-section">
          <div className="ms-container">
            <h1 className="ms-h2">Plano de saúde feito para quem tem a partir de 44 anos</h1>
          </div>
        </section>
      </main>
      <LpFooter />
      <StickyWhatsApp />
    </>
  )
}
