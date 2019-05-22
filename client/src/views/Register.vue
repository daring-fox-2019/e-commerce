<template>
  <div class="container" style="padding-top:100px;">
    <h1>Register</h1>
    <form @submit.prevent="submitRegister">
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input v-model="formInput.name" type="text" class="form-control" placeholder="Create name">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input v-model="formInput.email" type="email" class="form-control" placeholder="Your email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          v-model="formInput.password"
          type="password"
          class="form-control"
          placeholder="Password"
        >
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
      Already have an account?
      <a href="#" @click="showLoginPage">Login</a>
    </form>
  </div>
</template>

<style>
</style>

<script>
import myServer from '@/api/myServer';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      formInput: {
        name: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    submitRegister() {
      myServer.defaults.headers.common.token = localStorage.token;
      myServer
        .post('/user/register', this.formInput)
        .then(({ data }) => {
          Swal.fire('Good job!', "You've successfully registered!", 'success');
          this.$router.push('/login');
        })
        .catch((err) => {
          console.log(err.response.data.message);

          Swal.fire({
            type: 'error',
            title: 'Sorry :(',
            text: `${err.response.data.message}`,
          });
        });
    },
    showLoginPage() {
      this.$router.push('/login');
    },
  },
};
</script>
