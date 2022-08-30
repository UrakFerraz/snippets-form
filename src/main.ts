import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './registerServiceWorker'
import '@/assets/style/main.scss'

createApp(App).use(createPinia()).use(router).mount('#app')
