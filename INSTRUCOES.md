# 🚀 Instruções de Instalação e Execução

## Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

## Passo a Passo

### 1. Instalar Dependências

```bash
npm install
```

### 2. Executar em Modo de Desenvolvimento

```bash
npm run dev
```

O site estará disponível em: `http://localhost:3000`

### 3. Build para Produção

```bash
npm run build
npm start
```

## 📝 Configurações Importantes

### Atualizar Informações de Contato

Edite os seguintes arquivos para atualizar informações de contato:

1. **components/Header.tsx** - Telefone e e-mail no cabeçalho
2. **components/Footer.tsx** - Informações de contato no rodapé
3. **components/sections/QuickQuote.tsx** - Telefone e e-mail no formulário
4. **components/ChatWidget.tsx** - Número do WhatsApp

### Integrar Formulários

Os formulários atualmente apenas exibem um alerta. Para integrar com um serviço real:

**Opção 1: EmailJS (Gratuito)**
1. Crie uma conta em https://www.emailjs.com/
2. Configure um template de e-mail
3. Adicione o código no componente Hero.tsx e QuickQuote.tsx

**Opção 2: Formspree (Gratuito)**
1. Crie uma conta em https://formspree.io/
2. Obtenha o endpoint do formulário
3. Atualize os handlers de submit

**Opção 3: API Backend Própria**
1. Crie um endpoint para receber os dados
2. Atualize os handlers de submit para fazer POST

### Integrar Chat ao Vivo

O componente ChatWidget está configurado para redirecionar ao WhatsApp. Para integrar um chat real:

**Opção 1: Tawk.to (Gratuito)**
1. Crie uma conta em https://www.tawk.to/
2. Adicione o script no `app/layout.tsx`

**Opção 2: Intercom**
1. Crie uma conta no Intercom
2. Adicione o script de inicialização

### Adicionar Google Analytics

1. Crie uma propriedade no Google Analytics
2. Adicione o script no `app/layout.tsx`:

```tsx
// Adicione antes do </head>
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### Personalizar Cores

As cores estão definidas em `tailwind.config.ts`. Você pode ajustar:
- `fz-navy` - Tons de azul navy
- `fz-gold` - Tons de dourado
- `fz-gray` - Tons de cinza

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Conecte o repositório no Vercel
3. O deploy será automático

### Netlify

1. Faça push do código para GitHub
2. Conecte o repositório no Netlify
3. Configure o build command: `npm run build`
4. Configure o publish directory: `.next`

## 📱 SEO

O site já inclui:
- Meta tags básicas no `app/layout.tsx`
- Estrutura semântica HTML
- URLs amigáveis

Para melhorar ainda mais:
1. Adicione mais conteúdo nas páginas
2. Crie um blog (pode usar MDX)
3. Adicione schema.org markup
4. Configure sitemap.xml

## ✅ Checklist Antes de Publicar

- [ ] Atualizar informações de contato
- [ ] Integrar formulários com serviço real
- [ ] Configurar chat ao vivo
- [ ] Adicionar Google Analytics
- [ ] Testar em diferentes dispositivos
- [ ] Verificar links externos
- [ ] Revisar textos e conteúdo
- [ ] Configurar domínio personalizado
- [ ] Configurar SSL/HTTPS
- [ ] Testar velocidade de carregamento

