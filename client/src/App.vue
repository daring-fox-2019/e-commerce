<template>
  <v-app dark>
    <toolbar
      @toggle="drawer = !drawer"
      :isLoggedIn="isLoggedIn"
      :userCart="userCart"
      @login="login"
      @logout="logout"
    />
    <sidebar :drawer="drawer" :items="items" :isLoggedIn="isLoggedIn"/><!-- @toggle="drawer = !drawer" -->
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
import swal from "sweetalert";

export default {
  name: "App",
  components: {
    toolbar,
    sidebar,
    LoginForm
  },
  mounted() {
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
        }
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
      this.getCart();
    },
    getCart() {
      axios({
        method: "get",
        url: "http://34.87.56.140/carts/myCart",
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.userCart = data;
        })
        .catch(err => {
          console.log({ err });
        });
    },
    getProducts() {
      axios({
        method: "get",
        url: "http://34.87.56.140/products"
      })
        .then(({ data }) => {
          this.games = data;
          data.forEach(item => {
            if (item.price > 0) {
              item.priceStr =
                "Rp " +
                item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
              item.priceStr = "Free to Play";
            }
          });
        })
        .catch(err => {
          console.log({ err });
        });
    },
    login(input) {
      axios({
        method: "post",
        url: "http://34.87.56.140/users/login",
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
          swal({
            type: "success",
            title: `Logged in!`,
            text: `Welcome, ${name}! 👋🏻`
          });
        })
        .catch(err => {
          console.log({ err });
        });
    },
    checkLog() {
      if (localStorage.token != undefined) {
        this.isLoggedIn = true;
        this.getCart();
      } else {
        this.userCart = [];
        this.isLoggedIn = false;
      }
    },
    logout() {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("id");
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("role");
      swal("Signed out", `Goodbye, ${localStorage.name}!`, "success");
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
.swal-modal {
  font-family: Helvetica;
}
</style>
