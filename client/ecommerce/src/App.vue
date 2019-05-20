<template>
<div>
  <navbar />
    <router-view/>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import axios from '@/api/server.js'
export default {
  data() {
    return {
      isLogin :  false
    }
  },
  components: {
    Navbar
  },
  created() {
    if(localStorage.getItem('token')){
      let token = localStorage.getItem('token')
      axios.get('/authenticate',{ headers : { token } })
      .then(data =>{
        this.$store.commit('login')
      })
      .catch(err =>{

      })
    }
  }
}
</script>

<style>
</style>
