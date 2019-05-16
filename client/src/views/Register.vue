<template>
  <v-container fluid fill-height>
    <v-layout align-start justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar light color="white">
            <v-toolbar-title>REGISTER</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="register">
            <v-card-text>
              <v-text-field
                prepend-icon="person"
                name="login"
                label="Email"
                type="email"
                v-model="formData.email"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="formData.password"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="account_circle"
                name="firstname"
                label="First name"
                type="text"
                v-model="formData.firstname"
              ></v-text-field>
              <v-text-field
                prepend-icon="account_circle"
                name="lastname"
                label="Last name"
                type="text"
                v-model="formData.lastname"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="yellow" type="submit" light>Register</v-btn>
              <v-btn light to="/login">Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import api from "../api/backend.js";

export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
        firstname: "",
        lastname: ""
      }
    };
  },
  methods: {
    clearForm() {
      this.formData = {
        email: "",
        password: "",
        firstname: "",
        lastname: ""
      };
    },
    register() {
      console.log("register..", this.formData);
      api
        .post("/auth/register", this.formData)
        .then(({ data }) => {
          swal.fire(
            "Great!",
            `You've successfully registered! Please continue to login.`,
            "success"
          );
          this.clearForm();
        })
        .catch(err => {
          if (err.response) {
            swal.fire("Oops!", err.response.data, "error");
          } else {
            swal.fire("Oops!", err, "error");
          }
        });
    }
  }
};
</script>
