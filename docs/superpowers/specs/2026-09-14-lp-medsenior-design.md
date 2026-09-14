# Landing Page MedSênior — Excellent Saúde

Data: 2026-09-14
Status: aprovado para plano de implementação

## 1. Objetivo

Landing page de conversão em `/medsenior` para venda dos planos coletivos por adesão
MedSênior (Porto Alegre) pela Excellent Saúde. Todo lead é capturado via WhatsApp
`(51) 99556-7277` com mensagem pré-preenchida. Sem backend.

A página cumpre integralmente as regras de compliance da MedSênior para corretores
(`public2/regras.png`).

## 2. Regras MedSênior (obrigatórias)

| Regra | Como a LP cumpre |
|---|---|
| Domínio não pode conter "Medsênior" | Rota `/medsenior` no domínio da Excellent |
| Logomarca da corretora no header | Logo Excellent como marca principal; MedSênior aparece como operadora |
| Selo "Corretora autorizada MedSênior" | Slot no header com placeholder até o comercial receber o selo do Gestor Comercial |
| Não expor preços | Nenhum valor em R$. CTAs de "Solicitar cotação" |
| Texto obrigatório no rodapé | "O conteúdo deste site é de responsabilidade da **[RAZÃO SOCIAL] — CNPJ [CNPJ]** e não possui vínculo com a operadora de saúde." Enquanto não houver razão social/CNPJ, exibe "Excellent Saúde — Registro SUSEP 202083498" |
| Política de privacidade + cookies (LGPD) | Links para `/politica-privacidade`, `/lgpd`, `/termos-uso` + banner de cookies |

Sem depoimentos inventados (conteúdo é de responsabilidade da corretora).

## 3. Decisões tomadas

- Captura: WhatsApp direto (sem mailto, sem API).
- Número: `5551995567277`.
- URL: `/medsenior`.
- Layout próprio (header/rodapé de conversão), sem menu do site institucional.
- Visual: co-branding com verde MedSênior dominante, navy Excellent em logo/rodapé.
- Fotos: geradas por IA, salvas em `public/medsenior/`.
- Idade: comunicar **"a partir de 44 anos"** (tabela POA), não "49+".
- Rodapé: SUSEP 202083498 agora; razão social/CNPJ ficam como constantes a preencher em `lib/medsenior.ts`.

## 4. Arquitetura

### 4.1 Route groups com dois root layouts

```
app/
  globals.css                      (mantido; recebe tokens da LP)
  (site)/
    layout.tsx                     <- conteúdo do app/layout.tsx atual (Header/Footer/ChatWidget)
    page.tsx                       <- movido de app/page.tsx (sem alteração)
    lgpd/page.tsx                  <- movido
    politica-privacidade/page.tsx  <- movido
    termos-uso/page.tsx            <- movido
  (landing)/
    layout.tsx                     <- <html lang="pt-BR"><body> + Montserrat + CookieBanner
    medsenior/page.tsx             <- compõe seções; exporta metadata; injeta JSON-LD
```

`app/layout.tsx` é removido. URLs públicas não mudam.

### 4.2 Componentes (`components/medsenior/`)

Um arquivo por seção; server components por padrão, `'use client'` só onde há estado:

| Componente | Client? | Responsabilidade |
|---|---|---|
| `LpHeader` | não | Logo Excellent, selo autorizada (placeholder), botão WhatsApp |
| `Hero` | não | H1, subtítulo, 3 bullets, foto, contém `LeadForm` |
| `LeadForm` | sim | Campos nome, WhatsApp, faixa etária, cidade, tem plano hoje?; valida; abre `wa.me` |
| `TrustBar` | não | 6 números |
| `WhyMedSenior` | não | 6 cards de diferenciais |
| `Plans` | não | 4 cards de plano, CTA por plano |
| `Eligibility` | não | ASSENA / ARPL, chips de profissões, dependentes |
| `HowItWorks` | não | 3 passos |
| `Carencias` | não | Tabela resumida com/sem plano anterior |
| `Unit` | não | Unidade POA, área de comercialização, link rede |
| `WhyExcellent` | não | 4 razões |
| `Faq` | sim | Acordeão acessível (button + aria-expanded + region) |
| `FinalCta` | não | Repete `LeadForm` compacto |
| `LpFooter` | não | Texto obrigatório, ANS, SUSEP, links, endereço |
| `StickyWhatsApp` | não | Barra fixa inferior no mobile |
| `CookieBanner` | sim | Aceite salvo em `localStorage` |
| `Reveal` | sim | Wrapper de scroll-reveal via IntersectionObserver (respeita `prefers-reduced-motion`) |

### 4.3 Dados (`lib/medsenior.ts`)

Todo texto editável em um único módulo tipado:

