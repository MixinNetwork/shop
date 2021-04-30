import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import APIS from './api'
import './assets/scss/theme.scss'
import Message from './components/Message'
import Bus from './bus'
import i18n from '@/i18n'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false
Vue.prototype.APIS = APIS
Vue.prototype.$bus = Bus
Vue.use(Message)
Vue.use(VueClipboard)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')