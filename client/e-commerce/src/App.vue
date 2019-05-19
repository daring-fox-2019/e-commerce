<template>
  <div id="app">
    <b-modal hide-footer title="Shopping Cart" ref="my-modal">
      <div class="d-block text-center">
        <ul class="list-group" v-if="carts.length > 0">
          <li
            v-for="item in carts"
            :key="item.id"
            class="list-group-item d-flex justify-content-between align-carts-center"
          >
            <img v-bind:src="item.image" style="width:50px; height:50px">
            {{item.name}}
            <br>
            $ {{item.price}}
            <b-button @click="removeItem(item.id)">remove</b-button>
          </li>
        </ul>
        <h3 v-if="carts.length < 1"> Your cart is empty</h3>
      </div>
      <b-button class="mt-2" variant="outline-secondary" block @click="hideModalCart">Close</b-button>
      <b-button v-if="carts.length > 0" class="mt-2" variant="outline-success" block @click="checkout">Checkout</b-button>
    </b-modal>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
      <ul class="navbar-nav mr-auto">
        <li class="navbar-brand">
          Jewelries
          <i class="far fa-gem"></i>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Products</router-link>
        </li>
        <li class="nav-item" v-if="isLogin === true && userId !== 'no user'">
          <router-link class="nav-link" to="/transactions">Transactions</router-link>
        </li>
        <li class="nav-item" v-if="userId !== '5ce158d52edb972b1e4dc5c4'">
          <a class="nav-link" @click="showModalCart">
            Cart
            <span class="badge badge badge-light">{{carts.length}}</span>
          </a>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            v-if="isLogin === false && userId === 'no user'"
            to="/join"
          >join us to start shopping</router-link>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            v-if="isLogin === true"
            @click="logout"
          >Log Out</a>
        </li>
      </ul>
    </nav>
    <div>
      <router-view v-on:atc="atc" v-on:login="login" :isLogin="isLogin" :userId="userId" :isAdmin="isAdmin"/>
    </div>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      isLogin: false,
      userId: 'no user',
      carts: [],
      isAdmin : false,
    }
  },
  created() {
    this.checkLogin()
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
    checkout(){
      this.hideModalCart()
      let amount = 0;
      this.carts.forEach(item=>{
        amount += item.price  
      })
      console.log("di check out")
      // this.$axios({
      //     method: 'post',
      //     url: 'http://localhost:3000/cart',
      //     headers: {
      //       token: localStorage.getItem('token'),
      //       id: localStorage.getItem('user')
      //     },
      //     data: {
      //       email: this.emailregister,
      //       password: this.passwordregister,
      //       cart: []
      //     }
      //   })
      //     .then(({ data }) => {
      //       this.$swal('Account Created', `Successfully created account ${this.emailregister}`, 'success')
      //       this.emaillogin = this.emailregister
      //       this.emailregister = ''
      //       this.passwordregister = ''
      //       this.showregister = false
      //     })
      //     .catch(err => {
      //       this.$swal('Error', err.response.data.message, 'error')
      //     })
    },
    updateCart(i) {
      this.$axios({
          method: 'put',
          url: 'http://localhost:3000/user/'+this.userId,
          headers: {
            token: localStorage.getItem('token'),
            id: localStorage.getItem('user')
          },
          data: {
            cart: this.carts
          }
        })
          .then(({ data }) => {
            if(i === 'add'){
              this.$swal('Addedd to cart', `Added item to cart`, 'success')
            } else {
              this.$swal('Item deleted', `Deleted item from cart`, 'success')
            }
          })
          .catch(err => {
            this.$swal('Error', `${err}`, 'error')
          })
    },
    atc(e) {
      this.carts.push(e)
      this.updateCart('add')
    },
    login (data) {
      this.isLogin = data.isLogin
      this.userId = data.userId
      this.cart = data.cart
    },
    logout () {
      this.carts = []
      this.isLogin = false
      this.userId = 'no user'
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('_id')
      this.$router.push('/')
    },
    showModalCart () {
      this.$refs['my-modal'].show()
    },
    hideModalCart () {
      this.$refs['my-modal'].hide()
    },
    getCartItem() {
      this.$axios({
        method: "get",
        url: "http://localhost:3000/user/"+this.userId,
        headers: {
          id: localStorage.getItem("user"),
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.carts = data.cart;
        })
        .catch((err) => {
          console.log(err)
          this.$swal(`Error Status : ${response.status}`, `${response.data.message}`, "error");
        });
    },
    checkLogin () {
      if (localStorage.getItem('token')) {
        this.isLogin = true
        this.userId = localStorage.getItem('user')
        let id = localStorage.getItem('user')
        this.getCartItem()
        if(id === '5ce158d52edb972b1e4dc5c4'){
        this.isAdmin = true
        }
      } else {
        this.isLogin = false
        this.userId = 'no user'
      }
    },
    removeItem (id) {
      let carts = this.carts
      carts.forEach((element, i) => {
        if (element.id === id) {
          carts.splice(i, 1)
        }
      })
      this.carts = carts
      this.updateCart('del')
    }
  }
}
</script>
