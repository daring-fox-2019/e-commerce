import Vue from 'vue';
import Vuex from 'vuex';
import myServer from '@/api/myServer';
import Swal from 'sweetalert2';
import Router from './router';

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    isLogin: false,
    currentProduct: {},
    allProducts: [],
    carts: [],
    currentUser: {},
    anythingProducts: [],
  },
  mutations: {
    setLogin(state, loggedInUser) {
      localStorage.token = loggedInUser.token;
      this.state.currentUser = {
        name: loggedInUser.name,
        email: loggedInUser.email,
        role: loggedInUser.role,
      };
      this.state.isLogin = true;
      this.dispatch('getCarts');
      Router.push('/');
    },
    stayLoggedIn(state, loggedInUser) {
      this.state.currentUser = {
        name: loggedInUser.name,
        email: loggedInUser.email,
        role: loggedInUser.role,
      };
      this.state.isLogin = true;
      this.dispatch('getCarts');
    },
    setLogout() {
      this.state.isLogin = false;
      this.state.currentUser = {};
      this.state.carts = [];
      localStorage.clear();
    },

    addProduct(state, product) {
      this.state.allProducts.push(product);

      // anything
      this.state.anythingProducts.push(product);
      Router.push('/');
    },

    getAllProducts(state, products) {
      this.state.allProducts = products;

      // anything
      this.state.anythingProducts = products;
    },

    showProduct(state, payload) {
      this.state.currentProduct = payload;
    },

    confirmEdit(state, editedProduct) {
      this.state.allProducts = this.state.allProducts.map((el) => {
        if (el._id === editedProduct._id) el = editedProduct;
        return el;
      });

      // anything
      this.state.anythingProducts = this.state.anythingProducts.map((el) => {
        if (el._id === editedProduct._id) el = editedProduct;
        return el;
      });
      Router.push('/');
    },

    deleteProduct(state, deletedProduct) {
      this.state.allProducts = this.state.allProducts.filter(el => el._id !== deletedProduct._id);

      // anything
      this.state.anythingProducts = this.state.anythingProducts.filter(el => el._id !== deletedProduct._id);
      Swal.fire('Good job!', 'Product successfully deleted!', 'success');
      Router.push('/');
    },

    displayProducts(state, category) {
      if (category === 'anything') {
        this.state.allProducts = this.state.anythingProducts.map(el => el);
      } else {
        this.state.allProducts = this.state.anythingProducts.filter(el => el.category === category);
      }
    },

    addCart(state, payload) {
      let inserted = false;
      for (let i = 0; i < this.state.carts.length; i++) {
        if (this.state.carts[i].product._id === payload.product._id) {
          this.state.carts[i] = payload;
          inserted = true;
        }
      }
      if (!inserted) {
        this.state.carts.push(payload);
        inserted = true;
      }
    },

    getCarts(state, payload) {
      this.state.carts = payload;
    },

    removeCart(state, deletedCart) {
      this.state.carts = this.state.carts.filter(el => el._id !== deletedCart._id);
    },

    confirmOrder(state){
      this.state.carts = []
      Router.push('/')
    }

  },
  actions: {
    removeCart(context, id) {
      myServer
        .delete(`/cart/${id}`)
        .then(({ data }) => {
          this.commit('removeCart', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setLogin(context, form) {
      myServer
        .post('user/login', form)
        .then(({ data }) => {
          Swal.fire('Good job!', "You've successfully logged in!", 'success');
          this.commit('setLogin', data);
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Sorry :(',
            text: `${err.response.data}`,
          });
        });
    },
    stayLoggedIn(context) {
      myServer.defaults.headers.common.token = localStorage.token;
      myServer
        .get('/user/token')
        .then(({ data }) => {
          this.commit('stayLoggedIn', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addProduct(context, formData) {
      myServer
        .post('/product', formData)
        .then(({ data }) => {
          Swal.fire('Good job!', 'New product successfully added!', 'success');
          this.commit('addProduct', data);
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Sorry :(',
            text: `${err.response.data}`,
          });
        });
    },

    getAllProducts(context) {
      myServer.defaults.headers.common.token = localStorage.token;
      myServer
        .get('/product')
        .then(({ data }) => {
          this.commit('getAllProducts', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    showProduct(context, id) {
      myServer
        .get(`/product/${id}`)
        .then(({ data }) => {
          this.commit('showProduct', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addCart(context, payload) {
      myServer.defaults.headers.common.token = localStorage.token;
      let inserted = false;
      let cartId = null;
      for (let i = 0; i < this.state.carts.length; i++) {
        if (this.state.carts[i].product._id === payload._id) {
          inserted = true;
          cartId = this.state.carts[i]._id;
        }
      }
      if (inserted) {
        myServer
          .patch(`/cart/${cartId}`, { amount: payload.amount })
          .then(({ data }) => {
            console.log('ini dari addCart action');
            console.log(cartId);
            console.log(payload.amount);
            console.log(data);
            console.log('ini dari addCart action');
            this.commit('addCart', data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        myServer.post('/cart', payload)
          .then(({ data }) => {
            this.commit('addCart', data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    getCarts(context) {
      myServer.defaults.headers.common.token = localStorage.token;
      myServer.get('/cart')
        .then(({ data }) => {
          this.commit('getCarts', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    confirmEdit(context, [id, formData]) {
      myServer
        .patch(`/product/${id}`, formData)
        .then(({ data }) => {
          this.commit('confirmEdit', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteProduct(context, id) {
      myServer
        .delete(`/product/${id}`)
        .then(({ data }) => {
          this.commit('deleteProduct', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    confirmOrder(context){
      this.commit('confirmOrder')
    }
  },
});
