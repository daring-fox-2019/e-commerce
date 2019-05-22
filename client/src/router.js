import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Product from './views/Product.vue';
import Cart from './views/Cart.vue';
import Loading from './views/Loading.vue';
import AddressForm from './components/AddressForm.vue';

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
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      children: [
        {
          path: 'form',
          name: 'form',
          component: AddressForm,
        },
      ],
    },
    {
      path: '/loading',
      name: 'loading',
      component: Loading,
    },
  ],
});
