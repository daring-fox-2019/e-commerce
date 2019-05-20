<template>
     <div>
    <div class=" mt-5 d-flex justify-content-center">
        <div class="row" style="background-color:#F0E6C7">
            <img :src="gif" style="height:350px; width:450px">
        </div>
      <form style="background-color:#FEF0C5" class="p-3" @submit.prevent="userRegister">
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            v-model= "username"
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Username"
            style="border:none"
          >
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            v-model = "email"
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
            >Already have an account? <router-link to = "/login"> Login </router-link></small>
            <br>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/api/server.js'
export default {
    name:'register',
    data () {
      return {
        gif : 'https://i.gifer.com/XfQ8.gif',
        username : '',
        email : '',
        password : ''
      }
    },
    methods : {
      userRegister () {
        this.gif = 'http://bsn.ie/wp-content/uploads/2018/06/QuarterlyThirdBlacklab.gif'
        setTimeout( () => {
            axios.post('/user/register',{
              username : this.username,
              email : this.email,
              password : this.password
              })
              .then( ({data}) =>{
                localStorage.setItem('token',data.token)
                this.$store.commit('login')
                this.$router.push('/')
              })
              .catch(err =>{
                console.log(err)
              })
        },2000)
      }
    }
}
</script>

<style>

</style>
