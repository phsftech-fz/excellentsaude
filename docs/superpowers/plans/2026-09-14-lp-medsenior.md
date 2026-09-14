# Landing Page MedSênior — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar `/medsenior`, uma landing page de conversão da Excellent Saúde para vender os planos MedSênior (Porto Alegre), com captura de lead 100% via WhatsApp e em conformidade com as regras da operadora.

**Architecture:** Next.js App Router com dois root layouts via route groups — `(site)` mantém o institucional intacto e `(landing)` hospeda a LP com header/rodapé próprios. Conteúdo fica em `lib/medsenior.ts`; a montagem do link do WhatsApp é uma função pura em `lib/whatsapp.ts` (única unidade com teste automatizado). Cada seção é um componente em `components/medsenior/`, server component por padrão.

**Tech Stack:** Next.js 14.2, React 18, TypeScript 5, Tailwind 3.4, react-icons 5, `next/font/google` (Montserrat), Node 22 test runner (`node --test`, type stripping nativo).

**Spec:** `docs/superpowers/specs/2026-09-14-lp-medsenior-design.md`

## Global Constraints

- Nenhum preço em R$ em lugar algum da LP (regra MedSênior).
- Idade comunicada sempre como **"a partir de 44 anos"** (nunca "49+").
- Número de WhatsApp: `5551995567277` (exibido como `(51) 99556-7277`).
- Texto obrigatório no rodapé: `O conteúdo deste site é de responsabilidade da <razão social/CNPJ ou "Excellent Saúde — Registro SUSEP 202083498"> e não possui vínculo com a operadora de saúde.`
- Operadora: `MedSênior — ANS nº 33.561-4`. Link rede credenciada: `https://medsenior.com.br/lp/`.
- Sem depoimentos. Sem dependências npm novas.
- `lib/medsenior.ts` e `lib/whatsapp.ts` usam apenas sintaxe TypeScript "apagável" (sem `enum`, sem parameter properties, sem `namespace`) para rodar no Node com type stripping.
- Botões: altura mínima 52px, `focus-visible:ring`. Um único `<h1>` na página.
- Commits em português, terminando com `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- Ambiente Windows: no bash, caminhos com parênteses precisam de aspas (`"app/(site)/page.tsx"`).

---

## File Structure

| Arquivo | Responsabilidade |
|---|---|
| `app/(site)/layout.tsx` | Root layout do institucional (Header/Footer/ChatWidget) — movido do `app/layout.tsx` |
| `app/(site)/page.tsx`, `app/(site)/lgpd/page.tsx`, `app/(site)/politica-privacidade/page.tsx`, `app/(site)/termos-uso/page.tsx` | Páginas atuais, apenas movidas |
| `app/(landing)/layout.tsx` | Root layout da LP: Montserrat, `<body>`, `CookieBanner` |
| `app/(landing)/medsenior/page.tsx` | Compõe seções, `metadata`, JSON-LD |
| `app/globals.css` | Tokens de componente da LP (`.ms-*`) |
| `tailwind.config.ts` | Cores `ms.*`, `wa`, fonte `montserrat` |
| `tsconfig.json` | `allowImportingTsExtensions` (teste Node) |
| `package.json` | script `test` |
| `lib/medsenior.ts` | Todo o conteúdo editável (tipado) |
| `lib/whatsapp.ts` | `buildWhatsAppMessage`, `buildWhatsAppUrl`, `WHATSAPP_NUMBER`, `formatPhone`, `onlyDigits` |
| `lib/__tests__/whatsapp.test.ts` | Testes do módulo acima |
| `components/medsenior/LpHeader.tsx` | Header sticky com logo, selo e CTA |
| `components/medsenior/Hero.tsx` | Primeira dobra (usa `LeadForm`) |
| `components/medsenior/LeadForm.tsx` | Form client → WhatsApp |
| `components/medsenior/TrustBar.tsx` | Números |
| `components/medsenior/WhyMedSenior.tsx` | Diferenciais |
| `components/medsenior/Plans.tsx` | 4 planos |
| `components/medsenior/Eligibility.tsx` | Quem pode aderir |
| `components/medsenior/HowItWorks.tsx` | 3 passos |
| `components/medsenior/Carencias.tsx` | Tabela de carências |
| `components/medsenior/Unit.tsx` | Unidade POA + área de comercialização |
| `components/medsenior/WhyExcellent.tsx` | Por que pela Excellent |
| `components/medsenior/Faq.tsx` | Acordeão client |
| `components/medsenior/FinalCta.tsx` | CTA final com `LeadForm` compacto |
| `components/medsenior/LpFooter.tsx` | Rodapé com texto obrigatório |
| `components/medsenior/StickyWhatsApp.tsx` | Barra fixa mobile |
| `components/medsenior/CookieBanner.tsx` | Banner LGPD client |
| `components/medsenior/Reveal.tsx` | Scroll-reveal client |
| `components/medsenior/SectionHeading.tsx` | Eyebrow + H2 + lead reutilizáveis |
| `public/medsenior/hero.jpg`, `bem-envelhecer.jpg`, `excellent.jpg`, `og.jpg` | Fotos geradas por IA |

---

### Task 1: Route groups — separar layout do site e da LP

**Files:**
- Create: `app/(site)/layout.tsx`
- Move: `app/page.tsx` → `app/(site)/page.tsx`; `app/lgpd/page.tsx` → `app/(site)/lgpd/page.tsx`; `app/politica-privacidade/page.tsx` → `app/(site)/politica-privacidade/page.tsx`; `app/termos-uso/page.tsx` → `app/(site)/termos-uso/page.tsx`
- Delete: `app/layout.tsx`

**Interfaces:**
- Produces: `app/(site)/layout.tsx` é o root layout de `/`, `/lgpd`, `/politica-privacidade`, `/termos-uso`. O diretório `app/` deixa de ter `layout.tsx` na raiz, permitindo um segundo root layout em `(landing)`.

- [ ] **Step 1: Mover as páginas com `git mv`**

```bash
mkdir -p "app/(site)" && git mv app/page.tsx "app/(site)/page.tsx" && git mv app/lgpd "app/(site)/lgpd" && git mv app/politica-privacidade "app/(site)/politica-privacidade" && git mv app/termos-uso "app/(site)/termos-uso" && git mv app/layout.tsx "app/(site)/layout.tsx"
```

- [ ] **Step 2: Ajustar o import do CSS no layout movido**

Em `app/(site)/layout.tsx`, trocar `import './globals.css'` por `import '../globals.css'`. O arquivo completo deve ficar:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
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
```

- [ ] **Step 3: Build para confirmar que as rotas continuam existindo**

Run: `npm run build`
Expected: sucesso; a tabela de rotas lista `/`, `/lgpd`, `/politica-privacidade`, `/termos-uso`. Se aparecer "Root layout not found", confira que `app/(site)/layout.tsx` contém `<html>` e `<body>`.

- [ ] **Step 4: Commit**

```bash
git add -A app && git commit -m "Move site institucional para route group (site)

Prepara o app para um segundo root layout da landing page MedSênior.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 2: Design tokens (Tailwind + globals.css)

**Files:**
- Modify: `tailwind.config.ts` (bloco `colors` e novo `fontFamily`)
- Modify: `app/globals.css` (fim do arquivo)

**Interfaces:**
- Produces: classes Tailwind `bg-ms-green-{50,100,500,600,700,800,900}`, `text-ms-ink`, `bg-ms-cream`, `bg-ms-lime`, `bg-wa`, `font-montserrat`; classes de componente `.ms-btn`, `.ms-btn-wa`, `.ms-btn-primary`, `.ms-btn-outline`, `.ms-card`, `.ms-eyebrow`, `.ms-h2`, `.ms-section`, `.ms-container`, `.ms-reveal`, `.ms-reveal.is-visible`.

- [ ] **Step 1: Adicionar cores e fonte ao Tailwind**

Em `tailwind.config.ts`, dentro de `theme.extend.colors`, após o objeto `'excellent': {...}` (antes do fechamento de `colors`), adicionar:

```ts
        // Paleta da landing page MedSênior (co-branding)
        'ms': {
          green: {
            50: '#EEF7F1',
            100: '#DDF1E4',
            500: '#1E9E5A',
            600: '#168A4E',
            700: '#0F6B3F',
            800: '#0D5233',
            900: '#0B3D2E',
          },
          lime: '#9BD338',
          cream: '#F4F8F3',
          ink: '#122117',
        },
        'wa': '#25D366',
