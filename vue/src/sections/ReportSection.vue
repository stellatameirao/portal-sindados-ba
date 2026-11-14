
<template>
  <section id="denuncie" class="card card--alert" aria-labelledby="report-title">
    <div class="card__header">
      <h2 id="report-title" class="card__title">Denuncie!</h2>
      <span class="card__tag">Notificação toast</span>
    </div>
    <p class="card__description">
      Relate irregularidades no seu local de trabalho. O retorno aparece em notificações no canto da tela.
    </p>

    <form class="stack" novalidate @submit.prevent="submit">
      <div class="form-grid">
        <div class="field">
          <span class="field__label">Tipo *</span>
          <DropdownMenu v-model="report.type" :options="reportTypes"
                        placeholder="Selecione o tipo" aria-label="Tipo de denúncia" />
        </div>
        <div class="field">
          <span class="field__label">Empresa (opcional)</span>
          <DropdownMenu v-model="report.company" :options="companies"
                        placeholder="Não informar" aria-label="Empresa da denúncia" />
        </div>
      </div>

      <label class="field">
        <span class="field__label">Descreva a situação *</span>
        <textarea v-model="report.message" class="textarea" :maxlength="maxLength"
                  placeholder="O que aconteceu, quando e onde (sem expor colegas)."></textarea>
        <span class="field__hint">{{ remaining }} caracteres restantes</span>
      </label>

      <label class="checkbox">
        <input v-model="report.anonymous" type="checkbox">
        <span>Enviar de forma anônima</span>
      </label>

      <label v-if="!report.anonymous" class="field">
        <span class="field__label">E-mail para retorno *</span>
        <input v-model.trim="report.email" class="input" type="email">
      </label>

      <div class="row">
        <button type="submit" class="btn btn--red" :disabled="sending">
          {{ sending ? 'Enviando...' : 'Enviar denúncia' }}
        </button>
        <span v-if="lastProtocol" class="muted">Último protocolo: <strong>{{ lastProtocol }}</strong></span>
      </div>
    </form>
  </section>
</template>

<script>
import DropdownMenu from '../components/DropdownMenu.vue'
import { reportTypes, memberCompanies, submitReport } from '../services/formService.js'

const emptyReport = () => ({ type: null, company: null, message: '', anonymous: true, email: '' })

export default {
  name: 'ReportSection',
  components: { DropdownMenu },

  data() {
    return {
      maxLength: 500,
      reportTypes,
      companies: memberCompanies,
      report: emptyReport(),
      sending: false,
      lastProtocol: null
    }
  },

  computed: {
    remaining() {
      return this.maxLength - this.report.message.length
    }
  },

  watch: {
    'report.anonymous'(anonymous) {
      if (anonymous) {
        this.report.email = ''
        this.$toast.info('Sua identidade não será registrada.', 2500)
      }
    }
  },

  methods: {
    async submit() {
      this.sending = true
      try {
        const { protocol } = await submitReport(this.report)
        this.lastProtocol = protocol
        this.$toast.success(`Denúncia registrada. Protocolo nº ${protocol}.`, 7000)
        this.report = emptyReport()
      } catch (error) {
        this.$toast.warning(error.message, 5000)
      } finally {
        this.sending = false
      }
    }
  }
}
</script>
