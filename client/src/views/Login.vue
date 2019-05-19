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
              <v-form @submit.prevent="processSignIn">
                <v-card-text>
                    <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="formData.email"></v-text-field>
                    <v-text-field
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                      v-model="formData.password"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="yellow" type="submit" light>Login</v-btn>
                  <v-btn light to="/">Back</v-btn>
                </v-card-actions>
              </v-form>
            </v-flex>
            <v-flex>
                <v-divider vertical></v-divider>
            </v-flex>
            <v-flex xs12 sm12 md12>
                <v-layout column>
                    <v-flex dark pa-2>
                        <h4>Or login with:</h4>
                    </v-flex>
                    <v-flex px-3>
                      <!-- <div class="g-signin2" data-width="300" data-height="200" data-longtitle="true"></div> -->
                      <div id="google-signin-button" style="width: 100%;"></div>
                    </v-flex>
                    <v-flex px-3 pb-3>
                      <v-btn class="linkedInButton" color="blue" :href="linkedInCodeRequestURL" block>
                        <v-icon>fab fa-linkedin</i></v-icon>&nbsp;&nbsp;LinkedIn
                      </v-btn>
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
.linkedInButton {
  width: 200px;
  height: 50px;
}
</style>

<script>
import api from '../api/backend.js'

export default {
    data() {
        return {
            isGoogleLogin: false,
            linkedinCode: null,
            formData: {
              email: '',
              password: '',
            }
        }
    },
    mounted() {
      this.linkedinCode = this.$route.query.code;
      console.log('linkedin arrive...', this.$route.query);
      
      /**
       * handle callback from Linkedin when request code is available
       * then we request our backend to get access token from Linkedin 
       * */
      
      if(this.linkedinCode) {
        api.get('/auth/linkedin/redirect/?code='+this.linkedinCode)
          .then(({data}) => {
            swal.fire('Login Success!', `Welcome, ${data.user.firstname}`, 'success')
            localStorage.setItem('ecomm_token', data.access_token)
            this.$store.commit('setUser', data.user)
            this.$store.commit('setIsLogin', true)
            this.$store.dispatch('getCurrentCart');
            this.$router.push('/')
          })
          .catch(({response}) => {
            swal.fire('Oops!', response.data, 'error')
          })
      }
      gapi.signin2.render('google-signin-button', {
          'scope': 'profile email',
          'width': 200,
          'height': 50,
          'font-size': 12,
          'theme': 'dark',
          'onsuccess': this.onGoogleSignIn
      })

    },
    computed: {
      linkedInCodeRequestURL() {
        return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.VUE_APP_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.VUE_APP_LINKEDIN_REDIRECT_URI}&scope=r_liteprofile%20r_emailaddress%20w_member_social`
      }
    },
    methods: {
        processSignIn() {
          api.post('/auth/login', this.formData)
                .then(({data}) => {
                    swal.fire('Nice!', `Welcome, ${data.user.firstname}`, 'success')
                    localStorage.setItem('ecomm_token', data.access_token)
                    this.$store.commit('setUser', data.user)
                    this.$store.commit('setIsLogin', true)
                    this.$router.push('/')
                })
                .catch((err) => {
                    if(err.response) {
                      swal.fire('Oops!', err.response.data, 'error')
                    }
                    else {
                      swal.fire('Oops!', err, 'error')

                    }
                })
        },
        onGoogleSignIn (user) {
            const profile = user.getBasicProfile()
            const idToken = user.getAuthResponse().id_token;
            this.isGoogleLogin = true

            // call backend for google sign in
            api.post('/auth/google', {token: idToken})
                .then(({data}) => {
                    swal.fire('Nice!', `Welcome, ${profile.getName()}`, 'success')
                    localStorage.setItem('ecomm_token', data.access_token)
                    this.$store.commit('setUser', data.user)
                    this.$store.commit('setIsLogin', true)
                    this.$router.push('/')
                })
                .catch(({response}) => {
                    swal.fire('Oops!', response.data, 'error')
                })
        }
    }
};
</script>