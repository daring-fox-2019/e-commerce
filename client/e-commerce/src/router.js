import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'redirect',
      component: Home,
    },
    {
      path: '/product',
      name: 'product',
      component: Home,
      children: [
        {
          path: ':id',
          name: 'productdetail',
          component: () => import(/* webpackChunkName: "productdetail" */ './views/ProductDetail.vue'),
        },
      ],
    },
    {
      path: '/my-product',
      name: 'myproduct',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "about" */ './views/MyCardDeck.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
    {
      path: '/add-address/:id',
      name: 'add-address',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/input-product',
      name: 'input-product',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "input-product" */ './views/InputProduct.vue'),
    },
    {
      path: '/manage-product/:id',
      name: 'manage-product',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "input-product" */ './views/InputProduct.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "cart" */ './views/ListCart.vue'),
    },
    {
      path: '/transaction',
      name: 'transaction',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "transaction" */ './views/Transaction.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({ path: '/login', });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
