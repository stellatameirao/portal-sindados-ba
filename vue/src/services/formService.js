
import seed from '../data/seed.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))


const MEMBERSHIP_FIELDS = [
  { key: 'name', label: 'Nome completo' },
  { key: 'email', label: 'E-mail' },
  { key: 'phone', label: 'Telefone' },
  { key: 'company', label: 'Empresa' },
  { key: 'registration', label: 'Matrícula' },
  { key: 'file', label: 'Comprovante de vínculo' },
  { key: 'consent', label: 'Autorização LGPD' }
]


export const memberCompanies = seed.companies.filter((c) => c.value !== 'all' && c.value !== 'geral')
export const reportTypes = seed.reportTypes

export function isValidEmail(value) {
  return EMAIL_REGEX.test(value || '')
}

function isFilled(form, key) {
  if (key === 'email') return isValidEmail(form.email)
  if (key === 'phone') return (form.phone || '').replace(/\D/g, '').length >= 10
  if (key === 'file') return Boolean(form.fileUploaded)
  if (key === 'consent') return form.consent === true
  return Boolean(form[key] && String(form[key]).trim())
}


export function membershipStatus(form) {
  const missing = MEMBERSHIP_FIELDS.filter((field) => !isFilled(form, field.key))
  const done = MEMBERSHIP_FIELDS.length - missing.length

  return {
    percent: Math.round((done / MEMBERSHIP_FIELDS.length) * 100),
    done,
    total: MEMBERSHIP_FIELDS.length,
    missing: missing.map((field) => field.label)
  }
}

export async function submitMembership(form) {
  const status = membershipStatus(form)
  if (status.missing.length) {
    throw new Error(`Preencha: ${status.missing.join(', ')}.`)
  }
  await wait(600)
  return { name: form.name.split(' ')[0] }
}

export async function submitReport(report) {
  if (!report.type) throw new Error('Selecione o tipo de denúncia.')
  if ((report.message || '').trim().length < 20) {
    throw new Error('Descreva a situação com pelo menos 20 caracteres.')
  }
  if (!report.anonymous && !isValidEmail(report.email)) {
    throw new Error('Informe um e-mail válido ou marque a opção anônima.')
  }
  await wait(600)
  return { protocol: `2026-${Math.floor(Math.random() * 90000) + 10000}` }
}
