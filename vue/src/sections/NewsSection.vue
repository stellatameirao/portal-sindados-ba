
<template>
  <section id="noticias" class="card span-full" aria-labelledby="news-title">
    <div class="card__header">
      <h2 id="news-title" class="card__title">Notícias</h2>
      <span class="card__tag">Menu suspenso · Paginação · Abas</span>
    </div>

    <div class="news-layout">
      
      <div>
        <div class="toolbar">
          <label class="field">
            <span class="field__label">Buscar</span>
            <input
              v-model="filters.search"
              class="input"
              type="search"
              placeholder="Ex.: assembleia, acordo, Serpro..."
            >
          </label>

          <div class="field">
            <span class="field__label">Categoria</span>
            
            <DropdownMenu v-model="filters.category" :options="categories"
                          aria-label="Filtrar por categoria" @select="notify('Categoria', $event)" />
          </div>

          <div class="field">
            <span class="field__label">Empresa</span>
            <DropdownMenu v-model="filters.company" :options="companies"
                          aria-label="Filtrar por empresa" @select="notify('Empresa', $event)" />
          </div>

          <div class="field">
            <span class="field__label">Ordenar</span>
            <DropdownMenu v-model="filters.sort" :options="sortOptions" aria-label="Ordenar notícias" />
          </div>

          <label class="field" style="flex: 0 0 96px;">
            <span class="field__label">Por página</span>
            <select v-model.number="pageSize" class="select">
              <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
            </select>
          </label>
        </div>

        <p class="result-info">
          <span>Exibindo {{ result.from }}–{{ result.to }} de {{ plural(result.totalItems, 'notícia', 'notícias') }}</span>
          <span v-if="filters.search">para “{{ filters.search }}”</span>
          <button v-if="hasActiveFilters" type="button" class="btn btn--ghost btn--sm" @click="clearFilters">
            ✕ limpar filtros
          </button>
        </p>

        <div v-if="result.items.length" class="news-grid">
          <button
            v-for="item in result.items"
            :id="`noticia-${item.id}`"
            :key="item.id"
            type="button"
            class="news-card"
            :class="{ 'news-card--active': selected && selected.id === item.id }"
            @click="selected = item"
          >
            <span class="news-card__meta">
              <span class="chip" :class="{ 'chip--red': item.category === 'assembleias' || item.category === 'juridico' }">
                {{ categoryOf(item).icon }} {{ categoryOf(item).label }}
              </span>
              <span>{{ dateBR(item.date) }} · {{ relativeDate(item.date) }}</span>
            </span>
            <span class="news-card__title">{{ item.title }}</span>
            <span class="muted">{{ truncate(item.summary, 90) }}</span>
          </button>
        </div>

        <div v-else class="empty-state">Nenhuma notícia encontrada com esses filtros.</div>

        
        <AppPagination
          v-if="result.totalItems"
          :total-pages="result.totalPages"
          :current-page="result.currentPage"
          @page-change="currentPage = $event"
        />
      </div>

      
      <aside class="details" aria-label="Notícia selecionada">
        <div v-if="selected">
          <div class="row">
            <span class="chip">{{ companyOf(selected).label }}</span>
            <span class="muted">{{ dateBR(selected.date) }}</span>
          </div>
          <h3 class="details__title">{{ selected.title }}</h3>

          
          <AppTabs :tabs="detailTabs" />

          <div class="details__actions">
            <button type="button" class="btn" :class="isSaved ? 'btn--primary' : 'btn--outline'" @click="toggleSaved">
              {{ isSaved ? '★ Salva' : '☆ Salvar' }}
            </button>
            <button type="button" class="btn btn--outline" @click="share">🔗 Copiar link</button>
          </div>
        </div>
        <p v-else class="muted">Selecione uma notícia para ler.</p>
      </aside>
    </div>
  </section>
</template>

<script>
import DropdownMenu from '../components/DropdownMenu.vue'
import AppPagination from '../components/AppPagination.vue'
import AppTabs from '../components/AppTabs.vue'
import savedService from '../services/savedService.js'
import seed from '../data/seed.js'
import { queryNews, paginate, buildDetailTabs, getCategory, getCompany } from '../services/newsService.js'
import { dateBR, relativeDate, truncate, plural } from '../utils/formatters.js'

const DEFAULT_FILTERS = { search: '', category: 'all', company: 'all', sort: '-date' }

export default {
  name: 'NewsSection',
  components: { DropdownMenu, AppPagination, AppTabs },

  data() {
    return {
      categories: seed.categories,
      companies: seed.companies,
      sortOptions: seed.sortOptions,
      pageSizes: [4, 6, 8],
      filters: { ...DEFAULT_FILTERS },
      currentPage: 1,
      pageSize: 4,
      selected: null
    }
  },

  computed: {
    filteredNews() {
      return queryNews(this.filters)
    },

    
    result() {
      return paginate(this.filteredNews, this.currentPage, this.pageSize)
    },

    detailTabs() {
      return this.selected ? buildDetailTabs(this.selected) : []
    },

    isSaved() {
      return this.selected ? savedService.isSaved(this.selected.id) : false
    },

    hasActiveFilters() {
      return Object.keys(DEFAULT_FILTERS).some((key) => this.filters[key] !== DEFAULT_FILTERS[key])
    }
  },

  watch: {
    
    filters: {
      deep: true,
      handler() { this.currentPage = 1 }
    },
    pageSize() {
      this.currentPage = 1
    }
  },

  
  created() {
    this.selected = this.result.items[0] || null
  },

  methods: {
    dateBR,
    relativeDate,
    truncate,
    plural,

    categoryOf(item) {
      return getCategory(item.category)
    },

    companyOf(item) {
      return getCompany(item.company)
    },

    notify(kind, option) {
      this.$toast.info(`${kind}: ${option.label}.`, 2500)
    },

    clearFilters() {
      this.filters = { ...DEFAULT_FILTERS }
      this.$toast.info('Filtros limpos.', 2500)
    },

    toggleSaved() {
      const saved = savedService.toggle(this.selected.id)
      if (saved) this.$toast.success('Notícia salva para ler depois.')
      else this.$toast.warning('Notícia removida dos salvos.')
    },

    async share() {
      const link = `${window.location.href.split('#')[0]}#noticia-${this.selected.id}`
      try {
        await navigator.clipboard.writeText(link)
        this.$toast.success('Link copiado para a área de transferência.')
      } catch {
        this.$toast.error('Não foi possível copiar o link.')
      }
    }
  }
}
</script>
