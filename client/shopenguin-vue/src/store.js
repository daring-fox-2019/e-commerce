import Vue from 'vue'
import Vuex from 'vuex'

import axios from "@/api/axios";
import Swal from "sweetalert2";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    allItems: [],
    currentItem: {},
  },
  mutations: {
    login (state) {
      state.isLoggedIn = true;
    },
    logout (state) {
      state.isLoggedIn = false;
    },
    clearAllItems(state) {
      state.allItems = [];
    },
    setAllItems(state, payload) {
      state.allItems = payload;
    },
    setCurrentItem(state, payload) {
      state.currentItem = payload;
    }
  },
  actions: {
    login (context) {
      context.commit('login')
    },
    logout (context) {
      context.commit('logout')
    },
    getAllItems(context) {
      axios({
        method: "GET",
        url: `/items`,
      })
        .then(({ data }) => {
          console.log(data);
          context.commit("setAllItems", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCurrentItem(context, id) {
      axios({
        method: "GET",
        url: `/items/${id}`,
      })
        .then(({ data }) => {
          console.log(data);
          context.commit("setCurrentItem", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteItem(context, id) {
      axios({
        method: "DELETE",
        url: `/items/${id}`,
      })
        .then(({ data }) => {
          console.log(data);
          this.test();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    test(context) {
      console.log("invoked")
    }
  }
})
