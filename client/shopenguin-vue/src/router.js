import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Item from './views/Item.vue'
import ShoppingCart from './views/ShoppingCart.vue'

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
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "Login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "Register" */ './views/Register.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/add',
      name: 'add-item',
      component: () => import(/* webpackChunkName: "AddItem" */ './views/AddItem.vue')
    },
    {
      path: '/item/:id',
      name: 'item',
      component: () => import(/* webpackChunkName: "Item" */ './views/Item.vue')
    },
    {
      path: '/item/:id/edit',
      name: 'EditItem',
      component: () => import(/* webpackChunkName: "EditItem" */ './views/EditItem.vue')
    },
    {
      path: '/cart',
      name: 'shopping-cart',
      component: ShoppingCart
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