```

E, dentro de `theme.extend` (irmão de `colors`), adicionar:

```ts
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
```

- [ ] **Step 2: Adicionar classes de componente da LP em `app/globals.css`**

Acrescentar ao final do arquivo:

```css
/* ===== Landing page MedSênior ===== */
@layer components {
  .ms-container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  .ms-section {
    @apply py-16 md:py-24;
  }
  .ms-btn {
    @apply inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-full font-bold text-base leading-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ms-lime/60;
  }
  .ms-btn-wa {
    @apply bg-wa text-white shadow-lg shadow-wa/30 hover:bg-[#1fbf5b] hover:-translate-y-0.5;
  }
  .ms-btn-primary {
    @apply bg-ms-green-700 text-white shadow-lg shadow-ms-green-700/25 hover:bg-ms-green-600 hover:-translate-y-0.5;
  }
  .ms-btn-outline {
    @apply border-2 border-ms-green-700 text-ms-green-700 hover:bg-ms-green-50;
  }
  .ms-card {
    @apply bg-white rounded-3xl rounded-tl-none border border-ms-green-100 shadow-sm;
  }
  .ms-eyebrow {
    @apply inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ms-green-600;
  }
  .ms-h2 {
    @apply text-3xl md:text-4xl font-extrabold text-ms-green-900 leading-tight;
  }
}

.ms-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.ms-reveal.is-visible {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .ms-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 3: Build para validar o CSS**

Run: `npm run build`
Expected: sucesso, sem erro de `@apply` (se acusar classe desconhecida, o token correspondente não foi adicionado ao `tailwind.config.ts`).

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css && git commit -m "Adiciona design tokens da landing page MedSênior

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: `lib/whatsapp.ts` com testes (TDD)

**Files:**
- Create: `lib/whatsapp.ts`
- Create: `lib/__tests__/whatsapp.test.ts`
- Modify: `tsconfig.json` (adicionar `allowImportingTsExtensions`)
- Modify: `package.json` (script `test`)

**Interfaces:**
- Produces:
  ```ts
  export const WHATSAPP_NUMBER = '5551995567277'
  export type OrigemLead = 'hero' | 'plano' | 'final' | 'header' | 'sticky' | 'elegibilidade' | 'unidade'
  export type LeadParams = { nome?: string; telefone?: string; faixaEtaria?: string; cidade?: string; temPlano?: string; plano?: string; origem: OrigemLead }
  export function onlyDigits(value: string): string
  export function formatPhone(value: string): string      // '51995567277' -> '(51) 99556-7277'
  export function buildWhatsAppMessage(p: LeadParams): string
  export function buildWhatsAppUrl(p: LeadParams): string  // https://wa.me/5551995567277?text=<encoded>
  ```

- [ ] **Step 1: Habilitar import com extensão `.ts` e script de teste**

Em `tsconfig.json`, dentro de `compilerOptions`, adicionar após `"noEmit": true,`:

```json
    "allowImportingTsExtensions": true,
```

Em `package.json`, dentro de `scripts`, adicionar:

```json
    "test": "node --test lib/__tests__/whatsapp.test.ts"
```

- [ ] **Step 2: Escrever os testes (falhando)**

Criar `lib/__tests__/whatsapp.test.ts`:

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  WHATSAPP_NUMBER,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatPhone,
  onlyDigits,
} from '../whatsapp.ts'

test('onlyDigits remove tudo que não é número', () => {
  assert.equal(onlyDigits('(51) 99556-7277'), '51995567277')
})

test('formatPhone formata celular e fixo, ignorando excesso', () => {
  assert.equal(formatPhone('51995567277'), '(51) 99556-7277')
  assert.equal(formatPhone('5132246800'), '(51) 3224-6800')
  assert.equal(formatPhone('519955672779999'), '(51) 99556-7277')
  assert.equal(formatPhone('51'), '(51')
  assert.equal(formatPhone(''), '')
})

test('mensagem inclui só os campos preenchidos e a origem', () => {
  const msg = buildWhatsAppMessage({ nome: 'Maria', telefone: '(51) 99999-0000', origem: 'hero' })
  assert.match(msg, /^\*Cotação MedSênior\*/)
  assert.match(msg, /\*Nome:\* Maria/)
  assert.match(msg, /\*WhatsApp:\* \(51\) 99999-0000/)
  assert.doesNotMatch(msg, /Cidade/)
  assert.doesNotMatch(msg, /Faixa etária/)
  assert.match(msg, /Origem: LP MedSênior\/hero/)
})

test('mensagem ignora campos com espaços em branco', () => {
  const msg = buildWhatsAppMessage({ nome: '   ', cidade: ' Porto Alegre ', origem: 'final' })
  assert.doesNotMatch(msg, /Nome/)
  assert.match(msg, /\*Cidade:\* Porto Alegre/)
})

test('mensagem inclui plano de interesse quando informado', () => {
  const msg = buildWhatsAppMessage({ plano: 'Infinite Adesão – POA', origem: 'plano' })
  assert.match(msg, /\*Plano de interesse:\* Infinite Adesão – POA/)
})

test('url usa o número correto e codifica acentos e asteriscos', () => {
  const url = buildWhatsAppUrl({ nome: 'João', origem: 'header' })
  assert.ok(url.startsWith(`https://wa.me/${WHATSAPP_NUMBER}?text=`))
  assert.equal(WHATSAPP_NUMBER, '5551995567277')
  const text = decodeURIComponent(url.split('?text=')[1])
  assert.match(text, /\*Nome:\* João/)
  assert.doesNotMatch(url, /[*\n]/)
})
```

- [ ] **Step 3: Rodar os testes para confirmar que falham**

Run: `npm test`
Expected: falha com `Cannot find module '.../lib/whatsapp.ts'`.

Se o Node reclamar de sintaxe TypeScript, rode `node --experimental-strip-types --test lib/__tests__/whatsapp.test.ts` e ajuste o script `test` para incluir a flag.

- [ ] **Step 4: Implementar `lib/whatsapp.ts`**

```ts
// Montagem do link de WhatsApp da landing page MedSênior.
// Módulo sem dependências e sem sintaxe TS não-apagável: roda direto no Node (`npm test`).

export const WHATSAPP_NUMBER = '5551995567277'

export type OrigemLead =
  | 'hero'
  | 'plano'
  | 'final'
  | 'header'
  | 'sticky'
  | 'elegibilidade'
  | 'unidade'

export type LeadParams = {
  nome?: string
  telefone?: string
  faixaEtaria?: string
  cidade?: string
  temPlano?: string
  plano?: string
  origem: OrigemLead
}

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

// Formata progressivamente enquanto o usuário digita: (51) 99556-7277 ou (51) 3224-6800
export function formatPhone(value: string): string {
  const d = onlyDigits(value).slice(0, 11)
  if (d.length === 0) return ''
  if (d.length <= 2) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function clean(value?: string): string {
  return (value ?? '').trim()
}

export function buildWhatsAppMessage(p: LeadParams): string {
  const linhas: string[] = ['*Cotação MedSênior*', 'Olá! Quero uma cotação do plano MedSênior.']

  const campos: Array<[string, string | undefined]> = [
    ['Nome', p.nome],
    ['WhatsApp', p.telefone],
    ['Faixa etária', p.faixaEtaria],
    ['Cidade', p.cidade],
    ['Já tem plano', p.temPlano],
    ['Plano de interesse', p.plano],
  ]

  for (const [rotulo, valor] of campos) {
    const v = clean(valor)
    if (v) linhas.push(`*${rotulo}:* ${v}`)
  }

  linhas.push(`_Origem: LP MedSênior/${p.origem}_`)
  return linhas.join('\n')
}

export function buildWhatsAppUrl(p: LeadParams): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(p))}`
}
```

- [ ] **Step 5: Rodar os testes para confirmar que passam**

Run: `npm test`
Expected: `# pass 6`, `# fail 0`.

- [ ] **Step 6: Confirmar que o `next build` aceita o tsconfig**

Run: `npm run build`
Expected: sucesso (o arquivo de teste é type-checked mas não faz parte do bundle).

- [ ] **Step 7: Commit**

```bash
git add lib/whatsapp.ts lib/__tests__/whatsapp.test.ts tsconfig.json package.json && git commit -m "Adiciona construtor de link WhatsApp da LP MedSênior com testes

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: `lib/medsenior.ts` — conteúdo estruturado

**Files:**
- Create: `lib/medsenior.ts`

**Interfaces:**
- Consumes: `WHATSAPP_NUMBER` de `lib/whatsapp.ts`.
- Produces (todos `export const`, todos com `as const` onde faz sentido): `CONTATO`, `OPERADORA`, `NUMEROS`, `DIFERENCIAIS`, `PLANOS`, `FAIXAS_ETARIAS`, `ELEGIBILIDADE`, `PASSOS`, `CARENCIAS`, `AREA_COMERCIALIZACAO`, `FAQ`, `RAZOES_EXCELLENT`, `TEXTO_RESPONSABILIDADE()`, e o tipo `Plano`.

- [ ] **Step 1: Criar `lib/medsenior.ts`**

```ts
// Conteúdo editável da landing page MedSênior.
// Fontes: public2/29.07.26 Tabela medsênior Porto Alegre(atual).pdf e
//         public2/apresentacao-institucional-medsenior-2026 (2.pdf
// Regra da operadora: NUNCA incluir valores em R$ aqui.

import { WHATSAPP_NUMBER } from './whatsapp'

export const CONTATO = {
  whatsapp: WHATSAPP_NUMBER,
  whatsappFormatado: '(51) 99556-7277',
  email: 'atendimento@excellentsaude.com.br',
  endereco: 'Av. Praia de Belas, 1212 – Sala 424 – Menino Deus – Porto Alegre/RS – CEP 90110-000',
  susep: '202083498',
  instagram: 'https://www.instagram.com/excellentsaude/',
  site: 'https://excellentsaude.com.br',
  // Preencher quando o comercial informar. Enquanto vazio, o rodapé usa o registro SUSEP.
  razaoSocial: '',
  cnpj: '',
} as const

// Texto obrigatório exigido pela MedSênior no rodapé de sites de corretores.
export function TEXTO_RESPONSABILIDADE(): string {
  const identificacao =
    CONTATO.razaoSocial && CONTATO.cnpj
      ? `${CONTATO.razaoSocial} — CNPJ ${CONTATO.cnpj}`
      : `Excellent Saúde — Registro SUSEP ${CONTATO.susep}`
  return `O conteúdo deste site é de responsabilidade da ${identificacao} e não possui vínculo com a operadora de saúde.`
}

export const OPERADORA = {
  nome: 'MedSênior',
  ans: '33.561-4',
  redeUrl: 'https://medsenior.com.br/lp/',
  fundacao: 2010,
} as const

export const NUMEROS = [
  { valor: '2010', rotulo: 'Operadora fundada em' },
  { valor: '8', rotulo: 'estados com atendimento' },
  { valor: '45', rotulo: 'unidades próprias' },
  { valor: '+150', rotulo: 'hospitais na rede credenciada*' },
  { valor: '260 mil', rotulo: 'beneficiários' },
  { valor: '5x', rotulo: 'eleito o melhor plano de saúde**' },
] as const

export const NOTAS_NUMEROS = [
  '*Credenciados ao plano Black 5 – ANS 502.795/25-1.',
  '**200 Maiores e Melhores Empresas do ES – IEL.',
] as const

export const DIFERENCIAIS = [
  {
    icone: 'leaf',
    titulo: 'Programa Bem Envelhecer',
    texto: 'Medicina preventiva com acompanhamento integral e personalizado da sua saúde, desde o primeiro dia de plano.',
  },
  {
    icone: 'monitor',
    titulo: 'Central de Inteligência e Monitoramento',
    texto: 'Um enfermeiro gestor do cuidado acompanha seu caso e direciona você para a especialidade certa. Atendimento de segunda a sexta, das 8h às 20h.',
  },
  {
    icone: 'video',
    titulo: 'Pronto Atendimento Virtual 24h',
    texto: 'Teleconsulta por vídeo com triagem de enfermagem e médico que emite receitas e pedidos de exame. Todos os dias, sem sair de casa.',
  },
  {
    icone: 'users',
    titulo: 'Oficinas de Saúde',
    texto: 'Arte Terapia, Educa a Dor, Cabeça Boa, NutriSaber, Tecnologia e Autonomia e Independência, com equipe multidisciplinar.',
  },
  {
    icone: 'building',
    titulo: 'Unidades próprias',
    texto: 'Unidade MedSênior em Porto Alegre e estrutura própria em capitais de 8 estados, com pronto atendimento e especialidades.',
  },
  {
    icone: 'gift',
    titulo: 'Clube de Vantagens',
    texto: 'Descontos e benefícios exclusivos para beneficiários, como mais um cuidado do seu plano de saúde.',
  },
] as const

export type Plano = {
  id: string
  nome: string
  registroAns: string
  acomodacao: 'Enfermaria' | 'Apartamento'
  abrangencia: string
  abrangenciaDetalhe: string
  segmentacao: string
  coparticipacao: boolean
  destaque?: string
  descricao: string
  beneficios: string[]
}

