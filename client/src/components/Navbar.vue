<template>
  <div class="ui secondary menu container" id="navv">
    <div class="header item">
      <h1 id="logo">Warung</h1>
    </div>
    <router-link to="/" class="item">Shop</router-link>
    <router-link to="/add-product" class="item" v-show="role">Add Product</router-link>
    <div class="right item">
      <router-link to="/cart" class="ui icon item" v-show="!role">
        <i class="shopping bag icon"></i>
        <div class="right floating ui olive circular label" v-show="totalItems">{{ totalItems }}</div>
      </router-link>
      <router-link to="/transactions" class="ui icon item" v-show="role">
        <i class="cash register icon"></i>
      </router-link>
      <router-link to="/login" class="item" v-show="!isLogin">Login</router-link>
      <a class="item" v-show="isLogin" @click="$emit('logout')">Logout</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    isLogin: Boolean,
    totalItems: Number
  },
  computed: {
    role() {
      return localStorage.getItem('email') == 'admin@warung.com'
    }
  }
};
</script>

<style>
#logo {
  font-family: "Staatliches", cursive;
  text-shadow: 3px 3px 0px rgba(36, 35, 35, 0.2);
}
</style>
