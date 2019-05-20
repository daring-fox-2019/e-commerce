<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <button
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
        class="navbar-toggler collapsed"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <form class="form-inline my-2 my-lg-0">
        <input type="search" placeholder="Search" aria-label="Search" class="form-control mr-sm-2">
        <button type="submit" class="btn btn-outline-success my-2 my-sm-0">Search</button>
      </form>
      <div id="navbarTogglerDemo01" class="navbar-collapse collapse" style>
        <a
          href="/"
          class="router-link-active"
          style="text-decoration: none; color: white;"
        >Tocopedia</a>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <a href="/register" class style="text-decoration: none; color: white;">Register</a>
          </li>
          <li class="nav-item mt-2">
            <a href="/login" class style="text-decoration: none; color: white;">Login</a>
          </li>
          <li class="nav-item mt-2">
            <a href="/store" class style="text-decoration: none; color: white;">Store</a>
          </li>
          <li class="nav-item mt-2">
            <a href="/mycart" class style="text-decoration: none; color: white;">Cart</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
    <footer
      class="footer mt-auto py-3"
      style="background-color: rgb(245, 245, 245); text-align: center;"
    >
      <div class="container">
        <span class="text-muted">Tocopedia | copyright 2019</span>
      </div>
    </footer>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {};
  }
};
</script>
