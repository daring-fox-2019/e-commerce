<template>
  <div id="app">
       <nav class="mb-5 p-3 h-70 d-flex justify-content-end bg bg-primary">
          <form class="d-flex justify-content-end form-inline">
               <router-link to="/login">
               <button v-show="!isLogin" class="btn btn-info">login</button>
               </router-link>
               <button v-show="isLogin" @click.prevent="logout()" class="btn btn-danger">Log Out</button>
          </form>
      </nav> 
    <router-view
    v-on:ubahlogin="cekLogin"/>
  </div>
</template>

<script>
import ecommerce from "@/api/e-commerceApi";
export default {
  data(){
    return{
      isLogin: false
    }
  },
  mounted(){
    this.onStart()
  },
  methods: {
    logout(){
      localStorage.clear()
      this.$router.push('/')
       this.onStart()
    },
    onStart(){
      if(localStorage.token){
      this.isLogin = true 
    }else{
      this.isLogin = false
    }

    },
    cekLogin(status){
      this.isLogin = status

    }
  }


  
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
