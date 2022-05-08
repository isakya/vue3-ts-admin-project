import { createApp } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import store from '../store'
import Cookies from 'js-cookie'
import { getAdminInfoApi } from '../request/api'
let routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/home.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes // 路由配置
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 1. token && vuex里面menus(权限列表)为空
  const token = Cookies.get('token')
  if(token && store.state.menus.length === 0) {
    console.log('token存在, menus为空-->重新获取菜单列表数据')
    store.dispatch('getAdminInfo')
    // 抽离方法放到vuex的actions中
    // getAdminInfoApi().then(res => {
    //   if(res.code === 200) {
    //     store.commit('updateMenus', res.data.menus)
    //   }
    // })
  }
  next()
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
