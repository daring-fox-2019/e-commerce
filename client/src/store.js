import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/axios';
import { stat } from 'fs';
import Swal from 'sweetalert2';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logRegStatus: {
      registered: false,
      loggedIn: localStorage.hasOwnProperty('token') && localStorage.getItem('role') !== 'admin',
    },
    name: localStorage.getItem('name') || '',
    products: [],
    user: {},
  },
  mutations: {
    registered(state, payload) {
      state.logRegStatus.registered = true;
      Swal.fire(
        'Registered!',
        'User Registered!',
        'success',
      );
    },
    loggedIn(state, payload) {
      localStorage.setItem('token', payload.token);
      localStorage.setItem('name', payload.name);
      localStorage.setItem('role', payload.role);
      if (payload.role == 'admin') {
        state.logRegStatus.loggedIn = false;
        router.push('/admin');
      } else {
        state.logRegStatus.loggedIn = true;
        router.push('/');
      }
    },
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('role');
      state.logRegStatus.loggedIn = false;
      router.push('/auth');
    },
    addProduct(state) {
      Swal.fire(
        'Added!',
        'Product has been added!',
        'success',
      );
    },
    getAllProducts(state, payload) {
      state.products = [...payload];
    },
    getCart(state, payload) {
      state.user = {...payload};
    },
    searchProducts(state, payload){
      state.products = [...payload]
    }
  },
  actions: {
    register(context, payload) {
      axios({
        method: 'POST',
        url: '/users/register',
        data: payload,
      })
        .then(({ data }) => {
          context.commit('registered', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(context, payload) {
      axios({
        method: 'POST',
        url: '/users/login',
        data: payload,
      })
        .then(({ data }) => {
          context.commit('loggedIn', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addProduct(context, payload) {
      console.log(payload);
      axios({
        method: 'POST',
        url: '/products/create',
        data: payload,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          context.commit('addProduct', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllProducts(context) {
      axios({
        method: 'GET',
        url: '/products/read',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          context.commit('getAllProducts', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCart(context) {
      axios({
        method: 'GET',
        url: '/cart',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          context.commit('getCart', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchProducts(context,searchText) {
      let query = `?name=${searchText}`
      axios({
        method: 'GET',
        url: `/products/search${query}`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          context.commit('searchProducts', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeCount(context,payload) {
      axios({
        method: 'POST',
        url: `/cart/upsert/${payload.id}`,
        data: {
          count: payload.count
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          context.dispatch('getCart');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCart(context,payload) {
      axios({
        method: 'PUT',
        url: `/cart/delete/${payload.id}`,
        data: {
          count: payload.count
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((result) => {
          context.dispatch('getCart');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  // getters: {
  //   produksiap: state => {
  //     return state.products
  //   }
  // }
});
