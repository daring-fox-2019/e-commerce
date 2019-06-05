<template>
  <div id="app" class="d-flex flex-column">
    <div id="nav">
      <b-navbar
        toggleable="lg"
        type="dark"
        variant="info"
        style="height: 60px"
        class="d-flex justify-content-around"
      >
        <router-link to="/">
          <b-navbar-brand>
            <i class="fas fa-store"></i> F - commerce
          </b-navbar-brand>
        </router-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="mx-auto">
            <b-nav-form
            @submit.prevent='search'
            >
              <b-form-input
                size="sm"
                class="mr-sm-2"
                v-model='searchInput'
                placeholder="Search Product"
                style="width:800px; margin-left:80px"
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="light">Search</b-button>
            </b-nav-form>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item class="px-1 d-flex justify-content-around">
              <router-link to="/">
                <b-button variant="info">Home</b-button>
              </router-link>
            </b-nav-item>
            <b-nav-item class="px-1 d-flex justify-content-around">
              <router-link to="/cart">
                <b-button variant="info">
                  <i class="fas fa-shopping-cart pr-2"></i>
                  <b-badge variant="dark" v-if="cartAmount > 0">{{cartAmount}}</b-badge>
                </b-button>
              </router-link>
            </b-nav-item>
            <b-nav-item class="px-1 d-flex justify-content-around">
              <router-link to="/login">
                <b-button variant="info" v-if="!isLogin">Login</b-button>
              </router-link>
            </b-nav-item>
            <b-nav-item-dropdown
              variant="info"
              right
              v-if="isLogin"
              class="d-flex justify-content-center pt-2 mr-3"
            >
              <template slot="button-content">
                <em>
                  <i class="fas fa-user-alt"></i>
                </em>
              </template>
              <a @click.prevent="toProfile">
                <b-dropdown-item>View Profile</b-dropdown-item>
              </a>
              <a @click.prevent="signOut">
                <b-dropdown-item>Sign Out</b-dropdown-item>
              </a>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view @login="login" class="mb-5" @updateCart="getCart" :searchResult='searchResult' @empty-result='emptyResult'/>
    <Footer class="mt-auto"/>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import axios from "./api/server/axios.js";
import formatNumber from 'format-currency';

export default {
  data() {
    return {
      isLogin: false,
      myCart: [],
      cartAmount: 0,
      searchInput: '',
      searchResult: []
    };
  },
  components: {
    Footer
  },
  methods: {
    emptyResult(){
      this.searchResult =[]
    },
    search(){
      this.$router.push({path: '/'})
      axios
        .get(`/products/search?title=${this.searchInput}`)
        .then(({ data })=>{
          this.searchResult = data.map(el=>{
            el.formatPrice = formatNumber(el.price).split('.')[0]
            return el
          })
        })
        .catch(err=>{
          console.log(err)
        })
    },
    toProfile(){
      this.$router.push({path: '/profile'})
    },
    login(data) {
      this.getCart(data);
      this.isLogin = true
    },
    signOut() {
      console.log("signing out");
      this.$swal({
        dangerMode: true,
        title: `Are you sure to sign out?`,
        icon: "warning",
        buttons: ["Cancel", "Yes!"]
      }).then(result => {
        if (result) {
          this.$swal({
            title: `Bye bye!`,
            text: `Hope to see you soon!`,
            icon: "success",
            buttons: ["Cancel", "Yes!"]
          });
          this.$router.push({ path: "/" });
          localStorage.clear();
          this.cartAmount = 0;
          this.isLogin = false;
        } else {
        }
      });
    },
    getCart(data) {
      console.log('anjay')
      if (!data) {
        axios
          .get("/carts/owned", {
            headers: {
              token: localStorage.token
            }
          })
          .then(({ data }) => {
            this.myCart = data;
            let total = 0;
            data.forEach(element => {
              total += element.quantity;
            });
            this.cartAmount = total;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let total = 0;
        data.forEach(element => {
          total += element.quantity;
        });
        this.cartAmount = total;
      }
    }
  },
  created() {
    if (localStorage.token) {
      this.isLogin = true;
      this.getCart();
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}
.dropdown:hover > .dropdown-menu {
  display: block;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh !important;
}
router-view {
  min-height: 100vh !important;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>