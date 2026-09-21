import { createApp } from 'vue'
import './style.css'
import { Quasar } from 'quasar'
import App from './App.vue'
import { router } from './routes/routes.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(Quasar, { plugins: {} })
app.use(pinia)
app.use(router)

app.mount('#app')