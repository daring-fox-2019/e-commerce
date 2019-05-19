<template>
  <div>
    <h4 class="text-center">Sign Up</h4>
    <b-form @submit.prevent="onSubmitRegister">
      <b-form-group>
        <b-form-input 
          v-model="signUpForm.name" 
          type="text" 
          placeholder="Input your name"
          autocomplete = "off"
          aria-autocomplete="off"
          required
      />
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-model="signUpForm.email" 
          type="email" 
          placeholder="Input your email"
          autocomplete = "off"
          aria-autocomplete="off"
          required
      />
      </b-form-group>

      <b-form-group>
        <b-form-input v-model="signUpForm.password" type="password" placeholder="Password" required/>
      </b-form-group>

      <div class="text-center">
        <b-button type="submit" variant="success" block>Sign Up</b-button>
        <router-link :to="{ name: 'signin' }">Login</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
  export default {
      name: 'signup',
      methods: {
          onSubmitRegister() {
            this.$store.dispatch('signUp', this.signUpForm)
          }
      },
      data() {
        return {
          signUpForm: {
              name:'',
              email:'',
              password:''
          }
        }
      },
      mounted() {
        this.signUpForm = {
          name:'',
          email: '',
          password: ''
        }
      },
  }
</script>
