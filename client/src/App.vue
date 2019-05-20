<template>
  <div id="app">
    <div style="background-color: transparent; height:14vh; z-index:100;" class="row">
      <div class="container my-3">
        
        <ul style="display:flex;" class="nav justify-content-between">
          <li v-if="!isLogin" class="nav-item">
            <a
              data-toggle="modal"
              data-target="#loginmodal"
              class="nav-link active"
              to="/login"
            >Login / Register</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link navclr active" to="/">Homepage</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link navclr active" to="/products">Browse</router-link>
          </li>
          <li v-if="isLogin" class="nav-item">
            <router-link class="nav-link navclr active" to="/carts">Cart</router-link>
          </li>
          <li v-if="isLogin" class="nav-item">
            <router-link class="nav-link navclr active" to="/user">User</router-link>
          </li>
          <li v-if="isLogin && role == 'admin'" class="nav-item">
            <router-link v-if="role == 'admin'" class="nav-link navclr active" to="/admin">Admin</router-link>
          </li>
          <li v-if="isLogin" @click="signOut" class="nav-item">
            <router-link class="nav-link navclr active" to="/">Sign out</router-link>
          </li>
          <li>
            <form @submit.prevent="pushSearch">
              <div class="input-group mb-3">
                <input
                  type="text"
                  v-model="searchInput"
                  class="form-control p-2"
                  placeholder="Enter to search.."
                  aria-label="Search.."
                  aria-describedby="basic-addon1"
                  style="border-radius:24px"
                >
              </div>
            </form>
          </li>
        </ul>
      </div>
    </div>
    <router-view
      v-on:successeditproduct="successeditproduct"
      v-on:successaddproduct="successaddproduct"
      v-on:successdelete="successdelete"
      v-bind:category-list="categoryList"
      v-bind:product-list="productList"
      v-on:getsinglepage="getsinglepage"
      v-bind:is-login="isLogin"
      v-on:fetch-category="fetchCategory"
      v-bind:search-result="searchResult"
    />

    <footer class="footer">
      <div class="container">
        <small class="text-muted">Copyright © 2019 Teekultur</small>
      </div>
    </footer>

    <ModalLogin v-on:loginsuccess="loginsuccess"></ModalLogin>
    <ModalRegister></ModalRegister>
  </div>
</template>

<script>
import ModalLogin from "./components/ModalLogin.vue";
import ModalRegister from "./components/ModalRegister.vue";

export default {
  components: {
    ModalLogin,
    ModalRegister
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.fetchCategory();
      this.fetchProducts();
    }

    if (this.$route.name == "carts") {
      this.fetchCartData();
    }
  },
  data() {
    return {
      isLogin: false,
      categoryList: [],
      productList: [],
      searchResult : [],
      role: "",
      searchInput : ""
    };
  },
  methods: {
    successdelete() {
      this.fetchProducts();
    },
    successeditproduct() {
      this.fetchProducts();
    },
    successaddproduct(name) {
      this.fetchProducts();
    },
    showProducts() {
      this.$router.push("/products");
    },
    loginsuccess() {
      this.isLogin = true;
      this.role = localStorage.getItem("role");
      this.fetchProducts();
      this.$router.push("/products");
    },
    getsinglepage(id) {
      this.$router.push(`/products/${id}`);
    },
    signOut() {
      localStorage.clear();
      this.isLogin = false;
      this.role = "";
      this.swal.fire("Logged out", "Have a nice day", "success");
      this.$router.push("/");
    },
    fetchProducts() {
      this.axios
        .get("/products")
        .then(({ data }) => {
          this.productList = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    pushSearch() {
      this.axios
        .get(`/products`, {params : {name : this.searchInput, category : this.searchInput}})
        .then(({data}) => {
          this.searchResult = data
          this.$router.push('/search')
          this.searchInput = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCategory() {
      this.axios
        .get(`/categories`)
        .then(({ data }) => {
          this.categoryList = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


<style>
html {
  position: relative;
  min-height: 100%;
}
body {
  font-family: "Lato", sans-serif;
  margin-bottom: 90px;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background-color: #f5f5f5;
}

nav {
  position: absolute;
}

.navclr {
  color: darkolivegreen;
}
</style>
