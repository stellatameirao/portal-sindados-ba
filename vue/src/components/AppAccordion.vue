
<template>
  <div class="accordion">
    <div
      v-for="(item, index) in items"
      :key="item.title"
      class="accordion__item"
      :class="{ 'accordion__item--open': isOpen(index) }"
    >
      <button
        type="button"
        class="accordion__header"
        :id="`${uid}-header-${index}`"
        :aria-controls="`${uid}-panel-${index}`"
        :aria-expanded="isOpen(index)"
        @click="toggle(index)"
      >
        <span>{{ item.title }}</span>
        <span class="accordion__icon" aria-hidden="true"></span>
      </button>

      
      <div
        class="accordion__panel"
        role="region"
        :id="`${uid}-panel-${index}`"
        :aria-labelledby="`${uid}-header-${index}`"
        :aria-hidden="!isOpen(index)"
      >
        <div class="accordion__panel-inner">
          <div class="accordion__content">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let counter = 0

export default {
  name: 'AppAccordion',

  props: {
    items: { type: Array, required: true },
    singleOpen: { type: Boolean, default: true },
    initialOpen: { type: Number, default: null }
  },

  emits: ['toggle'],

  data() {
    return {
      uid: `accordion-${++counter}`,
      openIndexes: [] // índices abertos
    }
  },

  created() {
    if (this.initialOpen !== null) {
      this.openIndexes.push(this.initialOpen)
    }
  },

  watch: {
    
    items(newItems) {
      this.openIndexes = this.openIndexes.filter((i) => i < newItems.length)
    }
  },

  methods: {
    isOpen(index) {
      return this.openIndexes.includes(index)
    },

    toggle(index) {
      const willOpen = !this.isOpen(index)

      if (this.singleOpen) {
        this.openIndexes = willOpen ? [index] : []
      } else if (willOpen) {
        this.openIndexes.push(index)
      } else {
        this.openIndexes = this.openIndexes.filter((i) => i !== index)
      }

      this.$emit('toggle', { index, open: willOpen, item: this.items[index] })
    }
  }
}
</script>
