
<template>
  <div class="tabs">
    <div class="tabs__list" role="tablist" @keydown="onKeydown">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id || tab.title"
        ref="tabButtons"
        type="button"
        role="tab"
        class="tabs__tab"
        :class="{ 'tabs__tab--active': index === activeIndex }"
        :id="`${uid}-tab-${index}`"
        :aria-controls="`${uid}-panel-${index}`"
        :aria-selected="index === activeIndex"
        :tabindex="index === activeIndex ? 0 : -1"
        @click="select(index)"
      >{{ tab.title }}</button>
    </div>

    <div
      v-if="activeTab"
      :key="activeIndex"
      class="tabs__panel"
      role="tabpanel"
      :id="`${uid}-panel-${activeIndex}`"
      :aria-labelledby="`${uid}-tab-${activeIndex}`"
    >
      <p class="tabs__content">{{ activeTab.content }}</p>
      <ul v-if="activeTab.items && activeTab.items.length" class="tabs__items">
        <li v-for="line in activeTab.items" :key="line">{{ line }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
let counter = 0

export default {
  name: 'AppTabs',

  props: {
    tabs: { type: Array, required: true },
    initialIndex: { type: Number, default: 0 }
  },

  emits: ['change'],

  data() {
    return {
      uid: `tabs-${++counter}`,
      activeIndex: this.initialIndex
    }
  },

  computed: {
    activeTab() {
      return this.tabs[this.activeIndex] || null
    }
  },

  watch: {
    
    tabs() {
      this.activeIndex = 0
    }
  },

  methods: {
    select(index) {
      if (index < 0 || index >= this.tabs.length || index === this.activeIndex) return
      this.activeIndex = index
      this.$emit('change', { tab: this.tabs[index], index })
    },

    onKeydown(event) {
      const last = this.tabs.length - 1
      const keys = {
        ArrowRight: this.activeIndex >= last ? 0 : this.activeIndex + 1,
        ArrowLeft: this.activeIndex <= 0 ? last : this.activeIndex - 1,
        Home: 0,
        End: last
      }
      if (!(event.key in keys)) return

      event.preventDefault()
      const next = keys[event.key]
      this.select(next)
      this.$nextTick(() => this.$refs.tabButtons[next]?.focus())
    }
  }
}
</script>
