import { createApp } from 'vue'
import { createStore } from 'vuex'
import { App } from 'vue'

interface MenuObj {
  parentId: number,
  id: number,
  children?: MenuObj[]
}
interface State {
  menus: MenuObj[]
}
interface NewMenus {
  [key: number]: MenuObj
}
const store = createStore<State>({
  state() {
    return {
      menus: [{"id":1,"parentId":0,"createTime":"2020-02-02T06:50:36.000+00:00","title":"商品","level":0,"sort":0,"name":"pms","icon":"product","hidden":0},{"id":2,"parentId":1,"createTime":"2020-02-02T06:51:50.000+00:00","title":"商品列表","level":1,"sort":0,"name":"product","icon":"product-list","hidden":0},{"id":3,"parentId":1,"createTime":"2020-02-02T06:52:44.000+00:00","title":"添加商品","level":1,"sort":0,"name":"addProduct","icon":"product-add","hidden":0},{"id":4,"parentId":1,"createTime":"2020-02-02T06:53:51.000+00:00","title":"商品分类","level":1,"sort":0,"name":"productCate","icon":"product-cate","hidden":0},{"id":5,"parentId":1,"createTime":"2020-02-02T06:54:51.000+00:00","title":"商品类型","level":1,"sort":0,"name":"productAttr","icon":"product-attr","hidden":0},{"id":6,"parentId":7,"createTime":"2020-02-02T06:56:29.000+00:00","title":"品牌管理","level":1,"sort":0,"name":"brand","icon":"product-brand","hidden":0},{"id":7,"parentId":0,"createTime":"2020-02-02T08:54:07.000+00:00","title":"订单","level":0,"sort":0,"name":"oms","icon":"order","hidden":0},{"id":8,"parentId":7,"createTime":"2020-02-02T08:55:18.000+00:00","title":"订单列表","level":1,"sort":0,"name":"order","icon":"product-list","hidden":0},{"id":9,"parentId":7,"createTime":"2020-02-02T08:56:46.000+00:00","title":"订单设置","level":1,"sort":0,"name":"orderSetting","icon":"order-setting","hidden":0},{"id":10,"parentId":7,"createTime":"2020-02-02T08:57:39.000+00:00","title":"退货申请处理","level":1,"sort":0,"name":"returnApply","icon":"order-return","hidden":0},{"id":11,"parentId":7,"createTime":"2020-02-02T08:59:40.000+00:00","title":"退货原因设置","level":1,"sort":0,"name":"returnReason","icon":"order-return-reason","hidden":0}]
    }
  },
  getters: {
    getNewMenus(state) {
      const newMenus:NewMenus  = {}
      // 获取旧菜单
      const menus = state.menus
      for(let i = 0; i < menus.length; i++) {
        if(menus[i].parentId === 0) {
          // 一级菜单对象
          newMenus[menus[i].id] = { ...newMenus[menus[i].id], ...menus[i] }
        } else {
          // 二级菜单
          let parentId = menus[i].parentId
          newMenus[parentId] = newMenus[parentId] || {}
          newMenus[parentId].children = newMenus[parentId].children || []
          newMenus[parentId].children?.push(menus[i])
        }
      }
      return newMenus
    }
  },
  mutations: {
    updateMenus(state, menus) {
      state.menus = menus
    }
  },
  actions: {},
  modules: {}
})

export const initStore = (app: App<Element>) => {
  app.use(store)
}