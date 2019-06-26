import Vue from 'vue'
import Router from 'vue-router'

import TheIndex from './views/TheIndex'
import RegisterPage from './views/RegisterPage.vue'
import LoginPage from './views/LoginPage.vue'
import ItemPage from './views/ItemPage.vue'
import ItemPageCreate from './views/ItemPageCreate.vue'
import ItemPageDetail from './views/ItemPageDetail.vue'
import ItemPageEdit from './views/ItemPageEdit.vue'
import CartPage from './views/CartPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: TheIndex
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/item',
      name: 'item',
      component: ItemPage,
      children: [
        {
          path: 'create',
          name: 'item-create',
          component: ItemPageCreate
        },
        {
          path: ':itemId',
          name: 'item-detail',
          component: ItemPageDetail
        },
        {
          path: 'edit/:itemId',
          name: 'item-edit',
          component: ItemPageEdit
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    }
  ]
})
