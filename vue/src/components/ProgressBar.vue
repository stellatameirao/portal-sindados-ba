
<template>
  <div class="progress" :class="[`progress--${currentVariant}`, { 'progress--striped': striped }]">
    <div v-if="label || showValue" class="progress__top">
      <span class="progress__label">{{ label }}</span>
      <span v-if="showValue" class="progress__value">{{ percentText }}</span>
    </div>
    <div
      class="progress__track"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="Math.round(percent)"
      :aria-label="label || 'Progresso'"
    >
      <div class="progress__fill" :style="{ width: percent + '%' }"></div>
    </div>
  </div>
</template>

<script>
const VARIANTS = ['primary', 'success', 'warning', 'error', 'auto']

export default {
  name: 'ProgressBar',

  props: {
    value: { type: Number, default: 0 },
    label: { type: String, default: '' },
    showValue: { type: Boolean, default: true },
    variant: {
      type: String,
      default: 'primary',
      validator: (v) => VARIANTS.includes(v)
    },
    striped: { type: Boolean, default: false }
  },

  computed: {
    
    percent() {
      const number = Number(this.value)
      if (Number.isNaN(number)) return 0
      return Math.min(100, Math.max(0, number))
    },

    percentText() {
      return `${Math.round(this.percent)}%`
    },

    currentVariant() {
      if (this.variant !== 'auto') return this.variant
      if (this.percent >= 80) return 'error'
      if (this.percent >= 50) return 'warning'
      return 'success'
    }
  }
}
</script>
