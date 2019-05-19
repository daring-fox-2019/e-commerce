import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'not-found',
      component: () => import(/* webpackChunkName: "not-found" */ './views/NotFound.vue'),
    },
    {
      path: '/',
      name: 'landingPage',
      component: () => import(/* webpackChunkName: "not-found" */ './views/LandingPage.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "not-found" */ './views/Home.vue'),
      children : [
        {
          path : ':category',
          name : 'category',
          component: () => import(/* webpackChunkName: "not-found" */ '@/components/ProductsCard.vue'),
        }
      ]
    },
    {
      path: '/products/:id',
      name: 'details',
      component: () => import(/* webpackChunkName: "not-found" */ './views/DetailsPage.vue'),
    },
    {
      path: '/admin',
      name: 'adminPage',
      meta : { requiresAuth : true, isAdmin : true},
      component: () => import(/* webpackChunkName: "not-found" */ './views/AdminPage.vue'),
      children : [
        {
          path : 'addProduct',
          name : 'addProduct',
          component : () => import(/* webpackChunkName: "not-found" */ '@/components/FormProduct.vue'),
        },
        {
          path : 'editProduct/:id',
          name : 'editProduct',
          component : () => import(/* webpackChunkName: "not-found" */ '@/components/FormProduct.vue'),
        },
        {
          path : 'overview',
          name : 'overview',
          component : () => import(/* webpackChunkName: "not-found" */ '@/components/Overview.vue'),
        },
        {
          path : 'history',
          name : 'allHistory',
          component : () => import(/* webpackChunkName: "not-found" */ '@/components/allTransaction.vue'),
        },
      ]
    },
    {
      path : '/carts',
      name: 'carts',
      meta : {
        requiresAuth: true
      },
      component : () => import(/* webpackChunkName: "not-found" */ '@/views/Cart.vue'),
    },
    {
      path : '/carts/preview/:id',
      name: 'cartsPreview',
      meta : {
        requiresAuth : true
      },
      component : () => import(/* webpackChunkName: "not-found" */ '@/views/CartPreview.vue'),
    },
    {
      path : '/history',
      name : 'history',
      meta : {
        requiresAuth : true
      },
      component : () => import(/* webpackChunkName: "not-found" */ '@/views/TransactionHistory.vue'), 
    },

 
  ],
});
