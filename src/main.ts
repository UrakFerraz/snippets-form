import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './assets/css/normalize.css'
import './assets/css/globals.scss'
import './assets/css/_colors.scss'
import './assets/css/main.scss'

createApp(App).use(router).mount('#app')
