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
      name: 'home',
      component: Home,
      children: [{
        path: 'cart',
        name: 'cart-page',
        component: () => import(/* webpackChunkName: "cart-page" */ './views/Cart.vue')
  
      }]
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
      path: '/admin',
      component: () => import(/* webpackChunkName: "admin-page" */ './views/Admin.vue'),
      children : [{
        path: 'create',
        name:'create-product',
        component: () => import(/* webpackChunkName: "create-product" */ './components/AddDataProduct.vue')
      },{
        path: 'list',
        name: 'list-product',
        component: () => import(/* webpackChunkName: "list-product" */ './components/DataProduct.vue')
      },{
        path: 'update',
        name: 'update-product',
        component: () => import(/* webpackChunkName: "update-product" */ './components/UpdateProduct.vue')
      }]
    },
    {
      path: '/login',
      name: 'login-page',
      component: () => import(/* webpackChunkName: "login-page" */ './views/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register-page',
      component: () => import(/* webpackChunkName: "register-page" */ './views/RegisterPage.vue')

    },
     
   
    
  ]
})
