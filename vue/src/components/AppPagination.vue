
<template>
  <nav aria-label="Paginação">
    <ul class="pagination">
      <li class="pagination__edge">
        <button type="button" class="pagination__btn" :disabled="isFirst"
                aria-label="Primeira página" @click="goTo(1)">«</button>
      </li>
      <li>
        <button type="button" class="pagination__btn" :disabled="isFirst"
                aria-label="Página anterior" @click="goTo(currentPage - 1)">
          ‹ <span class="pagination__label">Anterior</span>
        </button>
      </li>

      <li v-for="(entry, i) in pages" :key="entry.ellipsis ? `e${i}` : entry.number">
        <span v-if="entry.ellipsis" class="pagination__ellipsis">…</span>
        <button
          v-else
          type="button"
          class="pagination__btn"
          :class="{ 'pagination__btn--active': entry.number === currentPage }"
          :aria-current="entry.number === currentPage ? 'page' : null"
          :aria-label="`Página ${entry.number}`"
          @click="goTo(entry.number)"
        >{{ entry.number }}</button>
      </li>

      <li>
        <button type="button" class="pagination__btn" :disabled="isLast"
                aria-label="Próxima página" @click="goTo(currentPage + 1)">
          <span class="pagination__label">Próxima</span> ›
        </button>
      </li>
      <li class="pagination__edge">
        <button type="button" class="pagination__btn" :disabled="isLast"
                aria-label="Última página" @click="goTo(totalPages)">»</button>
      </li>
    </ul>
    <p class="pagination__status">Página {{ currentPage }} de {{ totalPages }}</p>
  </nav>
</template>

<script>
export default {
  name: 'AppPagination',

  props: {
    totalPages: { type: Number, required: true },
    currentPage: { type: Number, required: true },
    maxVisible: { type: Number, default: 5 }
  },

  emits: ['page-change', 'update:currentPage'],

  computed: {
    isFirst() {
      return this.currentPage <= 1
    },

    isLast() {
      return this.currentPage >= this.totalPages
    },

  
    pages() {
      const total = this.totalPages
      const current = this.currentPage
      const max = this.maxVisible
      const pages = []

      if (total <= max + 2) {
        for (let i = 1; i <= total; i++) pages.push({ number: i })
        return pages
      }

      const half = Math.floor((max - 2) / 2)
      let start = Math.max(2, current - half)
      let end = Math.min(total - 1, current + half)

      if (current - half <= 2) end = Math.min(total - 1, max - 1)
      if (current + half >= total - 1) start = Math.max(2, total - max + 2)

      pages.push({ number: 1 })
      if (start > 2) pages.push({ ellipsis: true })
      for (let i = start; i <= end; i++) pages.push({ number: i })
      if (end < total - 1) pages.push({ ellipsis: true })
      pages.push({ number: total })

      return pages
    }
  },

  methods: {
    goTo(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) return
      this.$emit('page-change', page)
      this.$emit('update:currentPage', page)
    }
  }
}
</script>
