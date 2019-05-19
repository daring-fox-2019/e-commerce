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
      path: '/products/:id',
      component: () => import(/* webpackChunkName: "product-detail" */ './views/ProductHome.vue'),
      children: [
        {
          path: '/',
          name: 'product-detail',
          component: () => import(/* webpackChunkName: "product-detail" */ './components/ProductDetail.vue'),
        },
        {
          path: 'update',
          name: 'product-update',
          component: () => import(/* webpackChunkName: "product-update" */ './views/UpdateProduct.vue'),
        },
      ],
    },
    {
      path: '/products',
      name: 'products',
      component: () => import(/* webpackChunkName: "products" */ './views/Products.vue'),
    },
    {
      path: '/login/linkedin',
      name: 'linkedin-redirect',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ './views/User.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/addproduct',
      name: 'addproduct',
      component: () => import(/* webpackChunkName: "login" */ './views/AddProduct.vue'),
    },
  ],
});
