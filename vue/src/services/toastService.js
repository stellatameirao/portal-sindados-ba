
import { reactive } from 'vue'

const DEFAULT_DURATION = 4000
const MAX_TOASTS = 5

const TITLES = {
  success: 'Sucesso',
  error: 'Erro',
  warning: 'Atenção',
  info: 'Informação'
}

const state = reactive({
  toasts: []
})

const timers = new Map()
let nextId = 1

function show(message, type = 'info', duration = DEFAULT_DURATION) {
  const safeType = TITLES[type] ? type : 'info'
  const toast = {
    id: nextId++,
    type: safeType,
    title: TITLES[safeType],
    message,
    duration
  }

  state.toasts.push(toast)

  if (state.toasts.length > MAX_TOASTS) {
    dismiss(state.toasts[0].id)
  }

  if (duration > 0) {
    timers.set(toast.id, setTimeout(() => dismiss(toast.id), duration))
  }

  return toast.id
}

function dismiss(id) {
  clearTimeout(timers.get(id))
  timers.delete(id)

  const index = state.toasts.findIndex((toast) => toast.id === id)
  if (index !== -1) state.toasts.splice(index, 1)
}

function clear() {
  state.toasts.map((toast) => toast.id).forEach(dismiss)
}

export const toastService = {
  state,
  show,
  dismiss,
  clear,
  success: (message, duration) => show(message, 'success', duration),
  error: (message, duration) => show(message, 'error', duration),
  warning: (message, duration) => show(message, 'warning', duration),
  info: (message, duration) => show(message, 'info', duration)
}

export default toastService
