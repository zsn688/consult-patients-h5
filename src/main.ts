import { createApp } from 'vue'
import { pinia } from './stores'

import App from './App.vue'
import router from './router'

import 'vant/lib/index.css'
import '@/styles/reset.css'
import './styles/main.scss'

import 'virtual:svg-icons-register'

//加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false
})

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
