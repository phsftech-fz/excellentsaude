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
  assert.doesNotMatch(url, /\n/)
  assert.ok(url.includes('%0A'), 'quebras de linha devem ser codificadas')
})
