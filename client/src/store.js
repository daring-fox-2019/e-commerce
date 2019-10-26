/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import swal from 'sweetalert'


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
        url: 'http://34.87.56.140/users/login',
        data: payload
      })
        .then(({ data }) => {
          commit('login', data)
        })
        .catch(({response}) => {
          let { data } = response
          swal({
            type: 'error',
            title: 'Ooopss....',
            text: data.message
          })
        })
    }
  },
});
