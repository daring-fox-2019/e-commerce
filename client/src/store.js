import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    islogin: '',
    isAdmin: '',
    cartCustomer: [],
    totalPrice: '',
  },
  mutations: {
    setLogin(state, payload) {
      state.islogin = payload;
    },
    setAdmin(state, payload) {
      state.isAdmin = payload;
    },
    setcartCustomer(state, payload){
      state.cartCustomer = payload
    },
    setTotalCart(state, payload){
      state.totalPrice = payload
    }
  },
  actions: {
    loadCartCustomer(context) {
      axios
        .get("http://localhost:3000/cart", {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          let totalPrice = null
          context.commit('setcartCustomer', data)
          data.forEach(element => {
            totalPrice +=
              Number(element.productId.price) * Number(element.quantity);
          });
          context.commit('setTotalCart', totalPrice)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
