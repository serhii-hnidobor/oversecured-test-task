import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification'
import { LoadingPlugin } from 'vue-loading-overlay'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import 'vue-loading-overlay/dist/css/index.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

const app = createApp(App)

app.use(ToastPlugin)
app.use(router)
app.use(LoadingPlugin)

app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
