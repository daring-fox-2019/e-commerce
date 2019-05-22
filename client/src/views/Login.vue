<template>
  <div class="container" style="padding-top:100px;">
    <h1>Login</h1>
    <form @submit.prevent="submitLogin()">
      <div class="form-group">
        <label>Email address</label>
        <input v-model="formInput.email" type="email" class="form-control" placeholder="Your email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          v-model="formInput.password"
          type="password"
          class="form-control"
          placeholder="Password"
        >
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <br>Don't have an account yet?
      <a @click="showRegisterPage" href="#">Register</a>
    </form>
  </div>
</template>

<style>
</style>

<script>
export default {
  data() {
    return {
      formInput: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    submitLogin() {
      this.$store.dispatch('setLogin', this.formInput);
    },
    showRegisterPage() {
      this.$router.push('/register');
    },
  },
};
</script>
