<template>
  <div class="container" style="padding-top:50px;margin-left:11%">
    <div class="row d-flex justify-content-center py-4">
      <h2>Register</h2>
    </div>
    <div class="row d-flex justify-content-center">
      <b-form @submit.prevent="register" class="px-5">
        <b-form-group id="name-register-label" label="Your Name:" label-for="name-register-input">
          <b-form-input
            id="name-register-input"
            v-model="userRegister.name"
            type="text"
            required
            placeholder="Enter your name"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="email-register-label"
          label="Email address:"
          label-for="user-register-email"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="user-register-email"
            v-model="userRegister.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="password-register-label"
          label="Password:"
          label-for="password-register-input"
          description="We'll never share your password with anyone else."
        >
          <b-form-input
            id="password-register-input"
            v-model="userRegister.password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
        <div class="d-flex justify-content-center pb-4">
          <b-button class="mt-3" variant="primary" type="submit">Sign me up!</b-button>
        </div>
      </b-form>
    </div>
    <div class="row d-flex justify-content-center">
      <router-link to="/login">
        <small>Back to login page</small>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "@/api/server/axios";
export default {
  data() {
    return {
      userRegister: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  methods: {
    register() {
      axios
        .post("/users", {
          email: this.userRegister.email,
          password: this.userRegister.password,
          name: this.userRegister.name
        })
        .then(({ data }) => {
          this.userRegister.name = "";
          this.userRegister.email = "";
          this.userRegister.password = "";
          this.$router.push("login");
          this.$swal("Welcome!", `Now you may log in, ${data.name}`, "success");
        })
        .catch(err => {
          this.$swal(`Oops..`, "Something went wrong", "error");
        });
    }
  }
};
</script>
