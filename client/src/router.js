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
      alias: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/cart',
          name: 'cart',
          component: () => import(/* webpackChunkName: "about" */ './views/Cart.vue')
        },
      ]     
    },    
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
    },
    
    {
      path: '/about',
      name: 'about',     
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/edit-product',
      name: 'edit-product',     
      component: () => import(/* webpackChunkName: "about" */ './views/ProductEdit.vue')
    }

  ]
})
