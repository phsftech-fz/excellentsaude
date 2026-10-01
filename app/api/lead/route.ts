import { NextResponse } from 'next/server'
import { emailConfigurado, enviarLead } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Limite simples por IP: 20 envios a cada 10 minutos, em memória do processo.
const JANELA_MS = 10 * 60 * 1000
const LIMITE = 20
const historico = new Map<string, number[]>()

function excedeuLimite(ip: string): boolean {
  const agora = Date.now()
  const anteriores = (historico.get(ip) ?? []).filter((t) => agora - t < JANELA_MS)
  anteriores.push(agora)
  historico.set(ip, anteriores)
  if (historico.size > 500) {
    for (const [chave, marcas] of historico) {
      if (marcas.every((t) => agora - t >= JANELA_MS)) historico.delete(chave)
    }
  }
  return anteriores.length > LIMITE
}

function texto(valor: unknown, max = 500): string {
  return typeof valor === 'string' ? valor.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  if (!emailConfigurado()) {
    // Sem SMTP configurado o cliente usa o fallback (WhatsApp / rascunho de e-mail).
    return NextResponse.json({ ok: false, motivo: 'nao-configurado' }, { status: 503 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'desconhecido'
  if (excedeuLimite(ip)) {
    return NextResponse.json({ ok: false, motivo: 'limite' }, { status: 429 })
  }

  let corpo: Record<string, unknown>
  try {
    corpo = await request.json()
  } catch {
    return NextResponse.json({ ok: false, motivo: 'json-invalido' }, { status: 400 })
  }

  // Honeypot: campo invisível que só um robô preenche.
  if (texto(corpo.website)) {
    return NextResponse.json({ ok: true })
  }

  const origem = texto(corpo.origem, 80) || 'Site'
  const nome = texto(corpo.nome, 120)
  const campos = Array.isArray(corpo.campos)
    ? (corpo.campos as unknown[])
        .map((item) => (Array.isArray(item) ? [texto(item[0], 60), texto(item[1])] as [string, string] : null))
        .filter((par): par is [string, string] => Boolean(par && par[0] && par[1]))
        .slice(0, 20)
    : []

  if (nome.length < 2 || campos.length === 0) {
    return NextResponse.json({ ok: false, motivo: 'dados-invalidos' }, { status: 400 })
  }

  const emailLead = texto(corpo.email, 160)
  const replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLead) ? emailLead : undefined

  try {
    await enviarLead({ origem, campos, replyTo })
    return NextResponse.json({ ok: true })
  } catch (erro) {
    console.error('[lead] falha no envio:', erro)
    return NextResponse.json({ ok: false, motivo: 'falha-envio' }, { status: 502 })
  }
}
