import { createApp } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'

let routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes // 路由配置
})


// export default router // 这样导出会在全局暴露router

// 为了不在全局上暴露router，可以导出方法，然后让传app进来use
export const initRouter = (app: App<Element>) => {
  app.use(router)
}


// Vue2
// import Vue from 'vue'
// Vue.use(VueRouter)
// use 调用的就是参数上的install方法，或者是直接调用参数，Vue.prototype.$router/$route
