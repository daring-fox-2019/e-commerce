<template>
  <div>
      <div class="container my-4">
        <div class="row justify-content-center">
          <div class="col-4">
            <div class="card mb-4">
              <div class="card-header text-center">Register</div>

              <div class="card-body">
                <form method="post">
                  <div class="form-group">
                    <label for="email">Username</label>
                    <input v-model="username" type="email" class="form-control" id="email" aria-describedby="emailHelp"
                      placeholder="Username">
                  </div>
                  <div class="form-group">
                    <label for="email">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp"
                      placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
                  </div>
                  <button v-on:click.prevent="newUserRegister" type="submit" class="btn btn-primary">Submit</button>
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
    return {
      username : '',
      email : '',
      password : ''
    }
  },
  methods : {
    newUserRegister() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/register',
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
           this.$router.replace({ path: '/login' })
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        })
    },

  }
}
</script>

<style>

</style>
