import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './components/Login.vue')
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
      component: () => import(/* webpackChunkName: "login" */ './components/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './components/Register.vue')
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      component: () => import(/* webpackChunkName: "addProduct" */ './components/addProduct.vue')
    },
    {
      path: '/listProduct',
      name: 'listProduct',
      component: () => import(/* webpackChunkName: "addProduct" */ './components/listProduct.vue')
    },
    {
      path: '/editProduct/:id',
      name: 'editproduct',
      component: () => import(/* webpackChunkName: "addProduct" */ './components/editProduct.vue')
    },
    {
      path: '/detailProduct/:id',
      name: 'detailProduct',
      component: () => import(/* webpackChunkName: "addProduct" */ './views/detailProduct.vue')
    },
    {
      path: '/cartProduct',
      name: 'cartProduct',
      component: () => import(/* webpackChunkName: "addProduct" */ './views/cartProduct.vue')
    }
  ]
})
