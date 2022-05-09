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
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import('../views/home/home.vue')
  // },
  // {
  //   path: '/pms',
  //   name: 'pms',
  //   component: () => import('../views/home/home.vue'),
  //   children: [
  //     {
  //       path: 'product',
  //       name: 'product',
  //       component: () => import('../views/pms/product.vue'),
  //     }
  //   ]
  // }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes // 路由配置
})

// 根据getters里面的菜单对象生成路由规则
const genRoutes = () => {
   // 动态菜单设置
   const menus = store.getters.getNewMenus
   // 循环菜单对象,设置动态菜单
   for(let key in menus) {
     const newRoute: RouteRecordRaw = {
       path: '/' + menus[key].name,
       name: menus[key].name,
       component: () => import('../views/home/home.vue'),
       // 重定向到二级路由
       redirect: '/' + menus[key].name + '/' + menus[key].children[0].name,
       children: []
     }
     for(let i = 0; i < menus[key].children.length; i++) {
       let name =  menus[key].children[i].name
       newRoute.children?.push({
         path: name,
         name: name,
         component: () => import(`../views/${menus[key].name}/${name}.vue`),
         children: []
       })
     }
     // 动态添加路由规则
     router.addRoute(newRoute)
   }
   // 动态添加首页
   router.addRoute({
     path: '/',
     name: 'home',
     component: () => import('../views/home/home.vue'),
     // 重定向到二级路由
     redirect: '/index',
     children: [
       {
         path: 'index',
         name: 'index',
         component: () => import('../views/index/index.vue')
       }
     ]
   })
}


// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 1. token && vuex里面menus(权限列表)为空
  const token = Cookies.get('token')
  if(token && store.state.menus.length === 0) {
    console.log('token存在, menus为空-->重新获取菜单列表数据')
    // 异步
    store.dispatch('getAdminInfo').then(() => {
      // 动态添加路由规则
      genRoutes()
      next(to)
    })
  } else if(token && store.state.menus.length !== 0 && from.path === '/login' && to.path === '/home') {
    // 动态添加路由规则
    genRoutes()
    next('/index')
  } else if(!token && to.path !== '/login') {
    next('/login')
  } else if(token && to.path === '/login') {
    next('/index')
  } else {
    next()
  }
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
