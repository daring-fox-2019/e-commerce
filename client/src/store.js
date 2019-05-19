import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/api/server';
import Swal from 'sweetalert2';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: '',
    isLogin: false,
    role: '',
    loading: false,
  },
  mutations: {
    setLoading(state, payload) {
      // eslint-disable-next-line
      state.loading = payload;
    },
    setRole(state, payload) {
      // eslint-disable-next-line
      state.role = payload;
    },
    login(state) {
      // eslint-disable-next-line
      state.isLogin = true;
    },
    logout(state) {
      Swal.fire({
        position: 'top',
        type: 'success',
        title: 'logged out',
        showConfirmButton: false,
        timer: 1500,
      });
      // eslint-disable-next-line
      state.isLogin = false;
      // eslint-disable-next-line
      state.role = '';
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
  actions: {
    login(context, payload) {
      axios
        .post('/login', payload)
        .then(({ data }) => {
          const { message, token, role } = data;
          Swal.fire({
            position: 'top',
            type: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          context.commit('login');
          context.commit('setRole', role);
        })
        .catch((err) => {
          const { message } = err.response.data;
          Swal.fire({
            position: 'top',
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    register(context, payload) {
      axios
        .post('/register', payload)
        .then(({ data }) => {
          const { message } = data;
          Swal.fire({
            position: 'top',
            type: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          const { status } = err.response;
          let message = '';
          if (status === 400) {
            message = 'invalid input entered';
          }
          Swal.fire({
            position: 'top',
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    upload(context, payload) {
      const { token } = localStorage;
      context.commit('setLoading', true);
      axios
        .post('/products', payload, { headers: { token } })
        .then(({ data }) => {
          context.commit('setLoading', false);
          const { message } = data;
          Swal.fire({
            position: 'top',
            type: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          context.commit('setLoading', false);
          const { message } = err.response.data;
          Swal.fire({
            position: 'top',
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
});