```ts
export const CONTATO = { whatsapp: '5551995567277', whatsappFormatado: '(51) 99556-7277', email, endereco, susep: '202083498', razaoSocial: '', cnpj: '' }
export const OPERADORA = { nome: 'MedSênior', ans: '33.561-4', redeUrl: 'https://medsenior.com.br/lp/' }
export const NUMEROS = [...]            // TrustBar
export const DIFERENCIAIS = [...]       // WhyMedSenior
export const PLANOS: Plano[] = [...]    // nome, registroAns, acomodacao, abrangencia, segmentacao, coparticipacao, destaque, cidades
export const FAIXAS_ETARIAS = ['44 a 48', '49 a 53', '54 a 58', '59 ou mais']
export const ELEGIBILIDADE = { assena: {...}, arpl: { profissoes: [...] }, dependentes: [...] }
export const PASSOS = [...]
export const CARENCIAS = [...]          // procedimento, semPlano, comPlano
export const AREA_COMERCIALIZACAO = {...}
export const FAQ = [...]
export const RAZOES_EXCELLENT = [...]
```

Fonte dos dados: `public2/29.07.26 Tabela medsênior Porto Alegre(atual).pdf` e
`public2/apresentacao-institucional-medsenior-2026 (2.pdf`.

### 4.4 `lib/whatsapp.ts`

```ts
buildWhatsAppUrl(params: { nome?, telefone?, faixaEtaria?, cidade?, temPlano?, plano?, origem: 'hero'|'plano'|'final'|'header'|'sticky' }): string
```

Monta `https://wa.me/5551995567277?text=...` com mensagem em Markdown do WhatsApp
(`*Cotação MedSênior*` + campos preenchidos + `Origem: LP MedSênior/<origem>`).
Campos vazios são omitidos. Função pura, sem efeitos — testável.

## 5. Conteúdo por seção

### 5.1 Header
Logo Excellent (link `#topo`) · slot do selo (imagem `public/medsenior/selo-autorizada.png`; placeholder textual "Corretora autorizada MedSênior" até existir) · botão verde WhatsApp "Falar com consultor".

### 5.2 Hero
- Tag: "Plano de saúde coletivo por adesão · Porto Alegre"
- H1: "Plano de saúde feito para quem tem a partir de 44 anos"
- Sub: "MedSênior: a operadora especializada em bem envelhecer, com unidades próprias, pronto atendimento virtual 24h e sem coparticipação. A Excellent Saúde cuida da sua adesão do início ao fim."
- Bullets: Unidades próprias MedSênior · Sem coparticipação · Programa Bem Envelhecer
- Foto: casal 60+ sorrindo, luz natural.
- `LeadForm`: Nome*, WhatsApp*, Faixa etária* (select), Cidade, Já tem plano hoje? (Sim/Não). Botão "Receber cotação no WhatsApp". Microcopy: "Sem compromisso · resposta em horário comercial · seus dados não são compartilhados".

### 5.3 TrustBar
Desde 2010 · 8 estados · 45 unidades próprias · +150 hospitais credenciados* · 260 mil beneficiários · 5x eleito melhor plano de saúde** (notas: *credenciados ao plano Black 5 / **200 maiores e melhores empresas do ES – IEL).

### 5.4 WhyMedSenior
1. Programa Bem Envelhecer — medicina preventiva, acompanhamento integral.
2. Central de Inteligência e Monitoramento — enfermeiro gestor do cuidado, seg–sex 8h–20h.
3. Pronto Atendimento Virtual 24h — teleconsulta com médico, receitas e pedidos de exame.
4. Oficinas de Saúde — Arte Terapia, Educa a Dor, Cabeça Boa, NutriSaber, Tecnologia, Autonomia e Independência.
5. Unidades próprias — Unidade Porto Alegre e rede em 8 estados.
6. Clube de Vantagens — descontos e benefícios para beneficiários.

### 5.5 Plans (sem preço)
| Plano | Acomodação | Abrangência | Reg. ANS |
|---|---|---|---|
| MedSênior Adesão Enfermaria – POA | Enfermaria | Municipal (Porto Alegre) | 504.124/25-4 |
| MedSênior Adesão Apartamento – POA | Apartamento | Municipal (Porto Alegre) | 504.123/25-6 |
| Black Adesão 5 – POA | Apartamento | Grupo de municípios (8 estados) | 504.127/25-9 |
| Infinite Adesão – POA | Apartamento | Grupo de municípios (8 estados) | 504.222/25-4 |

Todos: Ambulatorial + Hospitalar sem obstetrícia · Sem coparticipação. Card "Infinite" marcado como "Mais completo"; "Apartamento POA" como "Mais escolhido". CTA de cada card: "Quero cotação deste plano" -> `buildWhatsAppUrl({ plano, origem: 'plano' })`. Nota: "Valores variam por faixa etária e são informados pelo consultor. Reajuste anual em janeiro."

### 5.6 Eligibility
- ASSENA — Servidores públicos estaduais e federais (holerite, nomeação, ficha associativa; taxa associativa simbólica).
- ARPL — Profissionais liberais com diploma (diploma, ficha associativa, carteira do conselho). Chips com as 45 profissões do PDF.
- Dependentes: cônjuge/companheiro(a), pais, padrasto/madrasta, sogros, avós, bisavós, tios.
- Rodapé da seção: "Não se encaixa? Fale conosco — temos outras operadoras."

