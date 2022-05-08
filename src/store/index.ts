import { createApp } from 'vue'
import { createStore } from 'vuex'
import { App } from 'vue'
const store = createStore({
  state() {
    return {
      menus: []
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})

export const initStore = (app: App<Element>) => {
  app.use(store)
}