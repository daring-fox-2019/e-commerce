<template>
  <div id="app">
    <nav class="nav nav-pills nav-fill py-4">
      <router-link to="/" class="nav-item navbar-brand nav-link text-left ml-5" href="#">Gayette!</router-link>

      <div class="d-flex mr-5">
        <div class="search-box">
          <button class="btn" type="button" name="button" @click.prevent="search">
            <i class="fas fa-search"></i>
          </button>
          <input class="tbox" type="text" placeholder="input search" v-model="query">
        </div>
        <a v-if="isLogin" href="#" @click.prevent="showGallery" class="nav-item nav-link">Gallery</a>
        <a v-else href="#" @click.prevent="notAuthenticated" class="nav-item nav-link">Gallery</a>

        <router-link
          :to="{ name: 'carts', params : {id : userId }}"
          class="nav-item nav-link"
          href="#"
          v-if="isLogin"
        >
          <i class="fas fa-shopping-cart"></i>
        </router-link>
        <router-link v-if="isLogin && role == 'admin'" to="/admin/history" class="nav-item nav-link" href="#">Admin</router-link>

        <a
          v-if="!isLogin"
          href
          class="nav-item nav-link"
          data-toggle="modal"
          data-target="#loginModal"
          tabindex="-1"
          aria-disabled="true"
        >Login</a>
        <a @click.prevent="logout" href="#" class="nav-item nav-link" v-else>Logout</a>
        <router-link :to="{ path: '/history', params: { userId : userId }}" class="nav-item nav-link" v-if="isLogin">
          <i class="fas fa-user" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom"></i>
        </router-link>
      </div>

      <!-- Modal -->
      <LoginModal v-on:success-login="successLogin"/>
      <RegisterModal/>
    </nav>

    <router-view
      :isLogin="isLogin"
      v-on:fetch-products="fetchProducts"
      v-on:sort-by-category="sortByCategory"
      v-on:delete-data="deleteData"
      :products="products"
      v-on:fetch-cart="fetchCarts"
      v-bind:userCart="userCart"
    />
  </div>
</template>

<script>
import LoginModal from "@/components/Login.vue";
import RegisterModal from "@/components/Register.vue";
import axios from "./api/localhost.js";

export default {
  name: "App",
  components: {
    LoginModal,
    RegisterModal
  },
  data() {
    return {
      isLogin: false,
      products: [],
      query: "",
      userId: localStorage.getItem("id"),
      userCart: {},
      role : ""
    };
  },
  methods: {
    successLogin() {
      this.isLogin = true;
      this.role = localStorage.getItem("role")
      this.fetchProducts();
    },
    logout() {
      localStorage.clear();
      this.isLogin = false;
      this.$router.push("/");
    },
    fetchProducts() {
      axios
        .get("/products", { headers: { token: localStorage.getItem("token") } })
        .then(({ data }) => {
          console.log(data);
          this.products = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    sortByCategory(id) {
      axios
        .get(`/products/categories/${id}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.products = data;
          this.$router.push(`/home/${id}`);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteData(id) {
      axios
        .delete(`/products/${id}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          console.log(data);
          this.fetchProducts();
        })
        .catch(err => {
          console.log(err);
        });
    },
    search() {
      let params = {
        productName: this.query,
        category: this.query
      };
      axios
        .get(`/products`, {
          headers: { token: localStorage.getItem("token") },
          params
        })
        .then(({ data }) => {
          this.$router.push("/home");
          this.products = data;
          console.log(data);
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    showGallery() {
      this.fetchProducts();
      this.$router.push("/home");
    },
    notAuthenticated() {
      this.$swal("You must login to continue!","","warning");
    },
    fetchCarts() {
      axios
        .get(`/carts`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.userCart = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.role = localStorage.getItem('role')
      this.fetchProducts();
    } else {
      this.isLogin = false;
    }
  },
  watch: {
    products() {
      console.log("patch products");
    }
  }
};
</script>

<style scoped>
nav {
  background-color: #9dada3;
}

nav a {
  color: white;
}

nav .dropdown .dropdown-menu .dropdown-item {
  color: black;
}

nav .navbar-brand {
  font-family: "Paytone One", sans-serif;
  font-size: 36px;
}

.search-box {
  height: 40px;
  display: flex;
}

.search-box i {
  width: 40px;
  line-height: 40px;
}

.tbox,
.btn {
  border: none;
  outline: none;
}

.tbox {
  width: 0px;
  transition: 0.6s;
  border-radius: 15px;
}

.search-box:hover > .tbox,
.tbox:focus {
  width: 260px;
  padding: 0 10px;
}

button {
  width: 30px;
  margin-right: 10px;
}

.btn {
  color: white;
  padding: 0;
  text-transform: uppercase;
  cursor: pointer;
}


</style>
