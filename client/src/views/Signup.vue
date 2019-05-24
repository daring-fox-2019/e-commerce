<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="dark">
            <v-toolbar-title>Signup</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="name"
                v-model="signup.name"
                label="Full name"
                type="text"
              ></v-text-field>
              <v-text-field
                prepend-icon="person"
                name="email"
                v-model="signup.email"
                label="Email"
                type="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                v-model="signup.password"
                label="Password"
                id="password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="signUp">Send</v-btn>
            <v-btn to="/signin" color="red">Back</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      signup: {
        name: '',
        email: '',
        password: '',
      },

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    };
  },
  methods: {
    reset() {
      this.signup.name = '',
      this.signup.email = '',
      this.signup.password = '';
    },
    signUp() {
      axios
        .post('http://localhost:3000/user/signup', this.signup)
        .then(() => {
          this.reset();
          swal('Signup Success!', 'success');
          this.$router.push('/signin');
        })
        .catch((err) => {
          swal('Signup Failed!', 'warning');
          console.log(err);
        });
    },
  },
};
</script>
