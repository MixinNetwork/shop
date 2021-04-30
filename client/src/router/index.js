import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth'),
    meta: { tree: 0 }
  },
  {
    path: '/',
    name: 'Product',
    component: () => import('../views/Product'),
    meta: { tree: 0 }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue'),
    meta: { tree: 1 }
  },
  {
    path: '/manager',
    name: 'Manager',
    component: () => import('../views/Manager.vue'),
    meta: { tree: 1 }
  },
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    component: () => import('../views/OrderDetail.vue'),
    meta: { tree: 2 }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  if (!window._vm) return next()
  store.commit("changeState", ['system', { transitionName: 'slide-none' }]);
  if (store.state.system.canTransition) {
    if (from.meta.tree > to.meta.tree) {
      store.commit("changeState", ['system', { transitionName: 'slide-right' }]);
    }
    if (from.meta.tree < to.meta.tree) {
      store.commit("changeState", ['system', { transitionName: 'slide-left' }]);
    }
    store.commit("changeState", ['system', { canTransition: false }]);
  }
  next()
})


Vue.prototype.MoveTo = function (path) {
  this.$DC("slider");
  this.$router.push(path);
}

export default router
