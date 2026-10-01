// Envio de e-mail dos formulários de lead, via SMTP próprio (Hostinger).
// As credenciais vêm de variáveis de ambiente — nunca ficam no código.

import nodemailer from 'nodemailer'

const HOST = process.env.SMTP_HOST ?? 'smtp.hostinger.com'
const PORT = Number(process.env.SMTP_PORT ?? 465)
const USER = process.env.SMTP_USER ?? ''
const PASS = process.env.SMTP_PASSWORD ?? ''
const TO = process.env.LEAD_TO ?? 'comercial@excellentsaude.com.br'

/** Sem SMTP configurado o site segue funcionando: o formulário cai no fallback de WhatsApp/mailto. */
export function emailConfigurado(): boolean {
  return Boolean(USER && PASS)
}

export type Lead = {
  origem: string
  campos: Array<[string, string]>
  replyTo?: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function montarTexto(lead: Lead): string {
  const linhas = lead.campos.map(([rotulo, valor]) => `${rotulo}: ${valor}`)
  return [`Novo lead — ${lead.origem}`, '', ...linhas, '', `Recebido em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`].join('\n')
}

function montarHtml(lead: Lead): string {
  const linhas = lead.campos
    .map(
      ([rotulo, valor]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;white-space:nowrap">${escapeHtml(rotulo)}</td><td style="padding:6px 0;color:#111827"><strong>${escapeHtml(valor)}</strong></td></tr>`
    )
    .join('')
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px">
  <h2 style="margin:0 0 4px;color:#0F6B3F">Novo lead</h2>
  <p style="margin:0 0 16px;color:#6b7280">${escapeHtml(lead.origem)}</p>
  <table style="border-collapse:collapse;font-size:15px">${linhas}</table>
  <p style="margin:20px 0 0;font-size:12px;color:#9ca3af">Recebido em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
</div>`
}

export async function enviarLead(lead: Lead): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: PORT === 465,
    auth: { user: USER, pass: PASS },
  })

  await transporter.sendMail({
    from: `"Site Excellent Saúde" <${USER}>`,
    to: TO,
    replyTo: lead.replyTo || undefined,
    subject: `Novo lead — ${lead.origem}`,
    text: montarTexto(lead),
    html: montarHtml(lead),
  })
}
