import Vue from 'vue'
import Vuex from 'vuex'
import backend from '@/api/api'
// import swal from 'sweetalert2'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    user:null,    
    cart: [],    
    token:null,   
  },
  mutations: {
    setProduct(state, newProducts) {
      state.products = newProducts
    },
    setUser(state, data) {
      state.user = data.user
      state.token = data.token
    }    
  },
  actions: {
    async fetchProducts ({commit}){
      try {
        console.log(`should be here`)
        let response = await backend.get(`/product-home`)        
        if (response.status == 200) { commit('setProduct', response.data) }
      } catch (error) {
        commit('setProduct', null);
      }
    },
    async registerNewUser({ commit }, newUser) {
      try {
        let response = await backend.post(`/auth/register`, newUser)
        if (response.status == 201) { commit('setMessage', response.data) }
      } catch (error) {
        
        commit('setUser', null);
      } finally {
        router.push('home')
      }
    },
    async login({ commit }, user) {
      try {
        let response = await backend.post(`/auth/login`, user)
        commit('setUser', response.data.user);        
        localStorage.setItem('token',response.data.token)        
      } catch (error) {
        // 
        localStorage.removeItem('token')        
        commit('setUser', null);        
      } finally {
        router.push('home')
      }
    },
    async registerNewProduct({ commit }, newProduct) {
      try {
        let response = await backend.post(`/product`, newProduct)
        if (response.status == 201) { commit('setMessage', response.data) }
      } catch (error) {
        //
      } finally {
        router.push('home')
      }
    }
  }
})
