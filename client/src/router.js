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
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import(/* webpackChunkname: "product" */ './views/Products.vue'),
    },
    {
      path: '/carts',
      name: 'products',
      component: () => import(/* webpackChunkname: "product" */ './views/Cart.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkname: "product" */ './views/Admin.vue'),
    },
  ],
});
