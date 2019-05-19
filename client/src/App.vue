<template>
  <div id="app">
    <Navbar
      @click-logout="logout"
    />
    <div class="container">
      <router-view
        @signup-admin="signupAdmin"
        @sign-in="signIn"
        @sign-up="signUp"
        @submit-product="submitProduct"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  import Footer from '@/components/Footer.vue'
  import api from '@/api/localapi'
  import {convertToRupiah } from '@/helpers/convertToRupiah.js'

  export default {
    name: 'app',
    components: {
      Navbar,
      Footer
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
      this.token = localStorage.token || ''

      if(localStorage.token) {
        this.$store.state.isLoggedIn = true
        this.$store.state.token = localStorage.token
      }

    },
    methods: {
      submitProduct(data) {
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

          Swal.fire({
            type: 'error',
            title: 'Create product denied',
            text: `${err.response.data.message}`,
          })
        })
      },
      signUp(payload) {
        const {name, email, password} = payload;

        api
        .post('/users/signup', {
          name,
          email,
          password
        })
        .then(user => {
          Swal.fire(
            'Success!',
            `You successfully register ${user.data.name}!`,
            'success'
          )
          this.$router.push('/')
          payload = {}
        })
        .catch(err => {
          console.log(err);
        })
      },
      signIn(payload) {
        const { email, password } = payload;

        api
        .post('/users/signin', {
          email,
          password
        })
        .then(({data}) => {
          Swal.fire(
            'Success!',
            'success'
          )
          this.$store.dispatch('signIn')
          localStorage.token = data.token
          this.$router.push('/')
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: `${err.response.data.message}`
          })
        })
      },
      logout() {
        localStorage.clear()
        this.$store.state.isLoggedIn=false
        this.$router.push('/')
      },
      signupAdmin(payload) {
        const {name, email, password} = payload

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
