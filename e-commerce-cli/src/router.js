import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import AddProduct from './views/AddProduct.vue';
import DetailProduct from './views/DetailProduct.vue';
import Admin from './views/Admin.vue';
import AddCart from './views/AddCart.vue';
import UpdateProduct from './views/UpdateProduct.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: 'detailproduct/:id',
        component: DetailProduct,
        name: 'detailproduct',
      }],
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
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
      path: '/addproduct',
      name: 'addproduct',
      component: AddProduct,
    },
    {
      path: '/createcart',
      name: 'createcart',
      component: AddCart,
    },
    {
      path: '/updateproduct',
      name: 'updateproduct',
      component: UpdateProduct,
    },
  ],
});