export const PLANOS: Plano[] = [
  {
    id: 'adesao-enfermaria-poa',
    nome: 'MedSênior Adesão Enfermaria – POA',
    registroAns: '504.124/25-4',
    acomodacao: 'Enfermaria',
    abrangencia: 'Municipal',
    abrangenciaDetalhe: 'Porto Alegre',
    segmentacao: 'Ambulatorial + Hospitalar (sem obstetrícia)',
    coparticipacao: false,
    descricao: 'O caminho mais acessível para entrar na MedSênior com toda a estrutura de cuidado da operadora.',
    beneficios: [
      'Acomodação em enfermaria',
      'Consultas, exames e internações',
      'Unidade própria em Porto Alegre',
      'Programa Bem Envelhecer incluso',
    ],
  },
  {
    id: 'adesao-apartamento-poa',
    nome: 'MedSênior Adesão Apartamento – POA',
    registroAns: '504.123/25-6',
    acomodacao: 'Apartamento',
    abrangencia: 'Municipal',
    abrangenciaDetalhe: 'Porto Alegre',
    segmentacao: 'Ambulatorial + Hospitalar (sem obstetrícia)',
    coparticipacao: false,
    destaque: 'Mais escolhido',
    descricao: 'Privacidade e conforto em internações, com o mesmo cuidado integral da MedSênior em Porto Alegre.',
    beneficios: [
      'Acomodação em apartamento',
      'Consultas, exames e internações',
      'Unidade própria em Porto Alegre',
      'Programa Bem Envelhecer incluso',
    ],
  },
  {
    id: 'black-adesao-5-poa',
    nome: 'Black Adesão 5 – POA',
    registroAns: '504.127/25-9',
    acomodacao: 'Apartamento',
    abrangencia: 'Grupo de municípios',
    abrangenciaDetalhe: 'Capitais e regiões de RS, SP, RJ, MG, ES, PR, DF e PE',
    segmentacao: 'Ambulatorial + Hospitalar (sem obstetrícia)',
    coparticipacao: false,
    descricao: 'Para quem viaja ou tem família em outros estados: rede ampliada com hospitais de referência em 8 estados.',
    beneficios: [
      'Acomodação em apartamento',
      'Rede ampliada em 8 estados',
      'Hospitais de referência credenciados',
      'Procedimentos de alta complexidade',
    ],
  },
  {
    id: 'infinite-adesao-poa',
    nome: 'Infinite Adesão – POA',
    registroAns: '504.222/25-4',
    acomodacao: 'Apartamento',
    abrangencia: 'Grupo de municípios',
    abrangenciaDetalhe: 'Capitais e regiões de RS, SP, RJ, MG, ES, PR, DF e PE',
    segmentacao: 'Ambulatorial + Hospitalar (sem obstetrícia)',
    coparticipacao: false,
    destaque: 'Mais completo',
    descricao: 'O plano mais completo da MedSênior: rede premium, máximo conforto e atendimento altamente personalizado.',
    beneficios: [
      'Acomodação em apartamento',
      'Rede hospitalar premium em 8 estados',
      'Atendimento altamente personalizado',
      'Máximo conforto e exclusividade',
    ],
  },
]

export const FAIXAS_ETARIAS = ['44 a 48 anos', '49 a 53 anos', '54 a 58 anos', '59 anos ou mais'] as const

export const ELEGIBILIDADE = {
  assena: {
    sigla: 'ASSENA',
    titulo: 'Servidores públicos',
    subtitulo: 'Estaduais e federais',
    documentos: ['Holerite atualizado', 'Nomeação de cargo público', 'Ficha associativa'],
    observacao: 'Taxa associativa simbólica.',
  },
  arpl: {
    sigla: 'ARPL',
    titulo: 'Profissionais liberais com diploma',
    subtitulo: 'Associação Representativa de Profissionais Liberais',
    documentos: ['Diploma', 'Ficha associativa', 'Carteira do conselho profissional'],
    profissoes: [
      'Administrador', 'Advogado', 'Agrônomo', 'Analista de Sistemas', 'Arquiteto', 'Assistente Social',
      'Atuário', 'Bacharel em Ciência da Computação', 'Bacharel em Comércio Exterior',
      'Bacharel em Comunicação Social', 'Bacharel em Gastronomia', 'Bacharel em Gestão Financeira',
      'Bacharel em Hotelaria', 'Bacharel em Recursos Humanos', 'Biólogo', 'Biomédico', 'Contabilista',
      'Corretor de Imóveis', 'Corretor de Seguros', 'Dentista', 'Designer (Gráfico, Moda e Interiores)',
      'Despachante', 'Economista', 'Educador Físico', 'Enfermeiro', 'Engenheiro', 'Farmacêutico',
      'Físico', 'Fisioterapeuta', 'Fonoaudiólogo', 'Jornalista', 'Marqueteiro', 'Matemático', 'Médico',
      'Nutricionista', 'Pedagogo', 'Professor', 'Psicólogo', 'Publicitário',
      'Tecnólogo da Informação', 'Veterinário',
    ],
  },
  dependentes: [
    'Cônjuge ou companheiro(a)',
    'Pai e mãe',
    'Padrasto e madrasta',
    'Sogro e sogra',
    'Avô e avó',
    'Bisavô e bisavó',
    'Tio e tia',
  ],
  documentosTitular: [
    'Documento de elegibilidade (funcional ou da entidade de classe)',
    'RG e CPF',
    'Comprovante de residência (água, luz ou telefone)',
    'Cartão SUS',
    'Selfie segurando o documento de identificação',
  ],
} as const

export const PASSOS = [
  {
    titulo: 'Fale com um consultor',
    texto: 'Chame no WhatsApp. Em poucos minutos você recebe a cotação por faixa etária e tira todas as dúvidas, sem compromisso.',
  },
  {
    titulo: 'Envie os documentos',
    texto: 'RG, CPF, comprovante de residência, cartão SUS, selfie com documento e comprovante de elegibilidade. A entrevista médica da MedSênior é feita online.',
  },
  {
    titulo: 'Escolha a vigência e use',
    texto: 'Vigências nos dias 1, 5, 10 ou 15. Depois é só receber a carteirinha e começar a cuidar da saúde.',
  },
] as const

export const CARENCIAS = [
  { procedimento: 'Urgência, emergência e acidente pessoal', semPlano: '24 horas', comPlano: '24 horas' },
  { procedimento: 'Consultas médicas', semPlano: '30 dias', comPlano: '24 horas' },
  { procedimento: 'Exames simples (raio-x, laboratório, eletrocardiograma)', semPlano: '30 dias', comPlano: '24 horas' },
  { procedimento: 'Exames e procedimentos complexos I', semPlano: '90 dias', comPlano: '24 horas' },
  { procedimento: 'Exames e procedimentos complexos II', semPlano: '120 dias', comPlano: '24 horas' },
  { procedimento: 'Exames especiais (ressonância, tomografia, quimioterapia)', semPlano: '180 dias', comPlano: '24 horas' },
  { procedimento: 'Fisioterapia', semPlano: '180 dias', comPlano: '24 horas' },
  { procedimento: 'Alta complexidade', semPlano: '180 dias', comPlano: '24 horas' },
  { procedimento: 'Saúde mental ambulatorial', semPlano: '180 dias', comPlano: '24 horas' },
  { procedimento: 'Internações clínicas, cirúrgicas e UTI', semPlano: '180 dias', comPlano: '24 horas' },
  { procedimento: 'Internações psiquiátricas', semPlano: '180 dias', comPlano: '24 horas' },
  { procedimento: 'Doenças ou lesões preexistentes (CPT)', semPlano: '24 meses', comPlano: '24 meses' },
] as const

export const NOTA_CARENCIAS =
  'Redução de carência para quem tem no mínimo 6 meses em plano anterior de qualquer operadora com registro ativo na ANS (exceto planos exclusivamente ambulatoriais). Documentação: cópia da carteirinha com data de início e comprovante das 3 últimas mensalidades pagas ou carta de permanência. Entrevista médica obrigatória para todos os beneficiários. Prevalecem as condições do contrato de adesão.'

export const AREA_COMERCIALIZACAO = {
  municipal: {
    planos: 'Adesão Enfermaria e Adesão Apartamento',
    area: 'Porto Alegre – RS',
  },
  nacional: {
    planos: 'Black Adesão 5 e Infinite Adesão',
    area: [
      'RS: Porto Alegre',
      'SP: São Paulo, Campinas, Guarulhos, Osasco, Santo André, São Bernardo do Campo, São Caetano do Sul, Indaiatuba',
      'RJ: Rio de Janeiro, Niterói, Duque de Caxias',
      'MG: Belo Horizonte, Betim, Contagem',
      'ES: Vitória, Vila Velha, Serra, Cariacica',
      'PR: Curitiba, São José dos Pinhais, Campo Largo',
      'DF: Brasília',
      'PE: Recife',
    ],
  },
} as const

export const FAQ = [
  {
    pergunta: 'A partir de qual idade posso contratar?',
    resposta: 'Os planos MedSênior por adesão em Porto Alegre são para pessoas a partir de 44 anos. Não há idade máxima para entrar.',
  },
  {
    pergunta: 'Os planos têm coparticipação?',
    resposta: 'Não. Todos os quatro planos apresentados nesta página são sem coparticipação: você não paga por consulta ou exame realizado.',
  },
  {
    pergunta: 'Quanto custa o plano?',
    resposta: 'O valor depende do plano e da faixa etária (44 a 48, 49 a 53, 54 a 58 e 59 anos ou mais). Chame no WhatsApp e receba a cotação atualizada em minutos, sem compromisso.',
  },
  {
    pergunta: 'Como funciona a carência?',
    resposta: 'Urgência e emergência em 24 horas; consultas e exames simples em 30 dias; internações em 180 dias. Quem já tem plano há pelo menos 6 meses pode reduzir quase todas as carências para 24 horas.',
  },
  {
    pergunta: 'Quando acontece o reajuste?',
    resposta: 'O reajuste anual dos planos por adesão acontece em janeiro, além da mudança de faixa etária prevista em contrato.',
  },
  {
    pergunta: 'Quais documentos preciso enviar?',
    resposta: 'RG, CPF, comprovante de residência, cartão SUS, selfie segurando o documento e o comprovante de elegibilidade (holerite e nomeação para servidores; diploma e carteira do conselho para profissionais liberais).',
  },
  {
    pergunta: 'Posso incluir dependentes?',
    resposta: 'Sim: cônjuge ou companheiro(a), pais, padrasto e madrasta, sogros, avós, bisavós e tios, todos com a partir de 44 anos e com entrevista médica.',
  },
  {
    pergunta: 'Onde posso usar o plano?',
    resposta: 'Os planos Adesão Enfermaria e Apartamento atendem em Porto Alegre. Black Adesão 5 e Infinite Adesão têm rede em capitais e regiões de RS, SP, RJ, MG, ES, PR, DF e PE. Urgência e emergência são cobertas conforme a regulamentação da ANS.',
  },
] as const

