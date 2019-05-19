<template>
  <div id="app">
    <div id="nav">
      <b-row align-h="between" id="header">
        <div id="nav-left">
          <img src="./assets/JL-logo.jpg" id="logo" class="align-bottom"
            style="border: 2px white solid; border-radius:50%; margin-top:-7px;">
          <!-- <a v-if="isLoggedIn" v-on:click="isNav()" style="margin: 6px; cursor: pointer"><i
              class="fas fa-bars"></i></a> -->
          <router-link class="align-middle" v-if="isLoggedIn" to="/"
            style="margin: 6px; margin-right:12px;"><i class="fas fa-home"
              style="margin-right: 6px;"></i> Home</router-link>
          <router-link class="align-middle" to="/admin" v-if="allPrivilege"><i
              class="fas fa-user-cog"></i> Admin Page
          </router-link>
        </div>
        <div id="nav-right">
          <router-link class="align-middle" v-if="!isLoggedIn" to="/login" style="margin: 6px"><i
              class="fas fa-door-open" style="margin-right: 3px"></i> Log In</router-link>
          <router-link class="align-middle" v-if="!isLoggedIn" to="/register" style="margin: 6px"><i
              class="fas fa-lock-open" style="margin-right: 3px"></i> Register</router-link>
          <div v-if="isLoggedIn" class="dropdown align-middle">
            <a style="background-color:transparent; border:transparent"
              class="btn btn-secondary dropdown-toggle align-middle" href="#" role="button"
              id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              <img class="align-middle" id="pp" :src="pp"
                style="width: 50px; margin-right:10px; border-radius:50px" />
              <span class="align-middle">Welcome, {{ username }}</span>
            </a>
            <div class="dropdown-menu" style="background-color:#ececec"
              aria-labelledby="dropdownMenuLink">
              <router-link class="dropdown-item listNavbar" style="margin-left:0px; color:#790617"
                to="/addproduct"><i class="fas fa-plus-circle"></i> Add Product</router-link>
              <a id="cart" class="dropdown-item" style=" cursor: pointer; color:#790617"
                @click="showCart"><i class="fas fa-shopping-cart" style="margin-right: 3px"></i>
                Cart</a>
              <a id="cart" class="dropdown-item" style=" cursor: pointer; color:#790617"
                @click="showOrder"><i class="fas fa-cash-register" style="margin-right: 3px"></i> My
                Orders</a>
              <a id="logout" class="dropdown-item" style=" cursor: pointer; color:#790617"
                @click="logout"><i class="fas fa-door-open" style="margin-right: 3px"></i> Log
                Out</a>
            </div>
          </div>
        </div>
      </b-row>
    </div>
    <div class="content">
      <!-- <div>
        <NavbarDrop v-if="navbardrop&&isLoggedIn"></NavbarDrop>
      </div> -->
      <div>
        <Cart v-if="cart&&isLoggedIn" @closecart="cart=false"></Cart>
      </div>
      <div>
        <Order v-if="order&&isLoggedIn" @closeorder="order=false"></Order>
      </div>
      <div>
        <router-view v-on:login="isLoggedIn = true" @updateproduct="update"
          :infoupdate="updatedata" />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  // import NavbarDrop from '@/components/NavbarDrop.vue';
  import Footer from '@/components/Footer.vue';
  import Swal from 'sweetalert2';
  import Cart from '@/components/Cart.vue';
  import Order from '@/components/Order.vue';

  export default {
    data() {
      return {
        // navbardrop: false,
        isLoggedIn: false,
        cart: false,
        pp: localStorage.pp,
        username: localStorage.username,
        updatedata: null,
        order: false,
        allPrivilege: false,
      };
    },
    methods: {
      showCart() {
        this.cart = !this.cart;
        this.order = false;
        this.navbardrop = false;
      },
      showOrder() {
        this.order = !this.order;
        this.cart = false;
        this.navbardrop = false;
      },
      update(val) {
        this.updatedata = val;
      },
      // isNav() {
      //   this.navbardrop = !this.navbardrop
      //   this.order = false
      //   this.cart = false
      // },
      truingLogin() {
        this.isLoggedIn = true;
      },
      logout() {
        Swal.fire({
          title: 'Logging out',
          text: 'Are you sure?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, log me out!',
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Logged out!',
              'success',
            );
            localStorage.clear();
            localStorage.removeItem('cartId');
            this.isLoggedIn = false;
            this.$router.push({
              path: '/login',
            });
            this.allPrivilege = false;
          }
        });
      },
    },
    created() {
      if (localStorage.jwtoken) {
        this.isLoggedIn = true;
      }
      if (localStorage.role === 'admin') {
        this.allPrivilege = true;
      }
    },
    components: {
      // NavbarDrop,
      Footer,
      Cart,
      Order,
    },
    watch: {
      isLoggedIn() {
        this.pp = localStorage.pp;
        this.username = localStorage.username;
        if (localStorage.role === 'admin') {
          this.allPrivilege = true;
        }
      },
    },
  };

</script>


<style>
  #logout {
    cursor: pointer;
  }

  #logo,
  #pp {
    height: 50px;
    margin-right: 10px;
    margin-top: -15px;
    margin-bottom: -8px;

  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #ffffff;
    height: 100%;
  }

  #nav-left {
    margin-top: 1px;
    margin-left: 0px;
  }

  #nav-right {
    margin-right: 20px;
  }

  #nav {
    font-size: 20px;
    padding: 10px;
    background-color: #790617;
  }

  #nav a {
    font-weight: bold;
    color: #ffffff;
  }

  #nav a.router-link-exact-active,
  #nav a-exact-active {
    color: #cacaca;
    color: #ececec
  }

  .content {
    /* position: ; */
    height: 83%;
    overflow: scroll;
  }

  #header {
    margin: 0;
  }

</style>
