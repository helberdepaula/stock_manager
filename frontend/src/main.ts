/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { registerPlugins } from '@/plugins'
import { setupTokenRefreshInterceptor } from '@/services/token-refresh'
import { useAuthStore } from '@/store/auth'
import 'unfonts.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
registerPlugins(app)

setupTokenRefreshInterceptor()

const authStore = useAuthStore()
if (authStore.token && !authStore.currentUser) {
  authStore.loadProfile()
}

app.mount('#app')
