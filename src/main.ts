// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App);
const pinia = createPinia();

// Active le plugin de persistance
pinia.use(piniaPluginPersistedstate);

// Utilise Pinia
app.use(pinia);

// Utilise les routes
app.use(router);

app.mount('#app');