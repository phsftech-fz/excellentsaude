import Link from 'next/link'
import { FiInstagram, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-excellent-navy-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-excellent-green-500">Excellent</span>{' '}
              <span className="text-excellent-blue-400">Saúde</span>
            </h3>
            <p className="text-gray-300 mb-4">
              A Excellent Saúde é uma corretora especializada em planos e seguros de saúde e odontológicos 
              para empresas privadas, órgãos públicos, associações, sindicatos e entidades de autogestão.
            </p>
            <p className="text-gray-300 mb-4 text-sm">
              Atuamos com ética, empatia e foco total no bem-estar dos nossos clientes.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/excellentsaude/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-excellent-green-500 transition-colors" aria-label="Instagram">
                <FiInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-gray-300 hover:text-excellent-green-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="#servicos" className="text-gray-300 hover:text-excellent-green-500 transition-colors">Serviços</Link>
              </li>
              <li>
                <Link href="#planos" className="text-gray-300 hover:text-excellent-green-500 transition-colors">Tipos de Planos</Link>
              </li>
              <li>
                <Link href="#sobre" className="text-gray-300 hover:text-excellent-green-500 transition-colors">Sobre Nós</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nossos Serviços</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#planos" className="text-gray-300 hover:text-excellent-green-500 transition-colors">Planos Empresariais</Link>
              </li>
              <li>
                <Link href="#planos" className="text-gray-300 hover:text-excellent-green-500 transition-colors">Planos Individuais</Link>
              </li>
              <li>
                <Link href="#planos" className="text-gray-300 hover:text-excellent-green-500 transition-colors">Planos Coletivos</Link>
              </li>
              <li>
                <Link href="#planos" className="text-gray-300 hover:text-excellent-green-500 transition-colors">Planos Odontológicos</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <FiMapPin className="mt-1 text-excellent-green-500" size={18} />
                <span className="text-gray-300 text-sm">
                  Av. Praia de Belas, 1212 – Sala 424<br />
                  Menino Deus – Porto Alegre/RS<br />
                  CEP: 90110-000
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="text-excellent-green-500" size={18} />
                <a href="https://wa.me/5551996605080" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-excellent-green-500 transition-colors text-sm">WhatsApp</a>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="text-excellent-green-500" size={18} />
                <a href="mailto:atendimento@excellentsaude.com.br" className="text-gray-300 hover:text-excellent-green-500 transition-colors text-sm">E-mail</a>
              </li>
              <li className="mt-2">
                <p className="text-gray-400 text-xs">
                  Registro SUSEP: 202083498
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-excellent-navy-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Excellent Saúde. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/politica-privacidade" className="text-gray-400 hover:text-excellent-green-500 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos-uso" className="text-gray-400 hover:text-excellent-green-500 transition-colors">
                Termos de Uso
              </Link>
              <Link href="/lgpd" className="text-gray-400 hover:text-excellent-green-500 transition-colors">
                LGPD
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

