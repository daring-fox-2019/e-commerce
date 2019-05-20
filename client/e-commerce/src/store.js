import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/database/axios';
import { stat } from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: null,
    itemAll: [],
    itemUser: [],
    countCart: 0,
    cartList: [],
    search: ''
  },
  mutations: {
    setSearch(state, data){
      state.search = data
    },
    resetValue(state) {
      state.isLogin = false;
      state.countCart = 0;
      state.cartList = [];
      state.role = null
    },
    setItemAll(state, data) {
      state.itemAll = data;
    },
    setItemUser(state, data) {
      state.itemUser = data;
    },
    setIsLogin(state, data) {
      state.isLogin = data;
    },
    setRole( state ){
      state.role = localStorage.getItem('role')
    },
    setCartList(state, data) {
      state.cartList = data;
      state.countCart = data.length;
    },
    setAddCart(state, data) {
      state.cartList.push(data);
      state.countCart = state.cartList.length;
    },
    DeleteCart(state, id) {
      let { cartList } = state;
      cartList = cartList.filter(el => el._id != id);

      state.cartList = cartList;
      state.countCart = cartList.length;
    },
    updateProduct(state, data) {
      state.itemAll = state.itemAll.map((el) => {
        if (el._id == data._id) {
          el = data;
        }
        return el;
      });
    },
    deleteItem(state, id) {
      state.itemAll = state.itemAll.filter(el => el._id != id);
    },
    deleteItemUser(state, id) {
      state.itemUser = state.itemUser.filter(el => el._id != id);
    },
  },
  actions: {
    fetchDataItems(context) {
      axios.get('/products', { params: {search : context.state.search}})
        .then(({ data }) => {
          data.map( el => {
            if(el.name.length > 20){
              el.displayName = el.name.slice(0,17)+'...'
            } else {
              el.displayName = el.name
            }
          })
  
          context.commit('setItemAll', data);
        })
        .catch((err) => {
          console.log(err)
        });
    },
    fetchDataUser(context) {
      axios.get('/products/user', { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          data.map( el => {
            if(el.name.length > 20){
              el.displayName = el.name.slice(0,17)+'...'
            } else {
              el.displayName = el.name
            }
          })
          context.commit('setItemUser', data);
        })
        .catch((err) => {
          console.log(err)
        });
    },
    getCartData(context) {
      axios
        .get('/carts/user', { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          context.commit('setCartList', data);
        })
        .catch((err) => {
          console.log(err)
        });
    },
  },
});
