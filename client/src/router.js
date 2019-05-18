import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Product from './views/Product.vue';
import Signin from './views/Signin.vue';
import Signup from './views/Signup.vue';
import Detail from './views/Detail.vue';
import Admin from './views/Admin.vue';
import Cart from './views/Cart.vue';
import AddProduct from './views/AddProduct.vue';
import ListProduct from './views/ListProduct.vue';
import ListTransaction from './views/ListTransaction.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    }, {
      path: '/product',
      name: 'product',
      component: Product,
      children: [
        {
          path: ':id',
          name: 'detail',
          component: Detail,
        },
      ],
    }, {
      path: '/signin',
      name: 'signin',
      component: Signin,
    }, {
      path: '/signup',
      name: 'signup',
      component: Signup,
    }, {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'addProduct',
          name: 'addProduct',
          component: AddProduct,
        }, {
          path: 'listProduct',
          name: 'listProduct',
          component: ListProduct,
        }, {
          path: 'listTransaction',
          name: 'listTransaction',
          component: ListTransaction,
        },
      ],
    }, {
      path: '/cart',
      name: 'cart',
      component: Cart,
    }, {
      path: '/transaction',
      name: 'transaction',
      component: ListTransaction,
    }, {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
