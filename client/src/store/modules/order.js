import api from '../../api'

export default {
  namespaced: true,
  state: () => ({
    notes: '',
    name: '',
    phone: '',
    region: {
      province: '',
      city: '',
      area: ''
    },
    address: '',
    orderInfo: {
      order_id: '',
      status: '',
      tracking: '',
      created_at: ''
    }
  }),
  mutations: {
    changeState(state, obj) {
      for (let key in obj) {
        state[key] = obj[key]
      }
    }
  },
  actions: {
    async confirmOrder({ state, rootState }) {
      let { notes, name, phone, region, address } = state
      let params = { notes, name, phone, region, address }
      _vm.$ls.set('order', { notes, name, phone, region, address })
      let { size, color, style } = rootState.product
      params = { ...params, size, color, style }
      if (!notes) return _vm.$message('请填写备注')
      if (!name) return _vm.$message('请填写姓名')
      if (!phone) return _vm.$message('请填写手机')
      if (!region.area) return _vm.$message('请选择地区')
      if (!address) return _vm.$message('请填写地址')
      params.region = Object.values(region).join(' ')
      let data = await api.addOrder(params)
      return data
    },
    async checkPaid({ commit }) {
      let data = await api.checkPaid()
      if (!data) return false
      let { set } = _vm.$ls
      let { address, color, name, notes, phone, region, size, ...orderInfo } = data
      let [province, city, area] = region.split(' ')
      region = { province, city, area }
      commit('changeState', { orderInfo, address, color, name, notes, phone, region, size })
      set('order_info', data)
      set('order', { notes, name, phone, region, address })
      return true
    }
  },
}