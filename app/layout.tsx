import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Excellent Saúde - Corretora de Planos de Saúde',
  description: 'Os melhores planos de saúde para sua empresa ou sua família você encontra aqui. Planos empresariais, individuais e coletivos por adesão.',
  keywords: 'plano de saúde, seguro saúde, plano empresarial, plano individual, corretora de saúde',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}

