# Excellent Saúde - Site Institucional

Site institucional da Excellent Saúde, corretora de planos de saúde especializada em encontrar as melhores soluções para pessoas físicas e jurídicas.

## 🚀 Tecnologias

- **Next.js 14** - Framework React para produção
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **React Icons** - Ícones

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## 🎨 Estrutura do Site

### Páginas Principais

- **Home** - Página principal com todas as seções
  - Hero Section com formulário de cotação rápida
  - Serviços e diferenciais
  - Tipos de planos (Coletivos, Empresariais, Individuais)
  - Planos por região
  - Sobre a empresa
  - Depoimentos de clientes
  - Formulário completo de cotação

- **/medsenior** - Landing page de conversão MedSênior (layout próprio em `app/(landing)`)
  - Conteúdo editável em `lib/medsenior.ts` (planos, FAQ, textos legais, razão social/CNPJ)
  - Selo "Corretora autorizada": colocar o arquivo recebido do Gestor Comercial em `public/medsenior/selo-autorizada.png` (o selo é lido no build — faça um novo deploy depois de adicionar o arquivo)
  - Testes: `npm test`

### Componentes

- `Header` - Cabeçalho com navegação responsiva
- `Footer` - Rodapé com links e informações de contato
- `Hero` - Seção hero com formulário de cotação rápida
- `Services` - Diferenciais e serviços
- `PlanTypes` - Tipos de planos disponíveis
- `RegionPlans` - Planos por região
- `About` - Sobre a empresa
- `Testimonials` - Depoimentos
- `QuickQuote` - Formulário completo de cotação

## 🎯 Funcionalidades

- ✅ Design responsivo e moderno
- ✅ Formulários de cotação em múltiplas seções
- ✅ Navegação suave (smooth scroll)
- ✅ SEO otimizado
- ✅ Acessibilidade (links no rodapé)
- ✅ Cores personalizadas (fz-navy, fz-gold, fz-gray)

## 📝 Próximos Passos

- Integração com serviço de envio de formulários (ex: Formspree, EmailJS)
- Integração de chat ao vivo (ex: Tawk.to, Intercom)
- Páginas de Política de Privacidade e Termos de Uso
- Blog para conteúdo SEO
- Integração com Google Analytics

## 📧 Envio dos leads por e-mail

Os formulários (home, cotação completa e LP MedSênior) postam em `/api/lead`, que envia
o lead por SMTP para `comercial@excellentsaude.com.br`. O botão do WhatsApp continua
abrindo normalmente.

Variáveis de ambiente (cadastrar no Easypanel — serviço `excellent-saude-web` > Ambiente):

| Variável | Valor |
|---|---|
| `SMTP_HOST` | `smtp.hostinger.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `comercial@excellentsaude.com.br` |
| `SMTP_PASSWORD` | senha da caixa de e-mail |
| `LEAD_TO` | `comercial@excellentsaude.com.br` |

Enquanto `SMTP_USER`/`SMTP_PASSWORD` não estiverem definidas, os formulários voltam ao
comportamento antigo (WhatsApp + rascunho de e-mail no programa do visitante), sem quebrar.

Proteções: campo honeypot invisível e limite de 20 envios por IP a cada 10 minutos.

## 🌐 Deploy

O site pode ser deployado em:
- Vercel (recomendado para Next.js)
- Netlify
- AWS Amplify
- Qualquer servidor Node.js

