<template>
  <div class="login">
    <div class="container" style="width: 30%;">
      <b-form @submit.prevent="loginFormSubmit">
        <b-form-group id="login-form-email" label="Email address:" label-for="login-email">
          <b-form-input id="login-email" v-model="loginForm.email" type="email" required></b-form-input>
        </b-form-group>

        <b-form-group id="login-form-password" label="Password:" label-for="login-password">
          <b-form-input id="login-password" v-model="loginForm.password" type="password" required></b-form-input>
        </b-form-group>
        <b-button type="submit" size="sm" block variant="primary">Login</b-button>
        <router-link to="/">
          <b-button size="sm" class="mt-2" block variant="outline-primary">Cancel</b-button>
        </router-link>

      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios";
import Swal from "sweetalert2";

export default {
  name: "Navbar1",
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
    };
  },
  methods: {
    loginFormSubmit(evt) {
      evt.preventDefault();

      const userData = this.loginForm;

      axios({
        method: "POST",
        url: `/login`,
        data: userData
      })
        .then(({ data }) => {
          console.log(data);

          this.loginForm.email = "";
          this.loginForm.password = "";
          this.$store.dispatch("login");
          this.$router.push("/");
          localStorage.userId = data.id;
          localStorage.token = data.token;
          localStorage.email = data.email;
          localStorage.fullName = data.fullName;
          localStorage.displayPicture = data.displayPicture;
        })
        .catch(err => {
          console.log(err);

          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "error",
            title: "Wrong username/password"
          });
        });
    }
  }
};
</script>