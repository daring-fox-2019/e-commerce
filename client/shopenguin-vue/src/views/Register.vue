<template>
  <div class="register">
    <div class="container" style="width: 30%; padding-top: 5%;">
      <b-form @submit.prevent="registerFormSubmit">
        <b-form-group id="register-form-email" label="Email address:" label-for="register-email">
          <b-form-input id="register-email" v-model="registerForm.email" type="email" required></b-form-input>
        </b-form-group>

        <b-form-group
          id="register-form-full-name"
          label="Full Name:"
          label-for="register-full-name"
        >
          <b-form-input id="register-full-name" v-model="registerForm.fullName" required></b-form-input>
        </b-form-group>

        <b-form-group id="register-form-password" label="Password:" label-for="register-password">
          <b-form-input
            id="register-password"
            v-model="registerForm.password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" size="sm" block variant="primary">Register</b-button>
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
      registerForm: {
        email: "",
        fullName: "",
        password: ""
      }
    };
  },
  methods: {
    loginFormSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.loginForm));
    },
    registerFormSubmit(evt) {
      evt.preventDefault();

      const userData = this.registerForm;

      axios({
        method: "POST",
        url: `/register`,
        data: userData
      })
        .then(({ data }) => {
          console.log(data);

          this.registerForm.email = "";
          this.registerForm.fullName = "";
          this.registerForm.password = "";
          this.$router.push("/");
          localStorage.userId = data.id;
          localStorage.token = data.token;
          localStorage.email = data.email;
          localStorage.fullName = data.fullName;
          localStorage.displayPicture = data.displayPicture;

          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "success",
            title: "Register successful"
          });
        })
        .catch(err => {
          console.log(err);

          this.registerForm.email = "";
          this.registerForm.fullName = "";
          this.registerForm.password = "";

          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "error",
            title: "Email has been used already"
          });
        });
    }
  }
};
</script>
