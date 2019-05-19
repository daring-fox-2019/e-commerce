/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/backend.js';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    isLogin: false,
    user: null,
    cart: null,
  },
  mutations: {
    setUser(s, p) {
      s.user = p;
    },
    setIsLogin(s, p) {
      s.isLogin = p;
    },
    setCart(s, p) {
      s.cart = p;
    },
    addItem(s, p) {
      s.cart.items.push(p);
    },
    removeItem(s, p) {
      s.cart.items = s.cart.items.filter(x => x._id.toString() !== p);
    },
  },
  actions: {
    getCurrentCart(context) {
      api.get('/cart', { headers: { Authorization: localStorage.ecomm_token } })
        .then(({ data }) => {
          context.commit('setCart', data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    addCartItem(context, newdata) {
      const cartId = context.state.cart ? context.state.cart._id : '0';
      return api.patch(`/cart/${cartId}`, newdata, { headers: { Authorization: localStorage.ecomm_token } });
    },
    removeCartItem(context, newdata) {
      const item = newdata;
      return api.delete(`/cart/${context.state.cart._id}/delete/${item}`, { headers: { Authorization: localStorage.ecomm_token } });
    },
  },
});

export default store;
