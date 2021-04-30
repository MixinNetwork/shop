import api from '../../api'

export default {
  namespaced: true,
  state: () => ({
    name: "Mixin T 恤",
    price: process.env.VUE_APP_AMOUNT,
    symbol: "XIN",
    asset_id: process.env.VUE_APP_ASSET_ID,
    colorT: 'black',
    color: "black",
    sizeT: "男 XL",
    size: "男 XL",
    style: "Bitcoin",
    styleT: "Bitcoin",
    options: {
      colors: ["black", "blue", "green", "gray", "red"],
      sizes: ["男 XL", "男 2XL", "男 3XL", "男 4XL", "女 S", '女 M', '女 L'],
      style: ["Bitcoin", "XIN"]
    },
    zoomMode: false,
    status: 'ok',
    mainPicIndex: 1,
    noticeModal: false
  }),
  mutations: {
    changeState(state, obj) {
      for (let key in obj) {
        state[key] = obj[key]
      }
    }
  },
  actions: {
    async checkProduct(ctx) {
      let { status, color, size } = await api.getStatus() || {}
      if (!status) return
      let obj = { status }
      if (color) {
        obj = { color, size, ...obj }
        _vm.$ls.set('product', { color, size })
      }
      ctx.commit('changeState', obj)
    }
  },
}