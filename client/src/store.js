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
    categories: [],
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
        Swal.fire(
          'Logged in!',
          'You have been logged in!',
          'success',
        );
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
      state.products = [...payload]
      let categories = payload.map(obj => obj.category)
      state.categories = [...new Set(categories)];
      console.log(state)
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
        .catch(({response}) => {
          Swal.fire(
            'Register error!',
            response.data.message,
            'error',
          );
        });
    },
    login(context, payload) {
      axios({
        method: 'POST',
        url: '/users/login',
        data: payload,
      })
        .then(({ data }) => {
          if(data.message){
            Swal.fire(
              'Login error!',
              data.message,
              'error',
            );
          }
          else context.commit('loggedIn', data);
        })
        .catch(({response}) => {
          Swal.fire(
            'Login error!',
            response.data.message,
            'error',
          );
        });
    },
    addProduct(context, payload) {
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
    addToCart(context,id) {
      axios({
        method: 'POST',
        url: `/cart/upsert/${id}`,
        data: {
          count: 1
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          context.dispatch('getAllProducts')
          context.commit('addProduct')
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
      console.log(searchText)
      axios({
        method: 'GET',
        url: `/products/read/search${query}`,
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
    getProductsByCategory(context,searchText) {
      let query = `?category=${searchText}`
      console.log(query)
      axios({
        method: 'GET',
        url: `/products/read/search${query}`,
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
