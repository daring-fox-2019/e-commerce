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
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './components/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: 'register'*/ './components/Register.vue')
    },
    {
      path: '/product',
      name: 'products',
      component: Home,
      children: [
        {
          path: ':id',
          name: 'product details',
          component: () => import(/* webpackChunkName: 'product'*/ './views/ProductDetails.vue')
        }
      ]
      
    },
    {
      path: '/cart',
      name: 'cart',
      component : () => import(/* webpackChunkName: 'cart'*/ '@/views/Cart.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: 'profile'*/ '@/views/Profile.vue')
    }
  ],
});
