<template>
  <div>
    <h4 class="text-center">Sign In</h4>

    <b-form @submit.prevent="onSubmitLogin">
      <b-form-group>
        <b-form-input 
          v-model="loginForm.email" 
          type="email" 
          placeholder="Input your email" 
          aria-autocomplete="off"
          required
      />
      </b-form-group>

      <b-form-group>
        <b-form-input v-model="loginForm.password" type="password" placeholder="Password" required/>
      </b-form-group>

      <div class="text-center">
        <b-button type="submit" variant="success" block>Sign In</b-button>
        <router-link :to="{ name: 'signup' }">Sign Up</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
    export default {
        name: 'signin',
        methods: {
          onSubmitLogin() {
              this.$emit('sign-in', this.loginForm)
          }
        },
        data() {
          return {
            loginForm: {
              password:'',
              email:''
            }
          }
        },  
    }
</script>
