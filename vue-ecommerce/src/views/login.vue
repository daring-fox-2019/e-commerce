<template>
  <div class="ecommerce mt-3" style="color : green">
    <div class='d-flex col-12 justify-content-center'>
      <div class="row card col-6" style="background-color: antiqueWhite">
        <h1 class="card-header" style="font-family : 'Fugaz One',serif; color : green">JajanMas</h1>
        <div class="card-body">
          <b><h5> Login Here</h5></b>
          <hr>
          <div>
            <b-form @submit.prevent="login">
              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  type="password"
                  v-model="form.password"
                  required
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="success">Login</b-button>
            </b-form>
              <br>
              <h4>Don't have any account yet? register below!</h4>
              <router-link to="/register" class="btn btn-success" variant="primary">Register</router-link>
              <!-- <b-button type="submit" variant="primary">Submit</b-button> -->
          </div>
        </div>
      </div>
    </div>
    <br>
      <div class="card col-2 offset-5" style="background-color: antiqueWhite">
        <h4>Back to Homepage?</h4>              
        <router-link to="/" class="btn btn-success" variant="primary">homepage</router-link>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import swal from 'sweetalert2'

  export default {
    data() {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },
    computed : {
        isLogin : function(){
          return this.$store.state.isLogin
        }
    },
    watch: {
      isLogin(){
        if(this.isLogin === true){
          Swal.fire('Login Success',`welcome ${localStorage.fullName}!`, 'success')
          this.$router.push('/')
        }
      }
    },
    methods: {
      login(){
        console.log('login trigerred',this.form.email,this.form.password);
        let data = {
          email : this.form.email,
          password : this.form.password
        }
        this.$store.dispatch('login',data)
      }
    },
    mounted(){
      console.log('di mounted',this.isLogin);
      if(this.isLogin){
        console.log('login ini nih');
      }
    }
  }
</script>

<style>
  .ecommerce{
    height: 880px
  }
</style>
