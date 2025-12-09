'use client'

import { useState } from 'react'
import { FiCheck, FiArrowRight } from 'react-icons/fi'

export default function Hero() {
  const [formData, setFormData] = useState({
    estado: '',
    tipoPlano: '',
    nome: '',
    email: '',
    telefone: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Formata a mensagem para WhatsApp
    let mensagem = '*Nova Solicitação de Cotação*\n\n'
    mensagem += `*Nome:* ${formData.nome}\n`
    mensagem += `*E-mail:* ${formData.email}\n`
    mensagem += `*Telefone:* ${formData.telefone}\n`
    mensagem += `*Estado:* ${formData.estado}\n`
    
    const tipoPlanoMap: { [key: string]: string } = {
      'coletivo': 'Coletivos por Adesão',
      'empresarial': 'Empresariais e PME',
      'individual': 'Individuais e Familiares'
    }
    mensagem += `*Tipo de Plano:* ${tipoPlanoMap[formData.tipoPlano] || formData.tipoPlano}\n`
    
    // Codifica a mensagem para URL
    const mensagemEncoded = encodeURIComponent(mensagem)
    
    // Redireciona para WhatsApp
    window.open(`https://wa.me/5551996605080?text=${mensagemEncoded}`, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="home" className="bg-gradient-to-br from-excellent-navy-900 via-excellent-navy-800 to-excellent-navy-900 text-white section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-excellent-green-500">Excellent</span>
              <br />
              <span className="text-excellent-blue-400">Saúde</span>
              <br />
              Corretora de Seguros
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Especialista em saúde, comprometida com pessoas e resultados. Soluções personalizadas 
              em planos e seguros de saúde e odontológicos para empresas, órgãos públicos e entidades de autogestão.
            </p>
            
            {/* Benefits List */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-center space-x-3">
                <FiCheck className="text-excellent-green-500" size={24} />
                <span>Atendimento humanizado e foco no cliente</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiCheck className="text-excellent-green-500" size={24} />
                <span>Experiência consolidada no mercado</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiCheck className="text-excellent-green-500" size={24} />
                <span>Profissionais com décadas de atuação</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiCheck className="text-excellent-green-500" size={24} />
                <span>Melhor relação custo benefício do mercado</span>
              </li>
            </ul>

            <a href="#cotacao" className="btn-primary inline-flex items-center space-x-2">
              <span>Solicitar Cotação Grátis</span>
              <FiArrowRight />
            </a>
          </div>

          {/* Right Content - Quick Quote Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
            <h2 className="text-2xl font-bold mb-2 text-excellent-navy-900">Solicite sua cotação agora!</h2>
            <p className="text-gray-600 mb-6">Preencha o formulário e receba uma cotação personalizada</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione seu Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-excellent-green-500 focus:border-excellent-green-500"
                >
                  <option value="">Selecione...</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="PR">Paraná</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="BA">Bahia</option>
                  <option value="GO">Goiás</option>
                  <option value="PE">Pernambuco</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="RO">Rondônia</option>
                </select>
              </div>

              <div>
                <label htmlFor="tipoPlano" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Plano
                </label>
                <select
                  id="tipoPlano"
                  name="tipoPlano"
                  value={formData.tipoPlano}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-excellent-green-500 focus:border-excellent-green-500"
                >
                  <option value="">Selecione...</option>
                  <option value="coletivo">Coletivos por Adesão</option>
                  <option value="empresarial">Empresariais e PME</option>
                  <option value="individual">Individuais e Familiares</option>
                </select>
              </div>

              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-excellent-green-500 focus:border-excellent-green-500"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-excellent-green-500 focus:border-excellent-green-500"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-excellent-green-500 focus:border-excellent-green-500"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <span>Solicitar Cotação</span>
                <FiArrowRight />
              </button>

              <p className="text-xs text-gray-500 text-center">
                Ao enviar, você concorda com nossa Política de Privacidade
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

