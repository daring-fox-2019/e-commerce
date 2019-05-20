<template>
  <v-app dark>
    <toolbar
      @toggle="drawer = !drawer"
      :isLoggedIn="isLoggedIn"
      :userCart="userCart"
      @login="login"
      @logout="logout"
    />
    <sidebar :drawer="drawer" :items="items" :isLoggedIn="isLoggedIn"/>
    <v-content class="dark-default">
      <router-view
        class="dark-default"
        :isLoggedIn="isLoggedIn"
        :games="games"
        :userCart="userCart"
        @update-cart="updateCart"
      ></router-view>
    </v-content>
  </v-app>
</template>

<script>
import toolbar from "./components/v-toolbar.vue";
import sidebar from "./components/side-bar.vue";
import LoginForm from "./components/login-form.vue";

export default {
  name: "App",
  components: {
    toolbar,
    sidebar,
    LoginForm
  },
  data() {
    return {
      isLoggedIn: false,
      drawer: false,
      items: [
        {
          id: 1,
          icon: "home",
          text: "Home",
          route: "/"
        },
        {
          id: 2,
          icon: "videogame_asset",
          text: "Browse Games",
          route: "/games"
        },
        {
          id: 3,
          icon: "shopping_cart",
          text: "My Cart",
          route: "/myCart"
        },
        {
          id: 4,
          icon: "history",
          text: "Order History",
          route: "/orderHistory"
        },
        // {
        //   id: 5,
        //   icon: "history",
        //   text: "All Users Order History",
        //   route: "/allHistory"
        // },
        // {
        //   id: 5,
        //   icon: "power_settings_new",
        //   text: "Login",
        //   route: "/login"
        // },
        // {
        //   id: 6,
        //   icon: "power_settings_new",
        //   text: "Log out",
        //   route: "/logout"
        // }
      ],
      games: [],
      loginData: {
        id: "",
        name: "",
        email: ""
      },
      userCart: []
    };
  },
  created() {
    this.getProducts();
    this.checkLog();
  },
  methods: {
    updateCart(data) {
      // console.log("jalan update")
      this.getCart();
    },
    getCart() {
      // console.log('masuk get cart')
      axios({
        method: "get",
        url: "http://localhost:3000/carts/myCart",
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          // console.log({ data, dari: "getmycarts" });
          this.userCart = data;
        })
        .catch(err => {
          console.log({ err });
        });
    },
    getProducts() {
      axios({
        method: "get",
        url: "http://localhost:3000/products"
      })
        .then(({ data }) => {
          this.games = data;
          data.forEach(item => {
            if(item.price > 0) {
              item.priceStr = 'Rp ' + item.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
              item.priceStr = 'Free to Play'
            }
          });
        })
        .catch(err => {
          console.log({ err });
        });
    },
    login(input) {
      // console.log({ input });
      axios({
        method: "post",
        url: "http://localhost:3000/users/login",
        data: input
      })
        .then(({ data }) => {
          let { id, name, email, token, role } = data;
          if (data) {
            this.loginData = {
              id,
              name,
              email
            };
            localStorage.setItem("token", token);
            localStorage.setItem("id", id);
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("role", role);
          }
          this.isLoggedIn = true;
          this.getCart();
          this.drawer = false;
          swal.fire({
            type: "success",
            title: `Logged in!`,
            text: `Welcome, ${name}! 👋🏻`
          });
        })
        .catch(err => {
          console.log({err})
          // let { data } = response;
          // Swal.fire({
          //   type: "error",
          //   title: "Ooopss....",
          //   text: data.message
          // });
        });
    },
    checkLog() {
      if (localStorage.token != undefined) {
        // console.log('logged in')
        this.isLoggedIn = true;
        this.getCart();
      } else {
        // console.log('not logged in')
        this.userCart = []
        this.isLoggedIn = false;
      }
    },
    logout() {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("id");
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("role");
      swal.fire("Signed out", `Goodbye, ${localStorage.name}!`, "success");
      window.localStorage.removeItem("name");
      this.isLoggedIn = false;
      this.checkLog();
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
}
.dark-default {
  background-color: #1d282e !important;
}
.dark-default-1 {
  background-color: #033f74 !important;
}
</style>
