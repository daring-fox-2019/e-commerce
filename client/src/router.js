import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // component: Home,
      component: () => import(/* webpackChunkname: "productDetail" */ './views/Products.vue'),
    },
    {
      path: '/transactions',
      name: 'my transaction',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Home,
    },
    {
      path: '/products',
      name: 'products',
      component: () => import(/* webpackChunkname: "product" */ './views/Products.vue'),
      children: [
        {
          path: ':id',
          name: 'detail',
          component: () => import(/* webpackChunkname: "productDetail" */ './views/ProductDetail.vue'),
        },
      ],
    },
    {
      path: '/carts',
      name: 'carts',
      component: () => import(/* webpackChunkname: "cart" */ './views/Cart.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkname: "admin" */ './views/Admin.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkname: "login" */ './views/Register.vue'),
    },
  ],
});
