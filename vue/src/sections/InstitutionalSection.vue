
<template>
  <section id="institucional" class="card" aria-labelledby="inst-title">
    <div class="card__header">
      <h2 id="inst-title" class="card__title">Institucional</h2>
      <span class="card__tag">Abas</span>
    </div>
    <p class="card__description">{{ org.fullName }}.</p>

    
    <AppTabs :tabs="tabs" @change="lastSeen = $event.tab.title" />
  </section>
</template>

<script>
import AppTabs from '../components/AppTabs.vue'
import seed from '../data/seed.js'

export default {
  name: 'InstitutionalSection',
  components: { AppTabs },

  data() {
    const org = seed.org
    return {
      org,
      lastSeen: null,
      tabs: [
        ...seed.institutionalTabs,
        {
          id: 'contato',
          title: 'Contato',
          content: 'Fale com o sindicato pelos canais abaixo:',
          items: [
            `Telefone: ${org.phone}`,
            `WhatsApp: ${org.whatsapp}`,
            `E-mail: ${org.email}`,
            `Endereço: ${org.address}`
          ]
        }
      ]
    }
  }
}
</script>
