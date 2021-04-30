import api from '../../api'

export default {
  namespaced: true,
  state: () => ({
    token: '',
    user_info: {}
  }),
  mutations: {
    changeState(state, obj) {
      for (let key in obj) {
        state[key] = obj[key]
      }
    }
  },
  actions: {
    async authenticate(ctx, code) {
      let { set, get } = _vm.$ls
      let user = get('user')
      if (!user) _vm.$DC({ loading: true })
      user = await api.authenticate(code)
      if (!user.access_token) return false
      let { access_token, ...user_info } = user
      ctx.commit('changeState', { user_info })
      set('token', access_token)
      set('user', user_info)
      _vm.$DC({ loading: false })
      return true
    }
  },
}