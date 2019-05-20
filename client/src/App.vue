<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">home</router-link>|
      <router-link to="/edit-product">product-edit</router-link>|
      <router-link to="/login">login</router-link>|      
      <router-link to="/register">register</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { mapState } from "vuex";
import backend from "@/api/api";

export default {
  computed: mapState(["token", "user"]),

  mounted() {
    if (localStorage.getItem("token")) {
      backend
        .post(`/auth/verify`)
        .then(response => {
          this.$store.commit("setUser", response.data);
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
          this.$store.commit("setUser", null);
        });
    }
  }
  
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/dist/bootstrap-vue.css";
@import url("https://fonts.googleapis.com/css?family=Baloo+Bhai&display=swap");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
