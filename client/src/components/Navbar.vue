<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo01"
      aria-controls="navbarTogglerDemo01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="#">Toko ku</a>
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
        <li class="nav-item" v-if="!iscustomer">
          <router-link class="nav-link" to="/addProduct">
            Add Product
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/listProduct">
            List Product
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      <router-link class="nav-link" to="/cartProduct">
        <button class="btn btn-outline-success my-2 my-sm-0 ml-2" type="submit">Cart</button>
      </router-link>
      <button
        class="btn btn-outline-success my-2 my-sm-0 ml-2"
        v-on:click.prevent="userLogout"
        type="submit"
      >LogOut</button>
    </div>
  </nav>
</template>

<script>
export default {
  // props : ['iscustomer'],
  data() {
    return {
      iscustomer: false
    };
  },
  created() {
    if (localStorage.role === "customer") {
      this.iscustomer = true;
    }
  },
  methods: {
    userLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      this.$router.push({ path: "/" });
      this.$emit("userLogout");
    }
  }
};
</script>

<style>
</style>
