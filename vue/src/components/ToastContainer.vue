
<template>
  <div class="toast-container" aria-live="polite">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="`toast--${toast.type}`"
        role="status"
      >
        <span class="toast__icon" aria-hidden="true">{{ icons[toast.type] }}</span>
        <div class="toast__body">
          <p class="toast__title">{{ toast.title }}</p>
          <p class="toast__message">{{ toast.message }}</p>
        </div>
        <button type="button" class="toast__close" aria-label="Fechar notificação"
                @click="dismiss(toast.id)">&times;</button>
        <span
          v-if="toast.duration > 0"
          class="toast__timer"
          :style="{ animationDuration: toast.duration + 'ms' }"
        ></span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import toastService from '../services/toastService.js'

export default {
  name: 'ToastContainer',

  data() {
    return {
      icons: { success: '✓', error: '✕', warning: '!', info: 'i' }
    }
  },

  computed: {
    
    toasts() {
      return toastService.state.toasts
    }
  },

  methods: {
    dismiss(id) {
      toastService.dismiss(id)
    }
  }
}
</script>
