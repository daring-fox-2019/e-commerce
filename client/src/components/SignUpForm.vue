<template>
  <b-form @submit.prevent="onSubmitRegister">
    <b-form-group>
      <b-form-input 
        v-model="signUpForm.name" 
        type="text" 
        placeholder="Input your name" 
        aria-autocomplete="off"
        required
    />
    </b-form-group>

    <b-form-group>
      <b-form-input
        v-model="signUpForm.email" 
        type="email" 
        placeholder="Input your email" 
        aria-autocomplete="off"
        required
    />
    </b-form-group>

    <b-form-group>
      <b-form-input v-model="signUpForm.password" type="password" placeholder="Password" required/>
    </b-form-group>

    <div class="text-center">
      <b-button type="submit" variant="danger" block>Sign Up</b-button>
      <router-link :to="{ name: 'signin' }">Login</router-link>
    </div>
  </b-form>
</template>

<script>
    export default {
        name: 'signup',
        methods: {
            onSubmitRegister() {
                alert('wkwkkwkwk')
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
    }
</script>
