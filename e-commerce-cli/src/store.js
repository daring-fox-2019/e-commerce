/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deleteCart: false,
  },
  mutations: {
    deleteCartTrue(state) {
      state.deleteCart = true;
    },
    deleteCartFalse(state) {
      state.deleteCart = false;
    },
  },
  actions: {
    deleteCartTrue({
      commit,
    }) {
      commit('deleteCartTrue');
    },
    deleteCartFalse({
      commit,
    }) {
      commit('deleteCartFalse');
    },
  },

});
