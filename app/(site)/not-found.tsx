import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="section-padding bg-gray-50 min-h-[60vh]">
      <div className="container-custom max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-excellent-navy-900 mb-4">Página não encontrada</h1>
        <p className="text-gray-700 mb-8">O endereço que você acessou não existe ou foi movido.</p>
        <Link href="/" className="btn-primary inline-block">Voltar para o início</Link>
      </div>
    </div>
  )
}
