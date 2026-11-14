
<template>
  <AppHeader />

  
  <section id="inicio" class="hero">
    <div class="hero__inner">
      <span class="hero__kicker">Sindicato é pra lutar</span>
      <h1 class="hero__title">Unidos por direitos<br>na tecnologia</h1>
      <p class="hero__text">
        O {{ org.shortName }} representa trabalhadoras e trabalhadores de processamento de dados,
        informática e TIC na Bahia. Acompanhe as notícias, associe-se e fale com o sindicato.
      </p>
      <div class="hero__actions">
        <a class="btn btn--red" href="#associe-se">Associe-se</a>
        <a class="btn btn--primary" href="#noticias">Últimas notícias</a>
        <a class="btn btn--light" href="#denuncie">Denuncie!</a>
      </div>
    </div>
  </section>

  <main class="container">
    <div class="grid">
      <NewsSection />
      <MembershipSection />
      <ReportSection />
      <InstitutionalSection />
      <FaqSection />
    </div>
  </main>

  <footer class="app-footer">
    <div class="app-footer__inner">
      <div>
        <p class="app-footer__title">{{ org.shortName }}</p>
        <p>{{ org.address }}</p>
      </div>
      <div>
        <p class="app-footer__title">Contato</p>
        <p>
          Tel.: {{ org.phone }}<br>WhatsApp: {{ org.whatsapp }}<br>
          <a :href="`mailto:${org.email}`">{{ org.email }}</a>
        </p>
      </div>
      <div>
        <p class="app-footer__title">Acesso rápido</p>
        <p><a href="#associe-se">Associe-se</a><br><a href="#denuncie">Denuncie!</a><br><a href="#faq">Dúvidas</a></p>
      </div>
      <p class="app-footer__note">
        Projeto acadêmico (Desafio Extra Vue.js — Engenharia de Software, UCSal), inspirado no site
        do SINDADOS-BA. Notícias e formulários são ilustrativos e não têm vínculo oficial com o sindicato.
        v1.0.0 · {{ currentYear }}
      </p>
    </div>
  </footer>

 
  <ToastContainer />
</template>

<script>
import AppHeader from './sections/AppHeader.vue'
import NewsSection from './sections/NewsSection.vue'
import MembershipSection from './sections/MembershipSection.vue'
import ReportSection from './sections/ReportSection.vue'
import InstitutionalSection from './sections/InstitutionalSection.vue'
import FaqSection from './sections/FaqSection.vue'
import ToastContainer from './components/ToastContainer.vue'
import seed from './data/seed.js'

export default {
  name: 'App',

  components: {
    AppHeader,
    NewsSection,
    MembershipSection,
    ReportSection,
    InstitutionalSection,
    FaqSection,
    ToastContainer
  },

  data() {
    return {
      org: seed.org,
      currentYear: new Date().getFullYear()
    }
  },

 
  mounted() {
    setTimeout(() => {
      this.$toast.success('Bem-vindo(a) ao portal do SINDADOS-BA!', 3500)
    }, 400)
  }
}
</script>
