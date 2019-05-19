import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import LoginRegister from './views/LoginRegister';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/join',
      name: 'join',
      component: LoginRegister
    },
    {
      path: '/products',
      name: 'products',
      component: () =>
        import(/* webpackChunkName: 'products' */ './views/Product.vue')
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () =>
        import(/* webpackChunkName: 'transactions' */ './views/History.vue')
    }
  ]
})
