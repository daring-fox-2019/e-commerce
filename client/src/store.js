import Vue from "vue";
import Vuex from "vuex";
import api from '@/api/localapi'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    isLoggedIn:false,
    cart: 0
  },
  mutations: {
    signIn(state, payload) {
      const { email, password } = payload;

      api
      .post('/users/signin', {
        email,
        password
      })
      .then(({data}) => {
        Swal.fire(
          'Success!',
          '',
          'success'
        )
        state.isLoggedIn = true
        localStorage.token = data.token
      })
      .catch(err => {
        console.log('err: ', err);
      })
    },
    signUp(state, payload) {
      const {name, email, password} = payload;

      api
      .post('/users/signup', {
        name,
        email,
        password
      })
      .then(user => {
        Swal.fire(
          'Success!',
          `Welcome ${user.data.name}`,
          'success'
        )

        payload = {}
      })
      .catch(err => {
        console.log(err);
      })
    },
    getCart(state) {
      if(localStorage.token) {
        api.defaults.headers.common['token'] = localStorage.token
  
        api
        .get('/carts')
        .then(({data}) => {
          state.cart = data.length
        })
        .catch(err=> {
          console.log('err cart: ', err);
        })
      }
    }
  },
  actions: {
      signIn(context, payload) {
          context.commit("signIn", payload)
      },
      signUp(context, payload) {
        context.commit("signUp", payload)
      },
      getCartLoggedInUser(context) {
        context.commit("getCart")
      }
  }
});
