/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import Swal from 'sweetalert2';

Vue.use(Vuex);
Vue.use(Vuelidate);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    userData: {
      id: '',
      name: '',
      email: ''
    }
  },
  mutations: {
    login(state, payload) {
      let { id, name, email, token } = payload
      if(payload) {
        state.userData = {
          id, name, email
        }
        localStorage.setItem('token', token)
        localStorage.setItem('id', id)
        localStorage.setItem('name', name)
        localStorage.setItem('email', email)
      }
      state.isLoggedIn = true
    }
  },
  actions: {
    fetchGames() {
      // 
    },
    login({ commit, dispatch }, payload) {
      console.log('masuk login')
      console.log({payload})
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: payload
      })
        .then(({ data }) => {
          commit('login', data)
        })
        .catch(({response}) => {
          let { data } = response
          Swal.fire({
            type: 'error',
            title: 'Ooopss....',
            text: data.message
          })
        })
    }
  },
});
