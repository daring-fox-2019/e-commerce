<template>
  <div id="app">
    <Navbar/>
    <div class="container">
      <router-view 
        @submit-product="submitProduct"
      />
    </div>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  import api from '@/api/localapi'

  export default {
    name: 'app',
    components: {
      Navbar,
    },
    data() {
      return {
        token: ''
      }
    },
    mounted() {
      this.token = localStorage.token || ''
    },
    methods: {
      submitProduct(data) {
        api
        .post('/products', {
          name: data.name,
          price: data.price
        })
        .then(product=> {
          Swal.fire(
            'Product created!',
            '',
            'success'
          )
        })
        .catch(err=> {
          console.log(err);
        })
      },
      
    }
  }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
