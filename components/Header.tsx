'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu, FiX, FiPhone } from 'react-icons/fi'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-excellent-navy-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/logoexcellent.png.bv.webp"
              alt="Excellent Saúde"
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="hover:text-excellent-blue-400 transition-colors">Home</Link>
            <Link href="#servicos" className="hover:text-excellent-blue-400 transition-colors">Serviços</Link>
            <Link href="#planos" className="hover:text-excellent-blue-400 transition-colors">Tipos de Planos</Link>
            <Link href="#operadoras" className="hover:text-excellent-blue-400 transition-colors">Operadoras</Link>
            <Link href="#sobre" className="hover:text-excellent-blue-400 transition-colors">Sobre Nós</Link>
            <a href="#cotacao" className="btn-primary">
              Orçamento
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-4">
            <Link href="#home" className="block hover:text-excellent-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="#servicos" className="block hover:text-excellent-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Serviços</Link>
            <Link href="#planos" className="block hover:text-excellent-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Tipos de Planos</Link>
            <Link href="#operadoras" className="block hover:text-excellent-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Operadoras</Link>
            <Link href="#sobre" className="block hover:text-excellent-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Sobre Nós</Link>
            <a href="#cotacao" className="btn-primary inline-block" onClick={() => setIsMenuOpen(false)}>
              Orçamento
            </a>
          </nav>
        )}
      </div>

      {/* Contact Bar */}
      <div className="bg-excellent-navy-800 py-2">
        <div className="container-custom">
          <div className="flex items-center justify-center md:justify-end space-x-6 text-sm">
            <a href="https://wa.me/5551996605080" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-excellent-blue-400 transition-colors">
              <FiPhone size={16} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

