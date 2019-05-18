import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    islogin: '',
    isAdmin: '',
  },
  mutations: {
    setLogin(state, payload) {
      state.islogin = payload;
    },
    setAdmin(state, payload) {
      state.isAdmin = payload;
    },
  },
});
