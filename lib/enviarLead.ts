// Cliente dos formulários: posta o lead na API e informa se o e-mail saiu.
// Se a API não estiver configurada ou falhar, o formulário usa o fallback (WhatsApp/mailto).

export type LeadPayload = {
  origem: string
  nome: string
  email?: string
  campos: Array<[string, string]>
  website?: string
}

export async function postLead(payload: LeadPayload): Promise<boolean> {
  try {
    const resposta = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const dados = (await resposta.json().catch(() => ({}))) as { ok?: boolean }
    return resposta.ok && dados.ok === true
  } catch {
    return false
  }
}
