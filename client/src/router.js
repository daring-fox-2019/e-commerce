/* eslint-disable */
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
      path: '/games',
      name: 'games',
      component: () => import(/* webpackChunkName: "game" */ './views/Games.vue'),
    },
    {
      path: '/games/:id',
      name: 'gamesDetail',
      component: () => import(/* webpackChunkName: "one game" */ './views/GameDetail.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue'),
    },
    {
      path: '/orderHistory',
      name: 'orderHistory',
      component: () => import(/* webpackChunkName: "history" */ './views/History.vue'),
    },
    {
      path: '/allHistory',
      name: 'allHistory',
      component: () => import(/* webpackChunkName: "all-history" */ './views/HistoryAll.vue'),
    },
    {
      path: '/myCart',
      name: 'myCart',
      component: () => import(/* webpackChunkName: "myCart" */ './views/Cart.vue'),
      children: [
        {
          path: ':id',
          name: 'cartGame',
          component: () => import(/* webpackChunkName: "myCart" */ './components/CartGameDetail.vue'),
        }
      ],
    },
  ],
});
