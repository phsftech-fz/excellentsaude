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
