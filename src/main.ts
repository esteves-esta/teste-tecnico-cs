import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createHttp } from './config/https'

const app = createApp(App)
app.use(createPinia())
app.use(router)
createHttp()

app.mount('#app')
