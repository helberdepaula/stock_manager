/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Styles
import "unfonts.css";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import SucessToast from "./components/Toast/SucessToast.vue";

const pinia = createPinia();

//presistindo no localStorage
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(pinia)
registerPlugins(app);

app.mount("#app");
