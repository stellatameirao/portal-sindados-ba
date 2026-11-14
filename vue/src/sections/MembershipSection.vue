
<template>
  <section id="associe-se" class="card" aria-labelledby="member-title">
    <div class="card__header">
      <h2 id="member-title" class="card__title">Associe-se</h2>
      <span class="card__tag">Barra de progresso</span>
    </div>
    <p class="card__description">Preencha a ficha de filiação. A barra mostra quanto falta para concluir.</p>

    <form class="stack" novalidate @submit.prevent="submit">
      
      <ProgressBar
        :value="status.percent"
        :label="`Ficha: ${status.done} de ${status.total} itens`"
        :variant="status.percent === 100 ? 'success' : 'primary'"
      />

      <div class="form-grid">
        <label class="field" style="grid-column: 1 / -1;">
          <span class="field__label">Nome completo *</span>
          <input v-model="form.name" class="input" type="text" autocomplete="name"
                 :class="{ 'input--invalid': touched.name && !form.name }" @blur="touched.name = true">
        </label>

        <label class="field">
          <span class="field__label">E-mail *</span>
          <input v-model.trim="form.email" class="input" type="email" autocomplete="email"
                 :class="{ 'input--invalid': emailInvalid }" @blur="touched.email = true">
          <span v-if="emailInvalid" class="field__hint field__hint--error">E-mail inválido</span>
        </label>

        <label class="field">
          <span class="field__label">Telefone / WhatsApp *</span>
          <input v-model="form.phone" class="input" type="tel" autocomplete="tel" placeholder="(71) 90000-0000">
        </label>

        <div class="field">
          <span class="field__label">Empresa *</span>
          <DropdownMenu v-model="form.company" :options="companies"
                        placeholder="Selecione a empresa" aria-label="Empresa onde trabalha" />
        </div>

        <label class="field">
          <span class="field__label">Matrícula *</span>
          <input v-model="form.registration" class="input" type="text">
        </label>
      </div>

      <div class="field">
        <span class="field__label">Comprovante de vínculo (contracheque ou crachá) *</span>
        <input ref="fileInput" class="file-input" type="file" accept=".pdf,.jpg,.jpeg,.png"
               :disabled="upload.status === 'uploading'" @change="onFileSelected">
        
        <ProgressBar
          :value="upload.progress"
          :label="truncate(uploadLabel, 40)"
          :variant="uploadVariant"
          :striped="upload.status === 'uploading'"
        />
      </div>

      <label class="checkbox">
        <input v-model="form.consent" type="checkbox">
        <span>Autorizo o uso dos meus dados para fins de filiação, conforme a LGPD. *</span>
      </label>

      <p v-if="status.missing.length" class="field__hint">Falta: {{ status.missing.join(', ') }}</p>

      <div class="row">
        <button type="submit" class="btn btn--red" :disabled="sending">
          {{ sending ? 'Enviando...' : 'Enviar ficha' }}
        </button>
        <button type="button" class="btn btn--outline" @click="clear">Limpar</button>
      </div>
    </form>
  </section>
</template>

<script>
import ProgressBar from '../components/ProgressBar.vue'
import DropdownMenu from '../components/DropdownMenu.vue'
import { startUpload } from '../services/uploadService.js'
import { memberCompanies, membershipStatus, submitMembership, isValidEmail } from '../services/formService.js'
import { truncate } from '../utils/formatters.js'

const MAX_FILE_MB = 5

const emptyForm = () => ({
  name: '',
  email: '',
  phone: '',
  company: null,
  registration: '',
  fileName: '',
  fileUploaded: false,
  consent: false
})

export default {
  name: 'MembershipSection',
  components: { ProgressBar, DropdownMenu },

  data() {
    return {
      companies: memberCompanies,
      form: emptyForm(),
      upload: { progress: 0, status: 'idle' }, 
      currentUpload: null,
      sending: false,
      touched: {}
    }
  },

  computed: {
    
    status() {
      return membershipStatus(this.form)
    },

    emailInvalid() {
      return this.touched.email && !isValidEmail(this.form.email)
    },

    uploadLabel() {
      return {
        idle: 'Nenhum arquivo enviado',
        uploading: `Enviando ${this.form.fileName}...`,
        done: 'Comprovante enviado',
        error: 'Falha no envio — tente novamente'
      }[this.upload.status]
    },

    uploadVariant() {
      if (this.upload.status === 'error') return 'error'
      if (this.upload.status === 'done') return 'success'
      return 'primary'
    }
  },

  
  beforeUnmount() {
    this.currentUpload?.cancel()
  },

  methods: {
    truncate,

    onFileSelected(event) {
      const file = event.target.files[0]
      if (!file) return

      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        this.$toast.error(`Arquivo maior que ${MAX_FILE_MB} MB.`)
        return
      }

      this.form.fileName = file.name
      this.form.fileUploaded = false
      this.upload = { progress: 0, status: 'uploading' }

      this.currentUpload = startUpload(file.name, {
        onProgress: (value) => { this.upload.progress = value }
      })

      this.currentUpload.promise
        .then(() => {
          this.upload = { progress: 100, status: 'done' }
          this.form.fileUploaded = true
          this.$toast.success(`Comprovante "${file.name}" enviado.`)
        })
        .catch((error) => {
          this.upload.status = 'error'
          this.$toast.error(`Erro ao enviar o comprovante: ${error.reason}.`)
        })
    },

    async submit() {
      this.touched = { name: true, email: true }
      this.sending = true
      try {
        const result = await submitMembership(this.form)
        this.$toast.success(`Obrigado, ${result.name}! Sua ficha foi enviada. Entraremos em contato.`, 6000)
        this.reset()
      } catch (error) {
        this.$toast.error(error.message, 6000)
      } finally {
        this.sending = false
      }
    },

    clear() {
      this.reset()
      this.$toast.info('Ficha limpa.')
    },

    reset() {
      this.currentUpload?.cancel()
      this.form = emptyForm()
      this.upload = { progress: 0, status: 'idle' }
      this.touched = {}
      this.$refs.fileInput.value = ''
    }
  }
}
</script>
