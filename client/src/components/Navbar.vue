<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">Halo {{ $store.state.name }}</a>
      <form @submit.prevent="searchProducts" class="form-inline">
        <input
          v-model="searchText"
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        >
        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>

      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
            <span class="sr-only">(current)</span>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">All Products</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link">Cart</router-link>
          </li>
          <li class="nav-item">
            <a @click="logout" class="nav-link" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    },
    searchProducts() {
      this.$store.dispatch("searchProducts", this.searchText);
      this.$router.push("/products");
    }
  }
};
</script>
