import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/login'

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      component : () => import(/* webpackChunkName: "addProduct" */ './views/addProduct.vue')
    },
    {
      path: '/:id/detailPage',
      name: 'detailPage',
      component: () => import(/* webpackChunkName: "productDetail" */ './views/productDetail.vue')
    },
    {
      path: '/register',
      name: 'registerPage',
      component : () => import(/* webpackChunkName: "registerPage" */ './views/register.vue')
    },
    {
      path: '/cart',
      name: 'cartPage',
      component : () => import(/* webpackChunkName: "cartPage" */ './views/cart.vue'),
      children : [
        {
          path : '/cart/total',
          name: 'totalAmount',
          component : () => import( /* webpackChunkName: "totalAmount" */'./views/total.vue')
        }
      ]
    },
  ]
})
