<template>
  <div class="container border p-5" style="margin-top:100px;width:34%;padding-bottom:100px">
    <meta
      name="google-signin-client_id"
      content="1047288130299-qnimdphrt0ksuu1km60qfn8sdu7daq6v.apps.googleusercontent.com"
    >

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
    <a ref="signinBtn" class="g-signin2">
      <button
        type="submit"
        v-google-signin-button="clientId"
        class="btn btn-outline-dark google-signin-button btn-sm my-2"
        style="width:100%"
      >
        <i class="fab fa-google"></i> Sign in with google
      </button>
    </a>

    <router-link to="/register">
      <b-button type="button" variant="outline-success" block size="sm">
        <i class="fas fa-user-plus"></i> Register
      </b-button>
    </router-link>
    <router-link to="/">
      <b-button class="mt-2" type="button" variant="outline-secondary" block size="sm">
        <i class="fas fa-arrow-left"></i> Back To Main Page
      </b-button>
    </router-link>
  </div>
</template>

<script>
import axios from "@/database/axios";
import GoogleSignInButton from "vue-google-signin-button-directive";

export default {
  directives: {
    GoogleSignInButton
  },
  data() {
    return {
      email: null,
      password: null,
      clientId: process.env.VUE_APP_CLIENT_ID_GOOGLE
    };
  },
  methods: {
    OnGoogleAuthSuccess(idToken) {
      
      axios
        .post("/oauth/google-sign-in", { idToken })
        .then(({ data }) => {
          this.$store.commit("setIsLogin", true);
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.name);
          localStorage.setItem("id", data.id);
          localStorage.setItem("role", data.role);

          this.$store.commit("setRole");
          if(data.status == 'need-address'){
             this.$swal("Need Input Adress", "", "info");
             this.$router.push(`/add-address/${data.id}`)
          } else {
            this.$swal("Login Success", "", "success");
          this.$router.push("/");
          }
          
        })
        .catch(err => {
          this.$swal("Oppss...", `${err.response.data.message}`, "error");
        });
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },
    login() {
      axios
        .post("/users/login", { email: this.email, password: this.password })
        .then(({ data }) => {
          this.$store.commit("setIsLogin", true);
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.name);
          localStorage.setItem("id", data.id);
          localStorage.setItem("role", data.role);

          this.$store.commit("setRole");
          this.$swal("Login Success", "", "success");
          this.$router.push("/");
        })
        .catch(err => {
          this.$swal("Oppss...", `${err.response.data.message}`, "error");
        });
    }
  }
};
</script>
