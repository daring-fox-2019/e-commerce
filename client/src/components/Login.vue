<template>
  <div>
    <div class="container my-4">
      <div class="row justify-content-center">
        <div class="col-4">
          <div class="card mb-4">
            <div class="card-header text-center">Login</div>

            <div class="card-body">
              <form method="post">
                <div class="form-group">
                  <label for="email">Email address</label>
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  >
                  <small
                    id="emailHelp"
                    class="form-text text-muted"
                  >We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                  >
                </div>
                <div class="row p-3" style="justify-content: space-between;">
                  <button
                    v-on:click.prevent="userLogin"
                    type="submit"
                    class="btn btn-primary"
                  >Submit</button>
                  <div class="g-signin2" id="google-button"></div>
                </div>
                <router-link class="nav-link" to="/register">
                  Create New Account
                </router-link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'  
export default {
  data(){
    return{
      email : '',
      password : ''
    }
  },
  methods : {
    userLogin() {
      let data = {email : this.email, password : this.password}
      this.$emit('userLogin', data)
    }
  }
};
</script>

<style>
</style>
