import { createApp } from 'vue'
import App from './App.vue'
import { initRouter } from './router'
import { initStore } from './store'


const app = createApp(App)
// 初始化路由
initRouter(app)
// 初始化vuex
initStore(app)
// app.use(router)
app.mount('#app')
