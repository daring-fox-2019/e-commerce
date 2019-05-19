import Vue from "vue";
import Vuex from "vuex";
import api from '@/api/localapi'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    isLoggedIn:false,
    cart: 0
  },
  mutations: {
    signUp(state, payload) {
      const {name, email, password} = payload;

      api
      .post('/users/signup', {
        name,
        email,
        password
      })
      .then(user => {
        Swal.fire(
          'Success!',
          `Welcome ${user.data.name}`,
          'success'
        )

        payload = {}
      })
      .catch(err => {
        console.log(err);
      })
    },
    setCart(state, payload) {
      state.cart = payload
    },
    signIn(state) {
      state.isLoggedIn = true
    },

  },
  actions: {
    setCart(context, payload) {
      context.commit('setCart', payload)
    },
    signIn(context) {
      context.commit('signIn')
    },
    signUp(context, payload) {
      context.commit("signUp", payload)
    }
  }
});
