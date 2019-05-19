import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    isLoggedIn:false,
    cart: 0
  },
  mutations: {
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
