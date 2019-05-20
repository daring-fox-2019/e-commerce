import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart : [],
    isLogin : false
  },
  getters: {
    getCart : state => {
      return state.cart
    },
    getLogin : state => {
      return state.isLogin
    }
    
  },
  // dari dispatch
  actions: {
    
  },
  // dari commit
  mutations: {
    addItem (state,item) {
      item.quantity = 1
      state.cart.push(item)
    },
    login (state) {
      state.isLogin = true
    }
  },
});
