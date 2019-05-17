import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import(/* webpackChunkName: "landing" */ './views/Landing.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "Register" */ './views/Register.vue')
    },
    {
      path: '/carts',
      name: 'carts',
      component: () => import(/* webpackChunkName: "Cart" */ './views/Carts.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import(/* webpackChunkName: "Checkout" */ './views/Checkout.vue')
    },
    {
      path: '/products',
      name: 'product',
      component: () => import(/* webpackChunkName: "productcategory" */ './views/ProductPageCategory.vue')
    },
    {
      path: '/products/:id',
      name: 'singleproduct',
      component: () => import(/* webpackChunkName: "productcategory" */ './views/SingleProduct.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
      meta: {
        requiresAuth: true,
        is_admin: true
      },
      children: [{
          path: 'add',
          name: 'add',
          component: () => import(/* webpackChunkName: "addproduct" */ './components/AddProduct.vue'),
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: () => import(/* webpackChunkName: "editproduct" */ './components/AddProduct.vue'),
        },
        {
          path: 'overview',
          name: 'overview',
          component: () => import(/* webpackChunkName: "overview" */ './components/ProductOverviewTable.vue'),
        }
      ]
    }
  ]
})
