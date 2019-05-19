import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import(/* webpackChunkName: "products" */ './views/Products.vue'),
      children: [
        {
          path: ':id',
          name: 'detailProduct',
          component: () => import(/* webpackChunkName: "detailProduct" */ './views/Product.vue'),
        },
      ],
    },
    {
      path: '/carts',
      name: 'carts',
      component: () => import(/* webpackChunkName: "carts" */ './views/Carts.vue'),
      // children: [
      //   {
      //     path: ':id',
      //     name: 'productCart',
      // eslint-disable-next-line
      //     component: () => import(/* webpackChunkName: "productCart" */ './views/ProductCart.vue'),
      //   },
      // ],
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "carts" */ './views/Admin.vue'),
      // children: [
      //   {
      //     path: 'product',
      //     name: 'productForm',
      // eslint-disable-next-line
      //     component: () => import(/* webpackChunkName: "productForm" */ './views/ProductForm.vue'),
      //   },
      // ],
    },
  ],
});
