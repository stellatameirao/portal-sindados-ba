
<template>
  <section id="faq" class="card" aria-labelledby="faq-title">
    <div class="card__header">
      <h2 id="faq-title" class="card__title">Dúvidas frequentes</h2>
      <span class="card__tag">Acordeão</span>
    </div>

    <div class="toolbar">
      <label class="field">
        <span class="field__label">Filtrar perguntas</span>
        <input v-model="search" class="input" type="search" placeholder="Ex.: jurídico, LGPD...">
      </label>
    </div>

    
    <AppAccordion
      v-if="filteredFaq.length"
      :items="filteredFaq"
      :initial-open="0"
      single-open
      @toggle="onToggle"
    />
    <div v-else class="empty-state">Nenhuma pergunta encontrada.</div>

    <div class="row" style="margin-top:14px;justify-content:space-between">
      <span class="muted">{{ plural(filteredFaq.length, 'pergunta', 'perguntas') }}</span>
      <div class="row">
        <span class="muted">Ajudou?</span>
        <button type="button" class="btn btn--outline btn--sm" @click="sendFeedback(true)">👍 Sim</button>
        <button type="button" class="btn btn--outline btn--sm" @click="sendFeedback(false)">👎 Não</button>
      </div>
    </div>
  </section>
</template>

<script>
import AppAccordion from '../components/AppAccordion.vue'
import seed from '../data/seed.js'
import { plural } from '../utils/formatters.js'

export default {
  name: 'FaqSection',
  components: { AppAccordion },

  data() {
    return {
      search: '',
      lastOpened: null
    }
  },

  computed: {
    filteredFaq() {
      const term = this.search.trim().toLowerCase()
      if (!term) return seed.faq
      return seed.faq.filter((item) =>
        item.title.toLowerCase().includes(term) || item.content.toLowerCase().includes(term)
      )
    }
  },

  methods: {
    plural,

    onToggle({ item, open }) {
      if (open) this.lastOpened = item.title
    },

    sendFeedback(helpful) {
      if (helpful) this.$toast.success('Obrigado pelo retorno!')
      else this.$toast.info(`Fale com a gente pelo WhatsApp ${seed.org.whatsapp}.`)
    }
  }
}
</script>
