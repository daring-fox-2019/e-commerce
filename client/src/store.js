/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    isLogin: false,
    user: null,
  },
  mutations: {
    setUser(s, p) {
      s.user = p;
    },
    setIsLogin(s, p) {
      s.isLogin = p;
    },
  },
  actions: {
  },
});

export default store;
