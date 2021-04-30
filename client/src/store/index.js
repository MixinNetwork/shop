import Vue from 'vue'
import Vuex from 'vuex'
import Package from './package'

import system from './modules/system'
import user from './modules/user'
import product from './modules/product'
import order from './modules/order'

Vue.use(Vuex)
Package(Vue)

export default new Vuex.Store({
  modules: {
    system,
    user,
    product,
    order
  },
  mutations: {
    changeState(state, [space, obj]) {
      if (typeof obj !== 'object') return
      for (let key in obj) {
        state[space][key] = obj[key]
      }
    },
  },
  actions: {
    initPage({ commit }) {
      let { get } = _vm.$ls
      let user_info = get('user')
      let order = get('order')
      let product = get('product')
      let orderInfo = get('order_info')
      if (user_info) commit('changeState', ['user', { user_info }])
      if (order) commit('changeState', ['order', order])
      if (orderInfo) commit('changeState', ['order', { orderInfo }])
      if (product) commit('changeState', ['product', product])
    }
  }
})
