
import { reactive } from 'vue'

const state = reactive({
  ids: []
})

export const savedService = {
  state,

  isSaved(id) {
    return state.ids.includes(id)
  },

  
  toggle(id) {
    const index = state.ids.indexOf(id)
    if (index === -1) {
      state.ids.push(id)
      return true
    }
    state.ids.splice(index, 1)
    return false
  },

  count() {
    return state.ids.length
  }
}

export default savedService
