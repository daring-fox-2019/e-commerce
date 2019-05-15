<template>
  <div class="container border p-5" style="margin-top:100px;width:30%;padding-bottom:100px">
    <b-form @submit.prevent="login">
      <b-form-group
        id="form-email"
        label="Email address:"
        label-for="email"
        description="We'll never share your email with anyone else."
      >
        <b-form-input id="email" type="email" required v-model="email" placeholder="Enter email"></b-form-input>
      </b-form-group>

      <b-form-group id="form-passoword" label="Password:" label-for="password">
        <b-form-input
          id="password"
          required
          type="password"
          v-model="password"
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success" block>
        <i class="fas fa-torii-gate"></i> Login
      </b-button>
    </b-form>
    <hr>
    <p>dont have an account ?</p>

    <router-link to="/register">
      <b-button type="button" variant="outline-success" block size="sm">
        <i class="fas fa-user-plus"></i> Register
      </b-button>
    </router-link>
  </div>
</template>

<script>
import axios from "@/database/axios";

export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    login() {
      axios
        .post("/users/login", { email: this.email, password: this.password })
        .then(({ data }) => {
            console.log(data)
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.name);
          localStorage.setItem("id", data.id);
          this.$swal('Login Success','','success');
          this.$router.push('/');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

