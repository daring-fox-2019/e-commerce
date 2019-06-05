<template>
  <div class="container" style="padding: 100px">
    <div class="row d-flex justify-content-center">
      <h1>Welcome</h1>
    </div>
    <div class="row d-flex justify-content-center pt-5">
      <b-form @submit.prevent="login">
        <b-form-group
          id="email-label"
          label="Email address:"
          label-for="user-email"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="user-email"
            type="email"
            v-model="userLogin.email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="password-label"
          label="Password:"
          label-for="password-input"
          description="We'll never share your password with anyone else."
        >
          <b-form-input
            id="password-input"
            type="password"
            v-model="userLogin.password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
        <div class="d-flex justify-content-between">
          <b-button class="mt-3" type="submit" variant="success">Login</b-button>
          <router-link to="/register">
            <b-button class="mt-3" variant="primary">Register</b-button>
          </router-link>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "@/api/server/axios";
export default {
  name: "Login",
  data() {
    return {
      userLogin: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      axios
        .post("/users/login", {
          email: this.userLogin.email,
          password: this.userLogin.password
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          axios
            .get("/carts/owned", {
              headers: {
                token: localStorage.token
              }
            })
            .then(({ data }) => {
              this.userLogin.password = "";
              this.$swal(
                "Welcome!",
                "You have successfully logged in",
                "success"
              );
              this.$router.push({ path: "/" });
              this.$emit("login", data);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          this.$swal("Oops..", "Invalid email/password", "error");
          this.userLogin.password = "";
        });
    }
  }
};
</script>