### 5.7 HowItWorks
1. Fale com um consultor no WhatsApp.
2. Envie os documentos (RG, CPF, comprovante de residência, cartão SUS, selfie com documento, comprovante de elegibilidade) e faça a entrevista médica online da MedSênior.
3. Escolha a vigência (dias 1, 5, 10 ou 15) e receba sua carteirinha.

### 5.8 Carencias
Tabela: Urgência/emergência 24h · Consultas 30d · Exames simples 30d · Complexos I 90d · Complexos II 120d · Especiais/fisio/alta complexidade/saúde mental/internações 180d · CPT 24 meses. Coluna "Com plano anterior (>= 6 meses)": 24h para todos exceto CPT. Nota sobre documentação para redução.

### 5.9 Unit
Unidade MedSênior Porto Alegre · área de comercialização por plano · link "Consultar rede credenciada" (medsenior.com.br/lp/) · aviso de que a rede pode mudar conforme ANS.

### 5.10 WhyExcellent
Sem custo adicional · Consultor local em Porto Alegre · Registro SUSEP 202083498 · Acompanhamento pós-venda (reajustes, carteirinha, dúvidas).

### 5.11 FAQ (8)
Idade mínima (44) · Tem coparticipação? (não) · Quanto custa? (cotação por faixa etária, sem compromisso) · Carência · Reajuste (janeiro) · Documentos · Dependentes · Onde posso usar (POA / 8 estados).

### 5.12 FinalCta
Fundo verde escuro, título "Pronto para cuidar da sua saúde com quem entende de 44+?", `LeadForm` compacto.

### 5.13 Footer
Texto obrigatório MedSênior · "MedSênior — ANS nº 33.561-4" · Excellent: endereço, WhatsApp, e-mail, SUSEP · links Política de Privacidade / LGPD / Termos · © ano.

## 6. Design system (tokens em `tailwind.config.ts` sob `ms`)

| Token | Valor | Uso |
|---|---|---|
| `ms-green-900` | `#0B3D2E` | fundos escuros (final CTA, footer) |
| `ms-green-700` | `#0F6B3F` | primária, botões, títulos |
| `ms-green-500` | `#1E9E5A` | hover, ícones |
| `ms-lime` | `#9BD338` | acentos, tags |
| `ms-cream` | `#F4F8F3` | fundos claros alternados |
| `ms-ink` | `#122117` | texto |
| `wa` | `#25D366` | botões WhatsApp |

- Fonte: Montserrat (`next/font/google`, pesos 400/600/700/800), aplicada só no layout `(landing)`.
- Tipo: H1 40/56px, H2 32/40px, corpo 17–18px, line-height 1.6. Contraste AA mínimo.
- Raio: cards 24px com um canto reto (`rounded-3xl rounded-tl-none`), botões 999px.
- Botões: altura mínima 52px, foco visível (`focus-visible:ring`).
- Movimento: `Reveal` com fade/translate 16px, desativado com `prefers-reduced-motion`.
- Fundo do hero: gradiente verde + formas de folha em SVG inline, baixo contraste.
- Imagens: `next/image` com `sizes`, WebP, `priority` só no hero.

## 7. SEO

- `metadata`: title "Plano de Saúde MedSênior em Porto Alegre | Excellent Saúde", description, OG image (`public/medsenior/og.jpg`), `robots: index`.
- JSON-LD: `InsuranceAgency` (Excellent) + `FAQPage`.
- Semântica: um `<h1>`, seções com `<h2>`, `aria-label` nos landmarks.

## 8. Tratamento de erros

- `LeadForm`: validação client (nome >= 2 chars, telefone com 10–11 dígitos após limpar máscara, faixa obrigatória); mensagens inline; `aria-invalid`.
- Se `window.open` for bloqueado, faz `location.href = url` como fallback.
- Selo ausente: renderiza placeholder textual, nunca imagem quebrada.
- `localStorage` indisponível: `CookieBanner` mostra o banner e ignora o erro.

## 9. Testes e verificação

- Unit: `lib/__tests__/whatsapp.test.mjs` rodado com `node --test` (via `tsx` ou compilando o módulo): `buildWhatsAppUrl` omite campos vazios, codifica acentos, inclui plano e origem.
- `npm run build` sem erros; `npm run lint` limpo.
- Verificação no browser: `/medsenior` desktop e 400px; `/` continua com Header/Footer; fluxo do form gera link `wa.me` correto; FAQ acessível por teclado; banner de cookies persiste aceite.
- Checagem manual de compliance contra a tabela da seção 2.

## 10. Fora de escopo

Backend de leads, analytics (GA/Pixel — adicionar depois no layout `(landing)`), páginas para outras operadoras, depoimentos.
