
<template>
  <div class="topbar">
    <div class="topbar__inner">
      <a :href="`tel:${phoneDigits}`">📞 {{ org.phone }}</a>
      <span>💬 WhatsApp {{ org.whatsapp }}</span>
      <a class="topbar__extra" :href="`mailto:${org.email}`">✉️ {{ org.email }}</a>
    </div>
  </div>

  <header class="app-header">
    <div class="app-header__inner">
      <a class="brand" href="#inicio" aria-label="SINDADOS-BA, página inicial">
        <span class="brand__mark" aria-hidden="true">SD</span>
        <span>
          <span class="brand__name">SINDADOS<span>-BA</span></span>
          <span class="brand__tagline">Trabalhadores em TI e Processamento de Dados da Bahia</span>
        </span>
      </a>

      <nav class="main-nav" aria-label="Seções do portal">
        <a v-for="link in sections" :key="link.id" class="main-nav__link" :href="`#${link.id}`">{{ link.label }}</a>
      </nav>

      <div class="header-actions">
        <button type="button" class="saved-badge" aria-label="Notícias salvas" @click="showSaved">
          ★ {{ savedCount }}
        </button>

        
        <div class="mobile-menu">
          <DropdownMenu
            v-model="menuSelected"
            :options="menuOptions"
            placeholder="☰ Menu"
            aria-label="Abrir menu de navegação"
            compact
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import DropdownMenu from '../components/DropdownMenu.vue'
import savedService from '../services/savedService.js'
import seed from '../data/seed.js'

const SECTIONS = [
  { id: 'noticias', label: 'Notícias', icon: '📰' },
  { id: 'associe-se', label: 'Associe-se', icon: '✍️' },
  { id: 'denuncie', label: 'Denuncie!', icon: '📢' },
  { id: 'institucional', label: 'Institucional', icon: '🏛️' },
  { id: 'faq', label: 'Dúvidas', icon: '❓' }
]

export default {
  name: 'AppHeader',
  components: { DropdownMenu },

  data() {
    return {
      org: seed.org,
      sections: SECTIONS,
      menuSelected: null
    }
  },

  computed: {
    phoneDigits() {
      return '+55' + this.org.phone.replace(/\D/g, '')
    },

    savedCount() {
      return savedService.count()
    },

    
    menuOptions() {
      return SECTIONS.map((section) => ({
        value: section.id,
        label: section.label,
        icon: section.icon,
        action: () => this.goTo(section.id)
      }))
    }
  },

  methods: {
    goTo(id) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      
      this.$nextTick(() => { this.menuSelected = null })
    },

    showSaved() {
      const count = this.savedCount
      if (count) this.$toast.info(`Você tem ${count} notícia(s) salva(s) para ler depois.`)
      else this.$toast.info('Nenhuma notícia salva. Use o botão "Salvar" nas notícias.')
    }
  }
}
</script>
