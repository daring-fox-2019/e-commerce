<template>
  <div>
    <div class=" mt-5 d-flex justify-content-center">
        <div>
            
        </div>
        <div class="row" style="background-color:#F0E6C7">
            <img :src="gif" style="height:350px; width:450px">
        </div>
      <form style="background-color:#FEF0C5" class="p-3" @submit.prevent="userLogin">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            v-model= "email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            style="border:none"
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            v-model = "password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            style="border:none"
          >
        </div>
            <small
            id="emailHelp"
            class="form-text text-muted"
            >Don't have an account? <router-link to = "/register"> Register </router-link></small>
            <br>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/api/server.js'
export default {
  name: "login",
  data () {
      return {
          gif : 'https://i.gifer.com/XfQ8.gif',
          email : '',
          password : ''
      }
  },
  methods: {
      userLogin() {
            this.gif=('http://bsn.ie/wp-content/uploads/2018/06/QuarterlyThirdBlacklab.gif')
            setTimeout(() => {
              axios.post('/user/login',{
                email : this.email,
                password : this.password
              })
              .then(({ data }) =>{
                console.log('berhasil login',data)
                localStorage.setItem('token',data.token)
                this.$store.commit('login')
                this.$router.push('/')
                // console.log('berhasil login')
                // console.log(data)
              })
              .catch( err =>{
                console.log(err)
              })
            }, 2000);
      }
  }
};
</script>



<style>
</style>
