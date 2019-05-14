<template>
  <v-container fluid fill-height>
    <v-layout align-start justify-center>
      <v-flex xs12 sm10 md6>
        <v-card class="elevation-12">
          <v-toolbar light color="white">
            <v-toolbar-title>LOGIN</v-toolbar-title>
          </v-toolbar>
          <v-layout>
            <v-flex xs12 sm12 md12>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="yellow" light>Login</v-btn>
                <v-btn light to="/">Back</v-btn>
                <div class="g-signin2" style="height: 60px; width: 100%;" data-onsuccess="onSignIn"></div>
              </v-card-actions>
            </v-flex>
            <v-flex>
                <v-divider vertical></v-divider>
            </v-flex>
            <v-flex xs12 sm12 md12>
                <v-layout column>
                    <v-flex dark pa-2>
                        <h4>Or login with:</h4>
                    </v-flex>
                    <v-flex pa-3>
                        <div class="g-signin2" data-width="300" data-height="200" data-longtitle="true"></div>
                        <div id="google-signin-button" style="width: 100%;"></div>
                    </v-flex>
                </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style scoped>
.abcRioButtonContentWrapper {
    width: 100%;
}
</style>

<script>
import api from '../api/backend.js'

export default {
    data() {
        return {
            isGoogleLogin: false,
        }
    },
    mounted() {
    gapi.signin2.render('google-signin-button', {
        'scope': 'profile email',
        'width': 200,
        'height': 50,
        'font-size': 12,
        'theme': 'dark',
        'onsuccess': this.onSignIn
    })
    },
    methods: {
        onSignIn (user) {
            const profile = user.getBasicProfile()
            const idToken = user.getAuthResponse().id_token;
            this.isGoogleLogin = true

            // call backend for google sign in
            api.post('/auth/google', {token: idToken})
                .then(({data}) => {
                    swal.fire('Nice!', `Welcome, ${profile.getName()}`, 'success')
                    this.$emit('success')
                    this.$router.push('/')
                })
                .catch(({response}) => {
                    swal.fire('Oops!', response.data, 'error')
                })
        }
    }
};
</script>