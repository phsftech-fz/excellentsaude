'use client'

import { useState } from 'react'
import { FiArrowRight, FiPhone, FiMail } from 'react-icons/fi'

export default function QuickQuote() {
  const [formData, setFormData] = useState({
    estado: '',
    tipoPlano: '',
    nome: '',
    email: '',
    telefone: '',
    numeroVidas: '',
    perfil: '',
    cnpj: '',
    operadora: '',
    mensagem: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulário enviado:', formData)
    alert('Cotação solicitada com sucesso! Entraremos em contato em breve.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="cotacao" className="section-padding bg-gradient-to-br from-excellent-navy-700 to-excellent-navy-900 text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Solicite sua cotação agora mesmo!
            </h2>
            <p className="text-xl text-gray-200">
              Preencha o formulário e receba uma cotação personalizada em até 24 horas
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-gray-900">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="cotacao-nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="cotacao-nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-excellent-navy-500 focus:border-excellent-navy-500"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cotacao-telefone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="cotacao-telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-excellent-navy-500 focus:border-excellent-navy-500"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label htmlFor="cotacao-email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="cotacao-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-excellent-navy-500 focus:border-excellent-navy-500"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cotacao-vidas" className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Vidas *
                  </label>
                  <input
                    type="number"
                    id="cotacao-vidas"
                    name="numeroVidas"
                    value={formData.numeroVidas}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-excellent-navy-500 focus:border-excellent-navy-500"
                    placeholder="Ex: 10"
                  />
                </div>

                <div>
                  <label htmlFor="cotacao-perfil" className="block text-sm font-medium text-gray-700 mb-2">
                    Qual o seu perfil? *
                  </label>
                  <select
                    id="cotacao-perfil"
                    name="perfil"
                    value={formData.perfil}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-excellent-navy-500 focus:border-excellent-navy-500"
                  >
                    <option value="">Selecione...</option>
                    <option value="pessoa-fisica">Pessoa Física</option>
                    <option value="cnpj-mei">CNPJ/MEI</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="cotacao-cnpj" className="block text-sm font-medium text-gray-700 mb-2">
                  CNPJ (opcional)
                </label>
                <input
                  type="text"
                  id="cotacao-cnpj"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-excellent-navy-500 focus:border-excellent-navy-500"
                  placeholder="00.000.000/0000-00"
                />
              </div>

              <div>
                <label htmlFor="cotacao-operadora" className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione o Plano *
                </label>
                <select
                  id="cotacao-operadora"
                  name="operadora"
                  value={formData.operadora}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-excellent-navy-500 focus:border-excellent-navy-500"
                >
                  <option value="">Selecione o Plano</option>
                  <option value="amil">Amil</option>
                  <option value="bradesco">Bradesco</option>
                  <option value="ccg">CCG</option>
                  <option value="doctor-clin">Doctor Clin</option>
                  <option value="medsenior">MedSênior</option>
                  <option value="sulamerica">SulAmérica</option>
                  <option value="indiferente">Indiferente / Outra</option>
                </select>
              </div>

              <div>
                <label htmlFor="cotacao-mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                  Sua Mensagem
                </label>
                <textarea
                  id="cotacao-mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-excellent-navy-500 focus:border-excellent-navy-500"
                  placeholder="Conte-nos mais sobre suas necessidades..."
                />
              </div>


              <button
                type="submit"
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <span>Enviar Solicitação de Cotação</span>
                <FiArrowRight />
              </button>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="lgpd-consent"
                  required
                  className="mt-1"
                />
                <label htmlFor="lgpd-consent" className="text-sm text-gray-600">
                  Li e aceito a{' '}
                  <a href="/politica-privacidade" className="text-excellent-blue-600 hover:underline">
                    Política de Privacidade (LGPD)
                  </a>
                  . *
                </label>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-600 mb-4">Ou entre em contato diretamente:</p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
                <a
                  href="https://wa.me/5551996605080"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-excellent-navy-900 hover:text-excellent-green-500 transition-colors"
                >
                  <FiPhone size={20} />
                  <span className="font-semibold">WhatsApp: (51) 99660-5080</span>
                </a>
                <a
                  href="mailto:atendimento@excellentsaude.com.br"
                  className="flex items-center space-x-2 text-excellent-navy-900 hover:text-excellent-blue-600 transition-colors"
                >
                  <FiMail size={20} />
                  <span className="font-semibold">atendimento@excellentsaude.com.br</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

