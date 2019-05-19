<template>
  <div id="app">
    <Navbar
      @click-logout="logout"
    />
    <div class="container">
      <router-view
        @signup-admin="signupAdmin"
        @submit-product="submitProduct"
      />
    </div>
    
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  import api from '@/api/localapi'
  import {convertToRupiah } from '@/helpers/convertToRupiah.js'

  export default {
    name: 'app',
    components: {
      Navbar,
    },
    methods: {
      convertToRupiah
    },
    data() {
      return {
        token: ''
      }
    },
    mounted() {
      this.$store.dispatch('getCartLoggedInUser')
      this.token = localStorage.token || ''

      if(localStorage.token) {
        this.$store.state.isLoggedIn = true
        this.$store.state.token = localStorage.token
      }

    },
    methods: {
      submitProduct(data) {
        console.log('data payload create: ', data);
        const { name, price, stock, category, description, picture } = data

        let formData = new FormData()
        
        formData.append('name', name)
        formData.append('price', price)
        formData.append('stock', stock)
        formData.append('category', category)
        formData.append('description', description)


        if(data.picture) {
            formData.append('picture', picture)
        }

        api
        .post('/admin/products', formData)
        .then(product=> {
          Swal.fire(
            'Product created!',
            '',
            'success'
          )
        })
        .catch(err=> {
          console.log(err.response);
        })
      },
      logout() {
        localStorage.clear()
        this.$store.state.isLoggedIn=false
      },
      signupAdmin(payload) {
        const {name, email, password} = payload

        console.log('admin payload: ', payload);

        api
        .post('/admin/signup', {
          name,
          email,
          password
        })
        .then(admin => {
          Swal.fire(
            'Create new Admin!',
            'success'
          )
        })
        .catch(err => {
          console.log(err.response);
        })
      }
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
