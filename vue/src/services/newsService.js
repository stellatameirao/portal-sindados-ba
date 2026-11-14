
import seed from '../data/seed.js'
import { dateBR } from '../utils/formatters.js'

function findIn(list, value) {
  return list.find((item) => item.value === value) || list[0]
}

export const getCategory = (value) => findIn(seed.categories, value)
export const getCompany = (value) => findIn(seed.companies, value)


export function queryNews({ search = '', category = 'all', company = 'all', sort = '-date' }) {
  const term = search.trim().toLowerCase()

  const filtered = seed.news.filter((item) => {
    const okCategory = category === 'all' || item.category === category
    const okCompany = company === 'all' || item.company === company
    const okTerm = !term ||
      item.title.toLowerCase().includes(term) ||
      item.summary.toLowerCase().includes(term)
    return okCategory && okCompany && okTerm
  })

  const desc = sort.startsWith('-')
  const field = desc ? sort.slice(1) : sort

  return filtered.sort((a, b) => {
    const cmp = String(a[field]).localeCompare(String(b[field]), 'pt-BR')
    return desc ? -cmp : cmp
  })
}


export function paginate(list, page, pageSize) {
  const totalPages = Math.max(1, Math.ceil(list.length / pageSize))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const start = (currentPage - 1) * pageSize

  return {
    items: list.slice(start, start + pageSize),
    totalItems: list.length,
    totalPages,
    currentPage,
    from: list.length ? start + 1 : 0,
    to: Math.min(start + pageSize, list.length)
  }
}


export function buildDetailTabs(item) {
  const details = [
    `Publicado em: ${dateBR(item.date)}`,
    `Categoria: ${getCategory(item.category).label}`,
    `Empresa/base: ${getCompany(item.company).label}`
  ]
  if (item.place) details.push(`Local: ${item.place}`)

  return [
    {
      id: 'resumo',
      title: 'Resumo',
      content: `${item.summary} Lorem ipsum dolor sit amet, consectetur adipiscing elit, ` +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 'detalhes',
      title: 'Detalhes',
      content: 'Informações da publicação:',
      items: details
    },
    {
      id: 'proximos-passos',
      title: 'O que fazer',
      content: 'Próximos passos para o trabalhador:',
      items: seed.nextSteps[item.category] || seed.nextSteps.default
    }
  ]
}
