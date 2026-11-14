import { createApp } from 'vue'
import App from './App.vue'
import toastService from './services/toastService.js'
import './assets/styles.css'

const app = createApp(App)


app.config.globalProperties.$toast = toastService

app.mount('#app')
