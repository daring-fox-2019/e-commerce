import Vue from 'vue';
import Vuex from 'vuex';
import server from '@/api/server';
import Swal from 'sweetalert2';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    serverUrl: 'http://localhost:3000',
    session: {
      isLogin: false,
    },
    // admin
    productList: [],
    filteredProductList: [],
    adminTransactions: [],
    // user
    userProductList: [],
    filteredUserProductList: [],
    singleProductDetail: {},
    user: {},
    userTransactions: [],

  },
  mutations: {
    // user
    submitLogin(state, payload) {
      state.session.isLogin = true;
      localStorage.token = payload.token;
      localStorage._id = payload._id;
      localStorage.name = payload.name;
      localStorage.role = payload.role || 'user';
      state.session.role = payload.role || 'user';
    },
    signOut(state) {
      state.session.isLogin = false;
      localStorage.clear();
      Swal.fire({
        // position: 'top-end',
        type: 'success',
        title: 'Successfully logged out!',
        showConfirmButton: false,
        timer: 1500,
      });
    },
    userIsLoggedIn(state) {
      state.session.isLogin = true;
    },
    fetchUserData(state, payload) {
      console.log(payload, '----fetchuserdata');
      state.user = payload;
    },
    // ////product
    submitProductData(state, data) {
      state.productList.unshift(data);
      // state.filteredProductList.unshift(data)
    },
    fetchProductData(state, payload) {
      state.productList = payload;
    },
    fetchUserProductList(state, payload) {
      state.userProductList = payload;
    },
    fetchProductDetail(state, payload) {
      state.singleProductDetail = payload;
    },
    // cart
    addToCart(state, payload) {
      state.user = payload;
    },
    checkoutCart(state, payload) {
      // console.log( payload, 'payload -- mutation checkout')
      state.userTransactions.push(payload);
    },
    // transaction
    fetchUserTransactions(state, payload) {
      console.log(payload, '=====state mutation fetchusertransaction');
      state.userTransactions = payload;
    },
    fetchTransactionDataAdmin(state, payload) {
      state.adminTransactions = payload;
    },
  },
  actions: {
    submitLogin({ commit }, login_obj) {
      server
        .post('/users/login', login_obj)
        .then(({ data }) => {
          commit('submitLogin', data);
          Swal.fire({
            // position: 'top-end',
            type: 'success',
            title: 'Login success!',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err.message);
          Swal.fire({
            // position: 'top-end',
            type: 'error',
            title: 'Login failed',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    submitRegister({ commit }, register_obj) {
      // console.log('masuk function')
      // console.log(register_obj)
      server
        .post('/users/register', register_obj)
        .then(({ data }) => {
          // console.log(data,'======')
          commit('submitLogin', data);
          Swal.fire({
            // position: 'top-end',
            type: 'success',
            title: 'Register success!',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err.message);
          Swal.fire({
            // position: 'top-end',
            type: 'error',
            title: 'Register failed',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    // /////product
    submitProductData({ commit }, product_obj) {
      server
        .post('/products', product_obj, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          commit('submitProductData', data);
        })
        .catch((err) => {
          Swal.fire({
            // position: 'top-end',
            type: 'error',
            title: 'Add product failed',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    fetchProductData({ commit }) { // jamak
      server
        .get('/products')
        .then(({ data }) => {
          console.log('fetchProductData sukses');
          commit('fetchProductData', data);
        })
        .catch((err) => {
          console.log('fetchProductData failed');
          console.log(err.response.data.message);
        });
    },
    fetchUserProductList({ commit }) {
      server
        .get('/products')
        .then(({ data }) => {
          console.log('fetchUserProductList sukses');
          commit('fetchUserProductList', data);
        })
        .catch((err) => {
          console.log('fetchUserProductList failed');
          console.log(err.response.data.message);
        });
    },
    fetchProductDetail({ commit }, product_id) {
      server
        .get(`/products/${product_id}`)
        .then(({ data }) => {
          commit('fetchProductDetail', data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    deleteProductInformation({ commit, dispatch }, product_id) {
      // console.log('masuk deleteproductinfo store')
      // console.log(product_id)
      server
        .delete(`/products/${product_id}`, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log('successfully deleted the product');
          dispatch('fetchProductData');
          Swal.fire({
            // position: 'top-end',
            type: 'success',
            title: `Deleted product: ${product_id}`,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    // / cart
    addToCart({ commit }, obj) {
      const cart_obj = { add_item_to_cart: obj.product, quantity: obj.quantity };

      // console.log('masuk ke addtocart store')
      // console.log(cart_obj)
      server
        .patch('/users/cart', cart_obj, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log('add data to cart success');
          // console.log(data)
          commit('addToCart', data);
          Swal.fire({
          // position: 'top-end',
            type: 'success',
            title: 'Added to cart!',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire({
            // position: 'top-end',
            type: 'error',
            title: 'Failed to add item to cart',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    removeFromCart({ commit, dispatch }, cart_id) {
      server
        .patch('/users/cart', { remove_item_from_cart: cart_id }, { headers: { token: localStorage.token } })
        .then(({ data }) => {
        // commit('removeFromCart', data)
          console.log(data);
          dispatch('fetchUserData');
          Swal.fire({
          // position: 'top-end',
            type: 'success',
            title: 'Successfully deleted item from cart',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchUserData({ commit }) {
      server
        .get('/users', { headers: { token: localStorage.token } })
        .then(({ data }) => {
        // console.log('fetchUserData successful')
        // console.log(data, '====fetchuserdata')
          commit('fetchUserData', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    checkoutCart({ commit }, cartIdArray) {
      server
        .post('/transactions', { items: cartIdArray }, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          commit('checkoutCart', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    fetchUserTransactions({ commit }) {
      server
        .get('/transactions', { headers: { token: localStorage.token } })
        .then(({ data }) => {
          commit('fetchUserTransactions', data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    fetchTransactionDataAdmin({ commit }) {
      server
        .get('/transactions/all', { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log('sukses fetch data transaksi admin');
          commit('fetchTransactionDataAdmin', data);
        })
        .catch((err) => {
          console.log('gagal fetch transaction data admin');
          console.log(err.message);
        });
    },
    confirmPaymentAdmin({ commit, dispatch }, transaction_id) {
      // console.log('masuk ke fungsi ini')
      server
        .patch(`/transactions/${transaction_id}/admin`, { status: 'paid' }, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log('success change status transaction to paid');
          dispatch('fetchTransactionDataAdmin');
        })
        .catch((err) => {
          console.log(err.response.data.message);
          console.log('gagal ubah status transaksi');
        });
    },
    revertPaymentAdmin({ commit, dispatch }, transaction_id) {
      // console.log('masuk ke fungsi ini')
      server
        .patch(`/transactions/${transaction_id}/admin`, { status: 'cancel payment' }, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log('success change transaction status back to waiting for payment');
          dispatch('fetchTransactionDataAdmin');
        })
        .catch((err) => {
          console.log(err.response.data.message);
          console.log('gagal ubah status transaksi');
        });
    },
    confirmDelivery({ commit, dispatch }, transaction_id) {
      console.log('masuk fungsi confirm delivery');
      console.log(transaction_id);
      server
        .patch(`/transactions/${transaction_id}/delivery`, { status: 'delivered' }, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log(data);
          dispatch('fetchUserTransactions');
          console.log('delivery confirmed');
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
  },
});
