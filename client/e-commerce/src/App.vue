<template>
  <div id="app">
    <b-modal hide-footer title="Your Cart" ref="my-modal">
      <div class="d-block text-center">
        <ul class="list-group">
          <li
            v-for="item in items"
            :key="item.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <img v-bind:src="item.image" style="width:50px; height:50px">
            {{item.name}}
            <br>
            $ {{item.price}}
            <b-button @click="removeItem(item.id)">remove</b-button>
          </li>
        </ul>
      </div>
      <b-button class="mt-2" variant="outline-success" block @click="hideModalCart">Checkout</b-button>
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
            <span class="badge badge badge-light">{{items.length}}</span>
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
      <router-view v-on:login="login" :isLogin="isLogin" :userId="userId" ::isAdmin="isAdmin"/>
    </div>
    <footer></footer>
  </div>
</template>

<script>
let dummy = [
  {
    id: 1,
    name: 'ring 1',
    image:
      'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fclimg8.bluestone.com%2Ff_jpg%2Cc_scale%2Cw_1024%2Cb_rgb%3Af0f0f0%2Fgiproduct%2FBD-R10_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-1929.jpg&f=1',
    price: 1200000
  },
  {
    id: 2,
    name: 'ring 2',
    image:
      'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fclimg8.bluestone.com%2Ff_jpg%2Cc_scale%2Cw_1024%2Cb_rgb%3Af0f0f0%2Fgiproduct%2FBD-R10_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-1929.jpg&f=1',
    price: 2000000
  }
]
export default {
  name: 'app',
  data () {
    return {
      isLogin: false,
      userId: 'no user',
      cartId: '1',
      items: [],
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
    login (data) {
      this.isLogin = data.isLogin
      this.userId = data.userId
      this.cart = data.cart
    },
    logout () {
      this.items = []
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
    checkLogin () {
      if (localStorage.getItem('token')) {
        this.isLogin = true
        this.userId = localStorage.getItem('user')
        if(id === '5ce158d52edb972b1e4dc5c4'){
        this.isAdmin = true
        }
      } else {
        this.isLogin = false
        this.userId = 'no user'
      }
    },
    removeItem (id) {
      let items = this.items
      items.forEach((element, i) => {
        if (element.id === id) {
          items.splice(i, 1)
        }
      })
    }
  }
}
</script>
