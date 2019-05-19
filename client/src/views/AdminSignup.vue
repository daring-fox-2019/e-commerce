<template>
  <b-form @submit.prevent="onSubmitRegister">
    <b-form-group>
      <b-form-input 
        v-model="adminSignupForm.name" 
        type="text" 
        placeholder="Input your name" 
        aria-autocomplete="off"
        required
    />
    </b-form-group>

    <b-form-group>
      <b-form-input
        v-model="adminSignupForm.email" 
        type="email" 
        placeholder="Input your email" 
        aria-autocomplete="off"
        required
    />
    </b-form-group>

    <b-form-group>
      <b-form-input v-model="adminSignupForm.password" type="password" placeholder="Password" required/>
    </b-form-group>

    <div class="text-center">
      <b-button type="submit" variant="success" block>Sign Up</b-button>
      <router-link :to="{ name: 'signin' }">Login</router-link>
    </div>
  </b-form>
</template>

<script>
  export default {
      name: 'signup',
      methods: {
          onSubmitRegister() {
            this.$emit('signup-admin', this.adminSignupForm)
          }
      },
      data() {
        return {
          adminSignupForm: {
              name:'',
              email:'',
              password:''
          }
        }
      },  
  }
</script>
