<template>
  <b-container fluid>
    <br><br>
    <form @submit.prevent="login">
      <b-row class="my-3">
        <b-col sm="3" lg="4">
        </b-col>
        <b-col sm="2" class="label">
          <label for="input-none">Email :</label>
        </b-col>
        <b-col sm="4" lg="2">
          <b-form-input id="email" v-model='email' placeholder="your email here.."></b-form-input>
        </b-col>
        <b-col sm="3" lg="4">
        </b-col>
      </b-row>

      <b-row class="my-3">
        <b-col sm="3" lg="4">
        </b-col>
        <b-col class="label" sm="2">
          <label for="input-valid">Password :</label>
        </b-col>
        <b-col sm="4" lg="2">
          <b-form-input id="password" type="password" v-model='password'
            placeholder="your password here..">
          </b-form-input>
        </b-col>
        <b-col sm="3" lg="4">
        </b-col>
      </b-row>

      <b-row class="my-5">
        <button class="btn btn-dark" type="submit" id="login-btn" >Log In</button>
      </b-row>
    </form>

  </b-container>
</template>

<style>
  .label {
    text-align: left;
    color: black;
  }

  #login-btn {
    position: absolute;
    left: 48%
  }

</style>

<script>
import axios from '@/api/axios';
import Swal from 'sweetalert2';

export default {
  name: 'login',
  data() {
    return {
      email: 'jono@gmail.com',
      password: '123',
    };
  },
  methods: {
    login() {
      axios
        .post('users/login', {
          email: this.email,
          password: this.password,
        })
        .then((data) => {
          localStorage.setItem('jwtoken', data.data.jwtoken);
          localStorage.setItem('id', data.data.id);
          localStorage.setItem('username', data.data.name);
          localStorage.setItem('pp', data.data.pp);
          localStorage.setItem('watchTags', data.data.watchTags);
          localStorage.setItem('role', data.data.role);
          Swal.fire({
            type: 'success',
            text: 'you have successfully logged in!',
          });
          this.$emit('login');
          this.$router.push({
            path: '/',
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            type: 'error',
            text: 'Please check your input!',
          });
        });
    },
  },
};

</script>
