import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import { createPinia } from 'pinia' // ✅ Add this

const app = createApp(App)

app.use(createPinia()) // ✅ Register Pinia
app.use(router)
app.mount('#app')
