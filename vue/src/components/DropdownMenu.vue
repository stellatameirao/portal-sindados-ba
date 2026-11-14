
<template>
  <div ref="root" class="dropdown" :class="{ 'dropdown--open': isOpen, 'dropdown--compact': compact }">
    <button
      ref="toggleButton"
      type="button"
      class="dropdown__toggle"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      :aria-label="ariaLabel"
      @click="toggle"
    >
      <span class="dropdown__toggle-text">
        <span v-if="selectedOption?.icon">{{ selectedOption.icon }}&nbsp;</span>
        {{ selectedOption?.label || placeholder }}
      </span>
      <span class="dropdown__caret" aria-hidden="true"></span>
    </button>

    <Transition name="dropdown-fade">
      <ul v-if="isOpen" class="dropdown__menu" role="listbox">
        <li v-for="option in options" :key="option.value" role="presentation">
          <button
            type="button"
            role="option"
            class="dropdown__option"
            :class="{ 'dropdown__option--selected': option.value === modelValue }"
            :aria-selected="option.value === modelValue"
            @click="choose(option)"
          >
            <span v-if="option.icon" aria-hidden="true">{{ option.icon }}</span>
            <span>{{ option.label }}</span>
            <span v-if="option.value === modelValue" class="dropdown__check" aria-hidden="true">✓</span>
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'DropdownMenu',

  props: {
    options: { type: Array, required: true },
    modelValue: { type: [String, Number], default: null },
    placeholder: { type: String, default: 'Selecione...' },
    ariaLabel: { type: String, default: 'Abrir menu' },
    compact: { type: Boolean, default: false }
  },

  emits: ['update:modelValue', 'select'],

  data() {
    return {
      isOpen: false
    }
  },

  computed: {
    selectedOption() {
      return this.options.find((option) => option.value === this.modelValue) || null
    }
  },

  
  mounted() {
    document.addEventListener('click', this.onDocumentClick)
    document.addEventListener('keydown', this.onKeydown)
  },

  
  beforeUnmount() {
    document.removeEventListener('click', this.onDocumentClick)
    document.removeEventListener('keydown', this.onKeydown)
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },

    close() {
      this.isOpen = false
    },

    choose(option) {
      this.$emit('update:modelValue', option.value)
      this.$emit('select', option)
      if (typeof option.action === 'function') option.action(option)
      this.close()
    },

    onDocumentClick(event) {
      if (this.isOpen && !this.$refs.root.contains(event.target)) {
        this.close()
      }
    },

    onKeydown(event) {
      if (this.isOpen && event.key === 'Escape') {
        this.close()
        this.$refs.toggleButton.focus()
      }
    }
  }
}
</script>
