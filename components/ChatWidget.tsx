'use client'

import { useState } from 'react'
import { FiX, FiSend } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Aqui você pode integrar com um serviço de chat ao vivo (ex: Tawk.to, Intercom)
      // Por enquanto, redireciona para WhatsApp
      const whatsappMessage = encodeURIComponent(message)
      window.open(`https://wa.me/5551996605080?text=${whatsappMessage}`, '_blank')
      setMessage('')
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl z-50 transition-all duration-300 hover:scale-110"
        aria-label="Abrir chat WhatsApp"
      >
        {isOpen ? <FiX size={24} /> : <FaWhatsapp size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col h-96">
          {/* Header */}
          <div className="bg-excellent-navy-900 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div>
              <h3 className="font-bold">Excellent Saúde</h3>
              <p className="text-sm text-gray-300">Atendimento Online</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-excellent-blue-400 transition-colors"
              aria-label="Fechar chat"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <p className="text-sm text-gray-700">
                Olá! 👋 Como posso ajudá-lo hoje? Estou aqui para tirar suas dúvidas sobre nossos planos de saúde.
              </p>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Digite sua mensagem abaixo ou{' '}
              <a
                href="https://wa.me/5551996605080"
                target="_blank"
                rel="noopener noreferrer"
                className="text-excellent-blue-600 hover:underline"
              >
                fale conosco no WhatsApp
              </a>
            </p>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-excellent-blue-500 focus:border-excellent-blue-500"
              />
              <button
                type="submit"
                className="bg-excellent-navy-900 hover:bg-excellent-navy-800 text-white p-2 rounded-lg transition-colors"
                aria-label="Enviar mensagem"
              >
                <FiSend size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

