<template>
  <div class="home">
    <!-- <h1>{{page}}</h1> -->
    <Login v-if="page === 'login'"/>
    <Register v-if="page === 'register'"/>
    <formAddProduct v-if="page === 'addProduct'"/>
    <listproduct v-bind:lisproduct="listproduct" />
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import formAddProduct from '@/components/addProduct.vue'
import ListProduct from '@/components/listProduct.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Login,
    Register,
    formAddProduct,
    ListProduct
  },
  props : ['page','listproduct','islogin'],
  created(){
    this.$router.push({path:'/login'})
  }
}
</script>
