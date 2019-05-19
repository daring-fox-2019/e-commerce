<template>
  <b-form @submit.prevent="onSubmitLogin">
    <b-form-group>
      <b-form-input 
        v-model="email" 
        type="email" 
        placeholder="Input your email" 
        aria-autocomplete="off"
        required
    />
    </b-form-group>

    <b-form-group>
      <b-form-input v-model="password" type="password" placeholder="Password" required/>
    </b-form-group>

    <div class="text-center">
      <b-button type="submit" variant="success" block>Sign In</b-button>
      <router-link :to="{ name: 'signup' }">Sign Up</router-link>
    </div>
  </b-form>
</template>

<script>
    export default {
        name: 'signin',
        methods: {
            onSubmitLogin() {
                this.$router.push('/')
            }
        },
        data() {
          return {
            name:'',
            password:'',
            email:''
          }
        },  
    }
</script>
