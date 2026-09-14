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
