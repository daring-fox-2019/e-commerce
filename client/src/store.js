import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    token: '',
    name: '',
    email: '',
    cart: []
  },
  mutations: {
    login (state, input) {
      state.isLogin = true
      state.name = input
    },
    addToCart (state, input) {
      state.cart.push(input)
    }
  },
  actions: {
    login (context, input) {
      context.commit('login', input)
    },
    addToCart (context, input) {
      context.commit('addToCart', input)
    }
  }
})
