/**
 * Funções de formatação reutilizadas pelos componentes
 * (equivalentes aos filtros da versão AngularJS).
 */

const DAY = 24 * 60 * 60 * 1000

// 'AAAA-MM-DD' -> meio-dia local (evita erro de fuso horário)
const parseDate = (value) => new Date(`${value}T12:00:00`)

/** 10/11/2026 */
export function dateBR(value) {
  return value ? parseDate(value).toLocaleDateString('pt-BR') : ''
}

/** "hoje", "ontem", "há 5 dias", "há 2 meses"... */
export function relativeDate(value) {
  if (!value) return ''
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  const days = Math.round((today - parseDate(value)) / DAY)

  if (days <= 0) return 'hoje'
  if (days === 1) return 'ontem'
  if (days < 30) return `há ${days} dias`
  const months = Math.floor(days / 30)
  if (months < 12) return months === 1 ? 'há 1 mês' : `há ${months} meses`
  const years = Math.floor(months / 12)
  return years === 1 ? 'há 1 ano' : `há ${years} anos`
}

export function truncate(text, limit = 30) {
  if (!text) return ''
  return text.length > limit ? text.slice(0, limit - 1) + '…' : text
}

export function plural(count, singular, pluralForm) {
  return `${count} ${count === 1 ? singular : pluralForm}`
}
