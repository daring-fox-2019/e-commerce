<template>
  <div id="navbartop">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link
            v-if="isLogin"            
            class="nav-link"
            to="/product">Product</router-link>
          </li>
          <li class="nav-item">
            <router-link
            v-if="!isLogin"
            class="nav-link"
            to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link
            v-if="!isLogin"
            class="nav-link"
            to="/register">Register</router-link>
          </li>
        </ul>
        <div class="row">
          <div class="mx-auto" style="size:40;">
            <form class="form-inline my-3 my-lg-3">
              <input
                v-if="isLogin"
                class="form-control mr-sm-1"
                type="search"
                placeholder="Search"
                aria-label="Search"
              >
              <button
              v-if="isLogin"
              class="btn btn-outline-success my-2 my-sm-0"
              type="submit">Search</button>
            </form>
          </div>
          <div class="row">
            <router-link
            v-if="isLogin"
            class="btn btn-outline-success my-3 my-lg-3"
            to="/cart">Cart</router-link>
            <button
            v-if="isLogin"
            class="btn btn-outline-danger my-3 my-lg-3"
            type="submit" @click.prevent="logout">Logout <i class="fas fa-sign-out-alt"></i></button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed : {
    ...mapState([
      'authors',
      'isLogin'
    ])
  },
  methods:{
    logout() {
      this.$store.commit('userLogout')
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('email')
      this.$router.push('/')
    },
  },
};
</script>
