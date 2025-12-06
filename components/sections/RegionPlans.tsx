'use client'

import { useState } from 'react'
import { FiMapPin } from 'react-icons/fi'

const estados = [
  'ALL', 'AP', 'CE', 'DF', 'ES', 'GO', 'MG', 'PE', 'PR', 'RJ', 'RO', 'RS', 'SC', 'SP'
]

export default function RegionPlans() {
  const [selectedEstado, setSelectedEstado] = useState('ALL')

  return (
    <section className="section-padding bg-gradient-to-br from-fz-navy-900 to-fz-navy-800 text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Encontre um Plano na sua <span className="text-fz-gold-400">Região</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Selecione o estado onde você mora e veja todos os planos que atendem na sua região
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {estados.map((estado) => (
            <button
              key={estado}
              onClick={() => setSelectedEstado(estado)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedEstado === estado
                  ? 'bg-fz-gold-500 text-fz-navy-900 shadow-lg transform scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {estado}
            </button>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
          <FiMapPin className="text-fz-gold-400 mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold mb-4">
            Planos disponíveis em {selectedEstado === 'ALL' ? 'todo o Brasil' : selectedEstado}
          </h3>
          <p className="text-gray-300 mb-6">
            Entre em contato conosco para conhecer os planos disponíveis na sua região
          </p>
          <a href="#cotacao" className="btn-primary inline-flex items-center space-x-2">
            <span>Solicitar Cotação</span>
          </a>
        </div>
      </div>
    </section>
  )
}