export const RAZOES_EXCELLENT = [
  {
    titulo: 'Sem custo adicional',
    texto: 'A consultoria da Excellent não muda o valor do plano. Você paga o mesmo que pagaria direto na operadora, com um especialista ao seu lado.',
  },
  {
    titulo: 'Consultor local, em Porto Alegre',
    texto: 'Atendimento humano, por WhatsApp ou presencial, com quem conhece a rede e as regras da MedSênior no RS.',
  },
  {
    titulo: 'Corretora registrada na SUSEP',
    texto: `Registro SUSEP ${CONTATO.susep}. Atuamos com ética, transparência e foco no bem-estar dos nossos clientes.`,
  },
  {
    titulo: 'Acompanhamento depois da adesão',
    texto: 'Carteirinha, reajustes, inclusão de dependentes, dúvidas sobre rede: seguimos com você durante toda a vigência.',
  },
] as const
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: sem erros. (Se acusar `WHATSAPP_NUMBER` não encontrado, a Task 3 não foi concluída.)

- [ ] **Step 3: Commit**

```bash
git add lib/medsenior.ts && git commit -m "Adiciona conteúdo estruturado da LP MedSênior

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5: Layout da LP, página esqueleto, header, rodapé, barra fixa e cookies

**Files:**
- Create: `app/(landing)/layout.tsx`
- Create: `app/(landing)/medsenior/page.tsx`
- Create: `components/medsenior/LpHeader.tsx`
- Create: `components/medsenior/LpFooter.tsx`
- Create: `components/medsenior/StickyWhatsApp.tsx`
- Create: `components/medsenior/CookieBanner.tsx`
- Create: `components/medsenior/SectionHeading.tsx`
- Create: `components/medsenior/Reveal.tsx`

**Interfaces:**
- Consumes: `CONTATO`, `OPERADORA`, `TEXTO_RESPONSABILIDADE` (`lib/medsenior.ts`); `buildWhatsAppUrl` (`lib/whatsapp.ts`).
- Produces:
  - `SectionHeading({ eyebrow, title, lead?, align?: 'left'|'center', dark?: boolean })`
  - `Reveal({ children, className?, delay?: number })` — envolve blocos com animação de entrada.
  - `LpHeader()`, `LpFooter()`, `StickyWhatsApp()`, `CookieBanner()` sem props.
  - A página `/medsenior` renderiza header + `<main id="topo">` + rodapé. As seções seguintes são inseridas em `page.tsx` na ordem do spec.

- [ ] **Step 1: Criar `components/medsenior/SectionHeading.tsx`**

```tsx
type Props = {
  eyebrow: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export default function SectionHeading({ eyebrow, title, lead, align = 'left', dark = false }: Props) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : ''
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      <span className={`ms-eyebrow ${dark ? 'text-ms-lime' : ''}`}>
        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dark ? 'bg-ms-lime' : 'bg-ms-green-500'}`} />
        {eyebrow}
      </span>
      <h2 className={`ms-h2 mt-3 ${dark ? 'text-white' : ''}`}>{title}</h2>
      {lead && <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-ms-green-100' : 'text-gray-600'}`}>{lead}</p>}
    </div>
  )
}
```

- [ ] **Step 2: Criar `components/medsenior/Reveal.tsx`**

```tsx
'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type Props = { children: ReactNode; className?: string; delay?: number }

