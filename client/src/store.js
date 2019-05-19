import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/api/server';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: '',
    isLogin: '',
  },
  mutations: {
    login(state, payload) {
      console.log(payload);
    }
  },
  actions: {
    login(context, payload) {
      console.log(payload);
      console.log('=======');
      context.commit('login', payload);
    }
  },
});
