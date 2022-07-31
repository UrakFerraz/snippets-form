import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './registerServiceWorker'
import './assets/css/normalize.css'
import './assets/css/globals.scss'
import './assets/css/_colors.scss'
import './assets/css/main.scss'

createApp(App).use(createPinia()).use(router).mount('#app')