export default function Reveal({ children, className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`ms-reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Criar `components/medsenior/LpHeader.tsx`**

O selo só é exibido se o arquivo `public/medsenior/selo-autorizada.png` existir (o comercial recebe do Gestor MedSênior e coloca lá). Sem o arquivo, exibe um badge textual.

```tsx
import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { FiCheckCircle } from 'react-icons/fi'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const SELO_PATH = path.join(process.cwd(), 'public', 'medsenior', 'selo-autorizada.png')

export default function LpHeader() {
  const temSelo = fs.existsSync(SELO_PATH)
  const href = buildWhatsAppUrl({ origem: 'header' })

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-ms-green-100">
      <div className="ms-container flex items-center justify-between gap-4 h-20">
        <a href="#topo" className="flex items-center shrink-0" aria-label="Excellent Saúde – início da página">
          <Image src="/logoexcellent.png.bv.webp" alt="Excellent Saúde" width={180} height={60} className="h-11 w-auto" priority />
        </a>

        {temSelo ? (
          <Image src="/medsenior/selo-autorizada.png" alt="Corretora autorizada MedSênior" width={200} height={64} className="hidden sm:block h-12 w-auto" />
        ) : (
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-ms-green-100 bg-ms-green-50 px-4 py-2 text-sm font-semibold text-ms-green-700">
            <FiCheckCircle aria-hidden="true" />
            Corretora autorizada MedSênior
          </span>
        )}

        <a href={href} target="_blank" rel="noopener noreferrer" className="ms-btn ms-btn-wa px-5">
          <FaWhatsapp size={22} aria-hidden="true" />
          <span className="hidden md:inline">Falar com consultor</span>
          <span className="md:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Criar `components/medsenior/LpFooter.tsx`**

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { FiInstagram, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { CONTATO, OPERADORA, TEXTO_RESPONSABILIDADE } from '@/lib/medsenior'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export default function LpFooter() {
  return (
    <footer className="bg-ms-green-900 text-ms-green-100" aria-label="Rodapé">
      <div className="ms-container py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image src="/logoexcellent.png.bv.webp" alt="Excellent Saúde" width={180} height={60} className="h-11 w-auto brightness-0 invert" />
            <p className="mt-4 text-sm leading-relaxed">
              Corretora de planos e seguros de saúde em Porto Alegre. Atuamos com ética, empatia e foco no bem-estar dos nossos clientes.
            </p>
            <p className="mt-3 text-xs text-ms-green-100/70">Registro SUSEP {CONTATO.susep}</p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><FiMapPin className="mt-1 shrink-0 text-ms-lime" aria-hidden="true" /><span>{CONTATO.endereco}</span></li>
              <li className="flex gap-2"><FiPhone className="mt-1 shrink-0 text-ms-lime" aria-hidden="true" /><a className="hover:text-white" href={buildWhatsAppUrl({ origem: 'header' })} target="_blank" rel="noopener noreferrer">WhatsApp {CONTATO.whatsappFormatado}</a></li>
              <li className="flex gap-2"><FiMail className="mt-1 shrink-0 text-ms-lime" aria-hidden="true" /><a className="hover:text-white" href={`mailto:${CONTATO.email}`}>{CONTATO.email}</a></li>
              <li className="flex gap-2"><FiInstagram className="mt-1 shrink-0 text-ms-lime" aria-hidden="true" /><a className="hover:text-white" href={CONTATO.instagram} target="_blank" rel="noopener noreferrer">@excellentsaude</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Informações legais</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-white underline-offset-4 hover:underline" href="/politica-privacidade">Política de Privacidade</Link></li>
              <li><Link className="hover:text-white underline-offset-4 hover:underline" href="/lgpd">LGPD e cookies</Link></li>
              <li><Link className="hover:text-white underline-offset-4 hover:underline" href="/termos-uso">Termos de Uso</Link></li>
              <li><a className="hover:text-white underline-offset-4 hover:underline" href={OPERADORA.redeUrl} target="_blank" rel="noopener noreferrer">Rede credenciada {OPERADORA.nome}</a></li>
            </ul>
            <p className="mt-4 text-xs text-ms-green-100/70">{OPERADORA.nome} — ANS nº {OPERADORA.ans}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 space-y-3 text-xs text-ms-green-100/80">
          <p className="font-semibold text-ms-green-100">{TEXTO_RESPONSABILIDADE()}</p>
          <p>Plano de saúde coletivo por adesão, conforme Resoluções Normativas da ANS. Valores informados pelo consultor conforme faixa etária. Rede credenciada sujeita a alterações pela operadora.</p>
          <p>© {new Date().getFullYear()} Excellent Saúde. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Criar `components/medsenior/StickyWhatsApp.tsx`**

```tsx
import { FaWhatsapp } from 'react-icons/fa'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export default function StickyWhatsApp() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 md:hidden bg-white/90 backdrop-blur border-t border-ms-green-100">
      <a href={buildWhatsAppUrl({ origem: 'sticky' })} target="_blank" rel="noopener noreferrer" className="ms-btn ms-btn-wa w-full">
        <FaWhatsapp size={22} aria-hidden="true" />
        Receber cotação no WhatsApp
      </a>
    </div>
  )
}
```

- [ ] **Step 6: Criar `components/medsenior/CookieBanner.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const KEY = 'ms-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  function aceitar() {
    try {
      localStorage.setItem(KEY, new Date().toISOString())
    } catch {
      // armazenamento indisponível: apenas fecha o banner nesta visita
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div role="region" aria-label="Aviso de cookies" className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:max-w-md z-50 ms-card p-5 shadow-2xl">
      <p className="text-sm text-gray-700">
        Usamos cookies para melhorar sua experiência e medir o desempenho desta página. Saiba mais na nossa{' '}
        <Link href="/politica-privacidade" className="font-semibold text-ms-green-700 underline underline-offset-2">Política de Privacidade</Link>{' '}
        e em <Link href="/lgpd" className="font-semibold text-ms-green-700 underline underline-offset-2">LGPD</Link>.
      </p>
      <button type="button" onClick={aceitar} className="ms-btn ms-btn-primary mt-4 w-full min-h-[44px]">
        Entendi e aceito
      </button>
    </div>
  )
}
```

- [ ] **Step 7: Criar `app/(landing)/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import '../globals.css'
import CookieBanner from '@/components/medsenior/CookieBanner'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://excellentsaude.com.br'),
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className="font-montserrat bg-white text-ms-ink antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
```

- [ ] **Step 8: Criar `app/(landing)/medsenior/page.tsx` (esqueleto)**

```tsx
import LpHeader from '@/components/medsenior/LpHeader'
import LpFooter from '@/components/medsenior/LpFooter'
import StickyWhatsApp from '@/components/medsenior/StickyWhatsApp'

export default function MedSeniorPage() {
  return (
    <>
      <LpHeader />
      <main id="topo" className="pb-24 md:pb-0">
        <section className="ms-section">
          <div className="ms-container">
            <h1 className="ms-h2">Plano de saúde feito para quem tem a partir de 44 anos</h1>
          </div>
        </section>
      </main>
      <LpFooter />
      <StickyWhatsApp />
    </>
  )
}
```

- [ ] **Step 9: Build e verificação no browser**

Run: `npm run build`
Expected: rota `/medsenior` na tabela, sem erros. Se aparecer "Module not found: node:fs", confirme que `LpHeader.tsx` NÃO tem `'use client'`.

Depois, abrir o preview do dev server (`.claude/launch.json` com `{"name":"dev","runtimeExecutable":"npm","runtimeArgs":["run","dev"],"port":3000}`) e verificar:
- `http://localhost:3000/medsenior`: header com logo + badge "Corretora autorizada MedSênior" + botão WhatsApp; H1; rodapé com o texto obrigatório contendo "Registro SUSEP 202083498"; banner de cookies aparece e some ao clicar.
- `http://localhost:3000/`: site institucional inalterado (Header navy, Footer, ChatWidget).
- Em 400px de largura: barra fixa "Receber cotação no WhatsApp" no rodapé da tela.

- [ ] **Step 10: Commit**

```bash
git add "app/(landing)" components/medsenior .claude/launch.json && git commit -m "Adiciona layout, header, rodapé e esqueleto da LP MedSênior

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 6: Fotos geradas por IA

**Files:**
- Create: `public/medsenior/hero.jpg`, `public/medsenior/bem-envelhecer.jpg`, `public/medsenior/excellent.jpg`, `public/medsenior/og.jpg`

**Interfaces:**
- Produces: quatro JPGs referenciados por caminho absoluto (`/medsenior/hero.jpg` etc.) nas Tasks 7, 8, 11 e 12. Dimensões alvo: hero 1600×1000 (paisagem), bem-envelhecer 1200×900, excellent 1200×900, og 1200×630.

- [ ] **Step 1: Gerar as imagens**

Usar a ferramenta MCP de geração de imagem disponível na sessão (`generate_image` do servidor Higgsfield; alternativa: `openart_generate_image`). Carregar o schema via `ToolSearch` antes de chamar. Prompts (um por imagem, estilo fotográfico, sem texto na imagem, sem logos):

1. **hero.jpg** — `Editorial lifestyle photo, Brazilian couple in their early 60s laughing together outdoors in soft golden hour light, green foliage bokeh background, casual smart clothing, warm and healthy, shot on 85mm, shallow depth of field, natural skin, no text, no logos, landscape 16:10`
2. **bem-envelhecer.jpg** — `Documentary style photo, Brazilian woman around 55 years old at home smiling during a video call on a tablet with a nurse, bright living room, plants, natural window light, warm tones, no text, no logos, 4:3`
3. **excellent.jpg** — `Candid photo, friendly Brazilian insurance consultant in her 30s explaining a document to a smiling man around 60 at a bright modern office desk in Porto Alegre, green accents in the decor, natural light, no text, no logos, 4:3`
4. **og.jpg** — reutilizar a imagem 1 recortada para 1200×630 (ver Step 2).

- [ ] **Step 2: Baixar para `public/medsenior/` e gerar o OG**

```bash
mkdir -p public/medsenior
curl -L "<URL_HERO>" -o public/medsenior/hero.jpg
curl -L "<URL_BEM_ENVELHECER>" -o public/medsenior/bem-envelhecer.jpg
curl -L "<URL_EXCELLENT>" -o public/medsenior/excellent.jpg
python -c "from PIL import Image; im=Image.open('public/medsenior/hero.jpg'); w,h=im.size; t=w/1200*630; top=int((h-t)/2); im.crop((0,top,w,int(top+t))).resize((1200,630)).save('public/medsenior/og.jpg', quality=85)"
```

Se o Pillow não estiver instalado (`pip install pillow`), copiar `hero.jpg` como `og.jpg` — o `next/image` não é usado para OG, então a proporção só afeta o preview em redes sociais.

- [ ] **Step 3: Verificar tamanho dos arquivos**

Run: `ls -la public/medsenior`
Expected: cada JPG entre 100 KB e 1,5 MB. Se maior que 2 MB, reduzir com `python -c "from PIL import Image; im=Image.open('public/medsenior/hero.jpg'); im.thumbnail((1600,1600)); im.save('public/medsenior/hero.jpg', quality=82)"` (repetir para os demais).

- [ ] **Step 4: Commit**

```bash
git add public/medsenior && git commit -m "Adiciona fotos da LP MedSênior

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 7: Hero + LeadForm

**Files:**
- Create: `components/medsenior/LeadForm.tsx`
- Create: `components/medsenior/Hero.tsx`
- Modify: `app/(landing)/medsenior/page.tsx` (substituir a `<section>` placeholder por `<Hero />`)

**Interfaces:**
- Consumes: `FAIXAS_ETARIAS`, `OPERADORA` (`lib/medsenior.ts`); `buildWhatsAppUrl`, `formatPhone`, `onlyDigits`, `OrigemLead` (`lib/whatsapp.ts`).
- Produces: `LeadForm({ origem: OrigemLead; compact?: boolean; plano?: string })` — client component; `Hero()`.

- [ ] **Step 1: Criar `components/medsenior/LeadForm.tsx`**

```tsx
'use client'

import { useState, type FormEvent } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiLock } from 'react-icons/fi'
import { FAIXAS_ETARIAS } from '@/lib/medsenior'
import { buildWhatsAppUrl, formatPhone, onlyDigits, type OrigemLead } from '@/lib/whatsapp'

type Props = { origem: OrigemLead; compact?: boolean; plano?: string }

type Errors = Partial<Record<'nome' | 'telefone' | 'faixaEtaria', string>>

export default function LeadForm({ origem, compact = false, plano }: Props) {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [faixaEtaria, setFaixaEtaria] = useState('')
  const [cidade, setCidade] = useState('')
  const [temPlano, setTemPlano] = useState('')
  const [errors, setErrors] = useState<Errors>({})

  const idPrefix = `lead-${origem}`

  function validate(): Errors {
    const e: Errors = {}
    if (nome.trim().length < 2) e.nome = 'Informe seu nome.'
    const digits = onlyDigits(telefone)
    if (digits.length < 10 || digits.length > 11) e.telefone = 'Informe um WhatsApp com DDD.'
    if (!faixaEtaria) e.faixaEtaria = 'Selecione sua faixa etária.'
    return e
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return

    const url = buildWhatsAppUrl({ nome, telefone, faixaEtaria, cidade, temPlano, plano, origem })
    const win = window.open(url, '_blank', 'noopener,noreferrer')
    if (!win) window.location.href = url
  }

  const inputCls =
    'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-ms-ink placeholder:text-gray-400 focus:border-ms-green-500 focus:outline-none focus:ring-4 focus:ring-ms-green-500/20'
  const labelCls = 'block text-sm font-semibold text-ms-green-900 mb-1.5'
  const errCls = 'mt-1 text-sm text-red-600'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label="Solicitar cotação MedSênior">
      <div>
        <label htmlFor={`${idPrefix}-nome`} className={labelCls}>Nome *</label>
        <input
          id={`${idPrefix}-nome`}
          name="nome"
          type="text"
          autoComplete="name"
          value={nome}
          onChange={(ev) => setNome(ev.target.value)}
          aria-invalid={Boolean(errors.nome)}
          aria-describedby={errors.nome ? `${idPrefix}-nome-err` : undefined}
          className={inputCls}
          placeholder="Como podemos te chamar?"
        />
        {errors.nome && <p id={`${idPrefix}-nome-err`} className={errCls}>{errors.nome}</p>}
      </div>

      <div className={compact ? '' : 'grid gap-4 sm:grid-cols-2'}>
        <div>
          <label htmlFor={`${idPrefix}-telefone`} className={labelCls}>WhatsApp *</label>
          <input
            id={`${idPrefix}-telefone`}
            name="telefone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={telefone}
            onChange={(ev) => setTelefone(formatPhone(ev.target.value))}
            aria-invalid={Boolean(errors.telefone)}
            aria-describedby={errors.telefone ? `${idPrefix}-telefone-err` : undefined}
            className={inputCls}
            placeholder="(51) 99999-9999"
          />
          {errors.telefone && <p id={`${idPrefix}-telefone-err`} className={errCls}>{errors.telefone}</p>}
        </div>

        <div>
          <label htmlFor={`${idPrefix}-faixa`} className={labelCls}>Faixa etária *</label>
          <select
            id={`${idPrefix}-faixa`}
            name="faixaEtaria"
            value={faixaEtaria}
            onChange={(ev) => setFaixaEtaria(ev.target.value)}
            aria-invalid={Boolean(errors.faixaEtaria)}
            aria-describedby={errors.faixaEtaria ? `${idPrefix}-faixa-err` : undefined}
            className={inputCls}
          >
            <option value="">Selecione</option>
            {FAIXAS_ETARIAS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          {errors.faixaEtaria && <p id={`${idPrefix}-faixa-err`} className={errCls}>{errors.faixaEtaria}</p>}
        </div>
      </div>

      {!compact && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${idPrefix}-cidade`} className={labelCls}>Cidade</label>
            <input
              id={`${idPrefix}-cidade`}
              name="cidade"
              type="text"
              autoComplete="address-level2"
              value={cidade}
              onChange={(ev) => setCidade(ev.target.value)}
              className={inputCls}
              placeholder="Porto Alegre"
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-plano`} className={labelCls}>Já tem plano hoje?</label>
            <select id={`${idPrefix}-plano`} name="temPlano" value={temPlano} onChange={(ev) => setTemPlano(ev.target.value)} className={inputCls}>
              <option value="">Selecione</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
        </div>
      )}

      <button type="submit" className="ms-btn ms-btn-wa w-full text-lg">
        <FaWhatsapp size={24} aria-hidden="true" />
        Receber cotação no WhatsApp
      </button>

      <p className="flex items-start gap-2 text-xs text-gray-500">
        <FiLock className="mt-0.5 shrink-0" aria-hidden="true" />
        Sem compromisso. Resposta em horário comercial. Seus dados não são compartilhados com terceiros.
      </p>
    </form>
  )
}
```

- [ ] **Step 2: Criar `components/medsenior/Hero.tsx`**

```tsx
import Image from 'next/image'
import { FiCheck } from 'react-icons/fi'
import { OPERADORA } from '@/lib/medsenior'
import LeadForm from './LeadForm'

const BULLETS = [
  'Unidades próprias MedSênior em Porto Alegre e em 8 estados',
  'Sem coparticipação: consultas e exames sem custo extra',
  'Programa Bem Envelhecer e pronto atendimento virtual 24h',
]

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ms-green-900 text-white" aria-labelledby="hero-title">
      <Image
        src="/medsenior/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-60"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ms-green-900 via-ms-green-900/85 to-ms-green-900/40" />
      <div aria-hidden="true" className="absolute -left-32 -bottom-40 h-[28rem] w-[28rem] rounded-full bg-ms-lime/10 blur-3xl" />

      <div className="ms-container relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-ms-lime ring-1 ring-white/15">
            Plano de saúde coletivo por adesão · Porto Alegre
          </span>
          <h1 id="hero-title" className="mt-6 text-4xl font-extrabold leading-[1.1] md:text-5xl lg:text-[3.5rem]">
            Plano de saúde feito para quem tem <span className="text-ms-lime">a partir de 44 anos</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ms-green-100 md:text-xl">
            {OPERADORA.nome} é a operadora especializada em bem envelhecer, com unidades próprias, pronto atendimento virtual 24h e sem coparticipação. A Excellent Saúde cuida da sua adesão do início ao fim.
          </p>

          <ul className="mt-8 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-base md:text-lg">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ms-lime text-ms-green-900">
                  <FiCheck size={16} strokeWidth={3} aria-hidden="true" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-ms-green-100/80">
            {OPERADORA.nome} — ANS nº {OPERADORA.ans} · Operadora desde {OPERADORA.fundacao}
          </p>
        </div>

        <div className="ms-card p-6 md:p-8 text-ms-ink shadow-2xl">
          <h2 className="text-2xl font-extrabold text-ms-green-900">Receba sua cotação em minutos</h2>
          <p className="mt-2 text-gray-600">Preencha e continue a conversa no WhatsApp com um consultor da Excellent.</p>
          <div className="mt-6">
            <LeadForm origem="hero" />
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Usar o Hero na página**

Em `app/(landing)/medsenior/page.tsx`, adicionar `import Hero from '@/components/medsenior/Hero'` e substituir todo o bloco `<section className="ms-section">...</section>` por `<Hero />`.

- [ ] **Step 4: Verificar no browser**

Com o dev server aberto em `/medsenior`:
- Desktop: foto de fundo com overlay verde, H1 com "a partir de 44 anos" em verde-lima, card do formulário à direita.
- Submeter vazio: três mensagens de erro inline; `aria-invalid="true"` nos campos.
- Preencher "Maria", "51999990000", "49 a 53 anos" e enviar: abre nova aba `https://wa.me/5551995567277?text=...`; decodificar o `text` deve conter `*Nome:* Maria`, `*WhatsApp:* (51) 99999-0000`, `*Faixa etária:* 49 a 53 anos`, `Origem: LP MedSênior/hero`.
- 400px: coluna única, form abaixo do texto, botão ocupa a largura.

- [ ] **Step 5: Commit**

```bash
git add components/medsenior/Hero.tsx components/medsenior/LeadForm.tsx "app/(landing)/medsenior/page.tsx" && git commit -m "Adiciona hero e formulário de lead da LP MedSênior

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 8: TrustBar + WhyMedSenior

**Files:**
- Create: `components/medsenior/TrustBar.tsx`
- Create: `components/medsenior/WhyMedSenior.tsx`
- Modify: `app/(landing)/medsenior/page.tsx`

**Interfaces:**
- Consumes: `NUMEROS`, `NOTAS_NUMEROS`, `DIFERENCIAIS` (`lib/medsenior.ts`); `SectionHeading`, `Reveal`.
- Produces: `TrustBar()`, `WhyMedSenior()`.

- [ ] **Step 1: Criar `components/medsenior/TrustBar.tsx`**

```tsx
import { NOTAS_NUMEROS, NUMEROS } from '@/lib/medsenior'
import Reveal from './Reveal'

export default function TrustBar() {
  return (
    <section className="bg-ms-cream border-y border-ms-green-100" aria-label="Números da MedSênior">
      <div className="ms-container py-10">
        <Reveal>
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {NUMEROS.map((n) => (
              <div key={n.rotulo} className="text-center">
                <dd className="text-3xl font-extrabold text-ms-green-700 md:text-4xl">{n.valor}</dd>
                <dt className="mt-1 text-sm font-medium text-gray-600">{n.rotulo}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
        <p className="mt-6 text-center text-xs text-gray-500">{NOTAS_NUMEROS.join(' ')}</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Criar `components/medsenior/WhyMedSenior.tsx`**

```tsx
import Image from 'next/image'
import type { IconType } from 'react-icons'
import { FiActivity, FiGift, FiHome, FiMonitor, FiUsers, FiVideo } from 'react-icons/fi'
import { DIFERENCIAIS } from '@/lib/medsenior'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const ICONES: Record<string, IconType> = {
  leaf: FiActivity,
  monitor: FiMonitor,
  video: FiVideo,
  users: FiUsers,
  building: FiHome,
  gift: FiGift,
}

export default function WhyMedSenior() {
  return (
    <section id="diferenciais" className="ms-section bg-white" aria-labelledby="why-title">
      <div className="ms-container">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Por que MedSênior"
              title="Uma operadora criada para cuidar de quem já passou dos 44"
              lead="Desde 2010 a MedSênior faz medicina preventiva de verdade: acompanha sua saúde de perto, com equipe própria, para você viver mais e melhor."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl rounded-tl-none">
              <Image src="/medsenior/bem-envelhecer.jpg" alt="Mulher sorrindo durante teleconsulta em casa" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DIFERENCIAIS.map((d, i) => {
            const Icon = ICONES[d.icone] ?? FiActivity
            return (
              <Reveal key={d.titulo} delay={i * 60}>
                <article className="ms-card h-full p-6 transition-shadow hover:shadow-lg">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ms-green-50 text-ms-green-700">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-ms-green-900">{d.titulo}</h3>
                  <p className="mt-2 leading-relaxed text-gray-600">{d.texto}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Inserir na página**

Em `app/(landing)/medsenior/page.tsx`, importar `TrustBar` e `WhyMedSenior` e renderizar logo após `<Hero />`, nesta ordem: `<Hero />`, `<TrustBar />`, `<WhyMedSenior />`.

- [ ] **Step 4: Verificar no browser**

- Barra com 6 números em 6 colunas no desktop e 2 colunas em 400px; notas de rodapé abaixo.
- Seção "Por que MedSênior" com foto à direita e 6 cards; cards aparecem com fade ao rolar.

- [ ] **Step 5: Commit**

```bash
git add components/medsenior/TrustBar.tsx components/medsenior/WhyMedSenior.tsx "app/(landing)/medsenior/page.tsx" && git commit -m "Adiciona números e diferenciais MedSênior à LP

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 9: Plans (sem preço)

**Files:**
- Create: `components/medsenior/Plans.tsx`
- Modify: `app/(landing)/medsenior/page.tsx`

**Interfaces:**
- Consumes: `PLANOS`, `Plano` (`lib/medsenior.ts`); `buildWhatsAppUrl`.
- Produces: `Plans()`.

- [ ] **Step 1: Criar `components/medsenior/Plans.tsx`**

```tsx
import { FaWhatsapp } from 'react-icons/fa'
import { FiCheck, FiHome, FiMap, FiShield } from 'react-icons/fi'
import { PLANOS, type Plano } from '@/lib/medsenior'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function PlanCard({ plano, index }: { plano: Plano; index: number }) {
  const destaque = Boolean(plano.destaque)
  return (
    <Reveal delay={index * 80} className="h-full">
      <article
        className={`ms-card relative flex h-full flex-col p-6 transition-transform hover:-translate-y-1 hover:shadow-xl ${destaque ? 'ring-2 ring-ms-green-500' : ''}`}
        aria-labelledby={`plano-${plano.id}`}
      >
        {plano.destaque && (
          <span className="absolute -top-3 right-6 rounded-full bg-ms-lime px-3 py-1 text-xs font-bold uppercase tracking-wide text-ms-green-900">
            {plano.destaque}
          </span>
        )}
        <h3 id={`plano-${plano.id}`} className="text-xl font-extrabold leading-tight text-ms-green-900">{plano.nome}</h3>
        <p className="mt-2 text-sm text-gray-600">{plano.descricao}</p>

        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex items-center gap-2"><FiHome className="text-ms-green-600" aria-hidden="true" /><dt className="sr-only">Acomodação</dt><dd><strong>{plano.acomodacao}</strong></dd></div>
          <div className="flex items-start gap-2"><FiMap className="mt-0.5 shrink-0 text-ms-green-600" aria-hidden="true" /><dt className="sr-only">Abrangência</dt><dd><strong>{plano.abrangencia}</strong> — {plano.abrangenciaDetalhe}</dd></div>
          <div className="flex items-start gap-2"><FiShield className="mt-0.5 shrink-0 text-ms-green-600" aria-hidden="true" /><dt className="sr-only">Segmentação</dt><dd>{plano.segmentacao}</dd></div>
        </dl>

        <ul className="mt-5 space-y-2 border-t border-ms-green-100 pt-5 text-sm">
          <li className="flex items-center gap-2 font-semibold text-ms-green-700"><FiCheck aria-hidden="true" />{plano.coparticipacao ? 'Com coparticipação' : 'Sem coparticipação'}</li>
          {plano.beneficios.map((b) => (
            <li key={b} className="flex items-start gap-2 text-gray-700"><FiCheck className="mt-0.5 shrink-0 text-ms-green-500" aria-hidden="true" />{b}</li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <a
            href={buildWhatsAppUrl({ plano: plano.nome, origem: 'plano' })}
            target="_blank"
            rel="noopener noreferrer"
            className={`ms-btn w-full ${destaque ? 'ms-btn-wa' : 'ms-btn-outline'}`}
          >
            <FaWhatsapp size={20} aria-hidden="true" />
            Quero cotação deste plano
          </a>
          <p className="mt-3 text-center text-xs text-gray-500">Reg. ANS {plano.registroAns}</p>
        </div>
      </article>
    </Reveal>
  )
}

export default function Plans() {
  return (
    <section id="planos" className="ms-section bg-ms-cream" aria-labelledby="plans-title">
      <div className="ms-container">
        <Reveal>
          <SectionHeading
            eyebrow="Planos disponíveis"
            title="Quatro opções, todas sem coparticipação"
            lead="Escolha entre cobertura em Porto Alegre ou rede em 8 estados. O consultor da Excellent envia os valores da sua faixa etária no WhatsApp."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PLANOS.map((p, i) => (
            <PlanCard key={p.id} plano={p} index={i} />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-gray-600">
          Todos os planos são coletivos por adesão, com segmentação ambulatorial + hospitalar sem obstetrícia. Os valores variam por faixa etária e são informados pelo consultor. Reajuste anual em janeiro.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Inserir na página**

Importar `Plans` em `page.tsx` e renderizar após `<WhyMedSenior />`.

- [ ] **Step 3: Verificar no browser**

- 4 cards; "Apartamento POA" e "Infinite" com anel verde e etiqueta ("Mais escolhido" / "Mais completo").
- Nenhum "R$" na página: no console do browser, `document.body.innerText.includes('R$')` deve retornar `false`.
- Botão do card "Infinite" abre link cujo `text` decodificado contém `*Plano de interesse:* Infinite Adesão – POA` e `Origem: LP MedSênior/plano`.

- [ ] **Step 4: Commit**

```bash
git add components/medsenior/Plans.tsx "app/(landing)/medsenior/page.tsx" && git commit -m "Adiciona cards de planos MedSênior sem preço à LP

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 10: Eligibility + HowItWorks

**Files:**
- Create: `components/medsenior/Eligibility.tsx`
- Create: `components/medsenior/HowItWorks.tsx`
- Modify: `app/(landing)/medsenior/page.tsx`

**Interfaces:**
- Consumes: `ELEGIBILIDADE`, `PASSOS` (`lib/medsenior.ts`); `buildWhatsAppUrl`.
- Produces: `Eligibility()`, `HowItWorks()`.

- [ ] **Step 1: Criar `components/medsenior/Eligibility.tsx`**

```tsx
import { FaWhatsapp } from 'react-icons/fa'
import { FiBriefcase, FiFileText, FiHeart } from 'react-icons/fi'
import { ELEGIBILIDADE } from '@/lib/medsenior'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Eligibility() {
  const { assena, arpl, dependentes, documentosTitular } = ELEGIBILIDADE
  return (
    <section id="quem-pode" className="ms-section bg-white" aria-labelledby="elig-title">
      <div className="ms-container">
        <Reveal>
          <SectionHeading
            eyebrow="Quem pode aderir"
            title="Planos por adesão: basta ter a partir de 44 anos e vínculo com uma entidade de classe"
            lead="A adesão é feita por meio de associações parceiras. A Excellent cuida da filiação junto com você — sem burocracia."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="ms-card h-full p-6 md:p-8">
              <span className="ms-eyebrow"><FiBriefcase aria-hidden="true" /> {assena.sigla}</span>
              <h3 className="mt-3 text-2xl font-extrabold text-ms-green-900">{assena.titulo}</h3>
              <p className="text-gray-600">{assena.subtitulo}</p>
              <p className="mt-4 text-sm font-semibold text-ms-green-900">Documentação:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                {assena.documentos.map((d) => <li key={d}>{d}</li>)}
              </ul>
              <p className="mt-3 text-sm text-gray-500">{assena.observacao}</p>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article className="ms-card h-full p-6 md:p-8">
              <span className="ms-eyebrow"><FiFileText aria-hidden="true" /> {arpl.sigla}</span>
              <h3 className="mt-3 text-2xl font-extrabold text-ms-green-900">{arpl.titulo}</h3>
              <p className="text-gray-600">{arpl.subtitulo}</p>
              <p className="mt-4 text-sm font-semibold text-ms-green-900">Documentação:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                {arpl.documentos.map((d) => <li key={d}>{d}</li>)}
              </ul>
              <details className="mt-4 group">
                <summary className="cursor-pointer list-none font-semibold text-ms-green-700 underline-offset-4 hover:underline">
                  Ver as {arpl.profissoes.length} profissões aceitas
                </summary>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {arpl.profissoes.map((p) => (
                    <li key={p} className="rounded-full bg-ms-green-50 px-3 py-1 text-sm text-ms-green-900">{p}</li>
                  ))}
                </ul>
              </details>
            </article>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="mt-6 grid gap-6 rounded-3xl rounded-tl-none bg-ms-cream p-6 md:grid-cols-2 md:p-8">
            <div>
              <span className="ms-eyebrow"><FiHeart aria-hidden="true" /> Dependentes aceitos</span>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-gray-700">
                {dependentes.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
            <div>
              <span className="ms-eyebrow"><FiFileText aria-hidden="true" /> Documentos do titular</span>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">
                {documentosTitular.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-gray-700">Não se encaixa em nenhuma entidade? A Excellent trabalha com outras operadoras.</p>
          <a href={buildWhatsAppUrl({ origem: 'elegibilidade' })} target="_blank" rel="noopener noreferrer" className="ms-btn ms-btn-primary">
            <FaWhatsapp size={20} aria-hidden="true" /> Falar com um consultor
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Criar `components/medsenior/HowItWorks.tsx`**

```tsx
import { PASSOS } from '@/lib/medsenior'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="ms-section bg-ms-green-900 text-white" aria-labelledby="how-title">
      <div className="ms-container">
        <Reveal>
          <SectionHeading dark align="center" eyebrow="Como funciona" title="Da conversa à carteirinha em três passos" />
        </Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {PASSOS.map((p, i) => (
            <Reveal key={p.titulo} delay={i * 100} className="h-full">
              <li className="h-full rounded-3xl rounded-tl-none bg-white/5 p-6 ring-1 ring-white/10 md:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ms-lime text-xl font-extrabold text-ms-green-900">{i + 1}</span>
                <h3 className="mt-5 text-xl font-bold">{p.titulo}</h3>
                <p className="mt-2 leading-relaxed text-ms-green-100">{p.texto}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Inserir na página**

Importar `Eligibility` e `HowItWorks`; renderizar após `<Plans />`, nesta ordem.

- [ ] **Step 4: Verificar no browser**

- Dois cards (ASSENA/ARPL); "Ver as 41 profissões aceitas" expande chips.
- Bloco de dependentes/documentos; CTA "Falar com um consultor" com `Origem: LP MedSênior/elegibilidade`.
- Seção escura com 3 passos numerados.

- [ ] **Step 5: Commit**

```bash
git add components/medsenior/Eligibility.tsx components/medsenior/HowItWorks.tsx "app/(landing)/medsenior/page.tsx" && git commit -m "Adiciona elegibilidade e passo a passo à LP MedSênior

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 11: Carencias + Unit

**Files:**
- Create: `components/medsenior/Carencias.tsx`
- Create: `components/medsenior/Unit.tsx`
- Modify: `app/(landing)/medsenior/page.tsx`

**Interfaces:**
- Consumes: `CARENCIAS`, `NOTA_CARENCIAS`, `AREA_COMERCIALIZACAO`, `OPERADORA` (`lib/medsenior.ts`); `buildWhatsAppUrl`.
- Produces: `Carencias()`, `Unit()`.

- [ ] **Step 1: Criar `components/medsenior/Carencias.tsx`**

```tsx
import { CARENCIAS, NOTA_CARENCIAS } from '@/lib/medsenior'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Carencias() {
  return (
    <section id="carencias" className="ms-section bg-white" aria-labelledby="car-title">
      <div className="ms-container">
        <Reveal>
          <SectionHeading
            eyebrow="Carências"
            title="Já tem plano há 6 meses? Quase tudo libera em 24 horas"
            lead="Veja os prazos contratuais e como a portabilidade de carências funciona na MedSênior."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 overflow-x-auto rounded-3xl rounded-tl-none border border-ms-green-100">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Prazos de carência com e sem plano anterior</caption>
              <thead className="bg-ms-green-700 text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-bold">Procedimento</th>
                  <th scope="col" className="px-5 py-4 font-bold">Sem plano anterior</th>
                  <th scope="col" className="px-5 py-4 font-bold">Com plano anterior (mín. 6 meses)</th>
                </tr>
              </thead>
              <tbody>
                {CARENCIAS.map((c, i) => (
                  <tr key={c.procedimento} className={i % 2 ? 'bg-ms-cream' : 'bg-white'}>
                    <th scope="row" className="px-5 py-3 font-medium text-ms-ink">{c.procedimento}</th>
                    <td className="px-5 py-3 text-gray-700">{c.semPlano}</td>
                    <td className="px-5 py-3 font-semibold text-ms-green-700">{c.comPlano}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mt-6 text-sm leading-relaxed text-gray-600">{NOTA_CARENCIAS}</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Criar `components/medsenior/Unit.tsx`**

```tsx
import { FaWhatsapp } from 'react-icons/fa'
import { FiExternalLink, FiMapPin } from 'react-icons/fi'
import { AREA_COMERCIALIZACAO, OPERADORA } from '@/lib/medsenior'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Unit() {
  const { municipal, nacional } = AREA_COMERCIALIZACAO
  return (
    <section id="onde-usar" className="ms-section bg-ms-cream" aria-labelledby="unit-title">
      <div className="ms-container grid gap-10 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <SectionHeading
            eyebrow="Onde você é atendido"
            title="Unidade própria MedSênior em Porto Alegre e rede em 8 estados"
            lead="Pronto atendimento, consultas e exames em unidade própria da operadora, além de hospitais credenciados. A rede é disponibilizada conforme o plano contratado."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={OPERADORA.redeUrl} target="_blank" rel="noopener noreferrer" className="ms-btn ms-btn-outline">
              Consultar rede credenciada <FiExternalLink aria-hidden="true" />
            </a>
            <a href={buildWhatsAppUrl({ origem: 'unidade' })} target="_blank" rel="noopener noreferrer" className="ms-btn ms-btn-wa">
              <FaWhatsapp size={20} aria-hidden="true" /> Tirar dúvidas sobre a rede
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-500">A rede credenciada pode sofrer alterações pela operadora, seguindo as diretrizes da ANS.</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-4">
            <article className="ms-card p-6">
              <span className="ms-eyebrow"><FiMapPin aria-hidden="true" /> Abrangência municipal</span>
              <h3 className="mt-2 text-lg font-bold text-ms-green-900">{municipal.planos}</h3>
              <p className="text-gray-700">{municipal.area}</p>
            </article>
            <article className="ms-card p-6">
              <span className="ms-eyebrow"><FiMapPin aria-hidden="true" /> Grupo de municípios</span>
              <h3 className="mt-2 text-lg font-bold text-ms-green-900">{nacional.planos}</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                {nacional.area.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Inserir na página**

Importar `Carencias` e `Unit`; renderizar após `<HowItWorks />`, nesta ordem.

- [ ] **Step 4: Verificar no browser**

- Tabela com 12 linhas, coluna "Com plano anterior" em verde; em 400px a tabela rola horizontalmente sem a página rolar.
- Seção "Onde você é atendido" com dois cards e links (rede abre `medsenior.com.br/lp/`).

- [ ] **Step 5: Commit**

```bash
git add components/medsenior/Carencias.tsx components/medsenior/Unit.tsx "app/(landing)/medsenior/page.tsx" && git commit -m "Adiciona carências e área de atendimento à LP MedSênior

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 12: WhyExcellent + Faq + FinalCta

**Files:**
- Create: `components/medsenior/WhyExcellent.tsx`
- Create: `components/medsenior/Faq.tsx`
- Create: `components/medsenior/FinalCta.tsx`
- Modify: `app/(landing)/medsenior/page.tsx`

**Interfaces:**
- Consumes: `RAZOES_EXCELLENT`, `FAQ` (`lib/medsenior.ts`); `LeadForm`.
- Produces: `WhyExcellent()`, `Faq()`, `FinalCta()`.

- [ ] **Step 1: Criar `components/medsenior/WhyExcellent.tsx`**

```tsx
import Image from 'next/image'
import { FiCheckCircle } from 'react-icons/fi'
import { RAZOES_EXCELLENT } from '@/lib/medsenior'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function WhyExcellent() {
  return (
    <section id="excellent" className="ms-section bg-white" aria-labelledby="exc-title">
      <div className="ms-container grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl rounded-tl-none">
            <Image src="/medsenior/excellent.jpg" alt="Consultora da Excellent Saúde atendendo cliente" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <SectionHeading
            eyebrow="Por que contratar pela Excellent"
            title="Mesmo valor da operadora, com um especialista do seu lado"
            lead="Somos uma corretora de Porto Alegre especializada em planos de saúde. Você fala com gente, não com robô."
          />
          <ul className="mt-8 space-y-5">
            {RAZOES_EXCELLENT.map((r) => (
              <li key={r.titulo} className="flex gap-4">
                <FiCheckCircle className="mt-1 h-6 w-6 shrink-0 text-ms-green-500" aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-ms-green-900">{r.titulo}</h3>
                  <p className="text-gray-600">{r.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Criar `components/medsenior/Faq.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { FAQ } from '@/lib/medsenior'
import SectionHeading from './SectionHeading'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="ms-section bg-ms-cream" aria-labelledby="faq-title">
      <div className="ms-container max-w-4xl">
        <SectionHeading align="center" eyebrow="Dúvidas frequentes" title="O que as pessoas perguntam antes de contratar" />
        <div className="mt-10 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            const panelId = `faq-panel-${i}`
            const btnId = `faq-btn-${i}`
            return (
              <div key={item.pergunta} className="ms-card overflow-hidden">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-bold text-ms-green-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ms-lime/60"
                  >
                    {item.pergunta}
                    <FiChevronDown aria-hidden="true" className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="px-6 pb-6 leading-relaxed text-gray-700">
                  {item.resposta}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Criar `components/medsenior/FinalCta.tsx`**

```tsx
import LeadForm from './LeadForm'
import Reveal from './Reveal'

export default function FinalCta() {
  return (
    <section id="cotacao" className="relative isolate overflow-hidden bg-ms-green-900 py-16 text-white md:py-24" aria-labelledby="cta-title">
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-ms-lime/10 blur-3xl" />
      <div className="ms-container relative grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <h2 id="cta-title" className="text-3xl font-extrabold leading-tight md:text-4xl">
            Pronto para cuidar da sua saúde com quem entende de quem tem a partir de 44 anos?
          </h2>
          <p className="mt-4 text-lg text-ms-green-100">
            Deixe seu contato e receba a cotação da sua faixa etária no WhatsApp. Sem compromisso, sem custo extra.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="ms-card p-6 text-ms-ink md:p-8">
            <LeadForm origem="final" compact />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Inserir na página**

Importar `WhyExcellent`, `Faq`, `FinalCta`; renderizar após `<Unit />`, nesta ordem. A ordem final dentro de `<main>`: `Hero, TrustBar, WhyMedSenior, Plans, Eligibility, HowItWorks, Carencias, Unit, WhyExcellent, Faq, FinalCta`.

- [ ] **Step 5: Verificar no browser**

- FAQ: primeira pergunta aberta; Tab até um botão e Enter alterna; `aria-expanded` muda; painéis fechados têm `hidden`.
- CTA final: form compacto (nome, WhatsApp, faixa) gera link com `Origem: LP MedSênior/final`.

- [ ] **Step 6: Commit**

```bash
git add components/medsenior/WhyExcellent.tsx components/medsenior/Faq.tsx components/medsenior/FinalCta.tsx "app/(landing)/medsenior/page.tsx" && git commit -m "Adiciona razões Excellent, FAQ e CTA final à LP MedSênior

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 13: SEO — metadata e JSON-LD

**Files:**
- Modify: `app/(landing)/medsenior/page.tsx`

**Interfaces:**
- Consumes: `FAQ`, `CONTATO` (`lib/medsenior.ts`).
- Produces: `export const metadata` e dois `<script type="application/ld+json">`.

- [ ] **Step 1: Reescrever `app/(landing)/medsenior/page.tsx` completo**

```tsx
import type { Metadata } from 'next'
import { CONTATO, FAQ } from '@/lib/medsenior'
import LpHeader from '@/components/medsenior/LpHeader'
import Hero from '@/components/medsenior/Hero'
import TrustBar from '@/components/medsenior/TrustBar'
import WhyMedSenior from '@/components/medsenior/WhyMedSenior'
import Plans from '@/components/medsenior/Plans'
import Eligibility from '@/components/medsenior/Eligibility'
import HowItWorks from '@/components/medsenior/HowItWorks'
import Carencias from '@/components/medsenior/Carencias'
import Unit from '@/components/medsenior/Unit'
import WhyExcellent from '@/components/medsenior/WhyExcellent'
import Faq from '@/components/medsenior/Faq'
import FinalCta from '@/components/medsenior/FinalCta'
import LpFooter from '@/components/medsenior/LpFooter'
import StickyWhatsApp from '@/components/medsenior/StickyWhatsApp'

const TITLE = 'Plano de Saúde MedSênior em Porto Alegre | Excellent Saúde'
const DESCRIPTION =
  'Plano de saúde MedSênior por adesão para quem tem a partir de 44 anos em Porto Alegre. Sem coparticipação, unidade própria, pronto atendimento virtual 24h. Cotação pelo WhatsApp com a Excellent Saúde.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/medsenior' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/medsenior',
    siteName: 'Excellent Saúde',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/medsenior/og.jpg', width: 1200, height: 630, alt: 'Plano de saúde MedSênior com a Excellent Saúde' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/medsenior/og.jpg'] },
  robots: { index: true, follow: true },
}

const jsonLdAgency = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  name: 'Excellent Saúde',
  url: `${CONTATO.site}/medsenior`,
  telephone: `+${CONTATO.whatsapp}`,
  email: CONTATO.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Praia de Belas, 1212 – Sala 424',
    addressLocality: 'Porto Alegre',
    addressRegion: 'RS',
    postalCode: '90110-000',
    addressCountry: 'BR',
  },
  areaServed: 'Porto Alegre, RS',
}

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.pergunta,
    acceptedAnswer: { '@type': 'Answer', text: f.resposta },
  })),
}

export default function MedSeniorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAgency) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <LpHeader />
      <main id="topo" className="pb-24 md:pb-0">
        <Hero />
        <TrustBar />
        <WhyMedSenior />
        <Plans />
        <Eligibility />
        <HowItWorks />
        <Carencias />
        <Unit />
        <WhyExcellent />
        <Faq />
        <FinalCta />
      </main>
      <LpFooter />
      <StickyWhatsApp />
    </>
  )
}
```

- [ ] **Step 2: Verificar**

Run: `npm run build`
Expected: sucesso. No browser, `document.title` é o `TITLE`; `document.querySelectorAll('script[type="application/ld+json"]').length === 2`; `document.querySelectorAll('h1').length === 1`.

- [ ] **Step 3: Commit**

```bash
git add "app/(landing)/medsenior/page.tsx" && git commit -m "Adiciona metadata e JSON-LD à LP MedSênior

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 14: Verificação final e compliance

**Files:**
- Possíveis ajustes em qualquer arquivo de `components/medsenior/` ou `app/(landing)/`.

- [ ] **Step 1: Testes, lint e build**

Run: `npm test && npm run lint && npm run build`
Expected: 6 testes passando, lint sem erros, build com `/medsenior` e todas as rotas do site.

- [ ] **Step 2: Checklist de compliance MedSênior (no browser, em `/medsenior`)**

Executar no console e conferir:

```js
({
  semPreco: !document.body.innerText.includes('R$'),
  sem49mais: !/49\+/.test(document.body.innerText),
  textoObrigatorio: document.body.innerText.includes('não possui vínculo com a operadora de saúde'),
  susep: document.body.innerText.includes('202083498'),
  ans: document.body.innerText.includes('33.561-4'),
  linksLgpd: ['/politica-privacidade', '/lgpd', '/termos-uso'].every((h) => !!document.querySelector(`a[href="${h}"]`)),
  umH1: document.querySelectorAll('h1').length === 1,
  whatsappLinks: [...document.querySelectorAll('a[href^="https://wa.me/5551995567277"]')].length >= 8,
})
```

Expected: todos `true`.

- [ ] **Step 3: Responsividade e acessibilidade**

- `resize_window` para 400px: sem scroll horizontal (`document.documentElement.scrollWidth <= window.innerWidth`), barra fixa visível, banner de cookies acima da barra.
- Navegar por Tab: header → form → cards → FAQ; foco sempre visível.
- Tirar screenshot desktop e mobile para o usuário.

- [ ] **Step 4: Conferir que o site institucional não mudou**

Abrir `/` e `/lgpd`: Header navy, Footer e ChatWidget presentes; sem fonte Montserrat (`getComputedStyle(document.body).fontFamily` contém "Inter").

- [ ] **Step 5: Atualizar README**

Em `README.md`, na seção "Páginas Principais", adicionar após o bloco Home:

```markdown
- **/medsenior** - Landing page de conversão MedSênior (layout próprio em `app/(landing)`)
  - Conteúdo editável em `lib/medsenior.ts` (planos, FAQ, textos legais, razão social/CNPJ)
  - Selo "Corretora autorizada": colocar o arquivo recebido do Gestor Comercial em `public/medsenior/selo-autorizada.png`
  - Testes: `npm test`
```

- [ ] **Step 6: Commit final**

```bash
git add -A && git commit -m "Finaliza verificação da LP MedSênior e documenta no README

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Self-review

**Spec coverage:** Regras (Task 5 header/rodapé, Task 9 sem preço, Task 5 cookies, Task 14 checklist) ✔ · Route groups (Task 1) ✔ · Tokens/fonte (Task 2, 5) ✔ · `lib/medsenior.ts` (Task 4) ✔ · `lib/whatsapp.ts` + testes (Task 3) ✔ · 13 seções do spec (Tasks 5–12) ✔ · SEO/JSON-LD (Task 13) ✔ · Tratamento de erros: validação inline, fallback `window.open`, selo ausente, `localStorage` (Tasks 5, 7) ✔ · Verificação (Task 14) ✔ · Imagens IA (Task 6) ✔.

**Type consistency:** `OrigemLead` inclui `'elegibilidade'` e `'unidade'` usados nas Tasks 10 e 11 ✔ · `LeadForm` props `origem/compact/plano` iguais nas Tasks 7 e 12 ✔ · `SectionHeading` props `eyebrow/title/lead/align/dark` iguais em todos os usos ✔ · `Reveal` props `className/delay` ✔ · `NOTAS_NUMEROS`, `NOTA_CARENCIAS` exportados na Task 4 e consumidos nas 8 e 11 ✔ · `ELEGIBILIDADE.arpl.profissoes` tem 41 itens (o texto do botão usa `.length`, então não há número fixo) ✔.
