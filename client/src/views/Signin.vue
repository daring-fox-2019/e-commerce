<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="dark">
            <v-toolbar-title>Signin</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="login"
                v-model="signin.email"
                label="Email"
                type="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                v-model="signin.password"
                label="Password"
                id="password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <span>
              <router-link to="/signup">Not Registered?</router-link>
            </span>
            <v-btn flat @click="signIn">Signin</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      signin: {
        email: "",
        password: ""
      },
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    signIn() {
      axios
        .post("http://localhost:3000/user/signin", this.signin)
        .then(({ data }) => {
          this.signin.email = "";
          this.signin.password = "";
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.name);
          localStorage.setItem("role", data.role);
          this.$store.commit("setLogin", true);
          if (data.role) {
            this.$store.commit("setAdmin", true);
          }
          swal("Welcome back!", "Login Success", "success");
          this.$router.push("/");
        })
        .catch(err => {
          swal("Signin Failed!", "warning");
          console.log(err);
        });
    }
  }
};
</script>
