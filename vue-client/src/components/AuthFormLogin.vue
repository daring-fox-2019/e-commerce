<template>
  <BaseAuthForm
    :errMessage="errMessage"
    @submit="onSubmit"
  >
    <template #header>
      <div class="level mbm">
        <p class="is-size-4 level-left">Login</p>
        <router-link
          class="level-right"
          to="/register"
        >Register</router-link>
      </div>
    </template>
    <template #footer>
      <button
        type="submit"
        class="button is-medium is-success is-fullwidth mtl"
      >Login</button>
      <p class="mts">
        Doesn't have an account yet?
        <router-link to="/register">Register</router-link>
      </p>
    </template>
  </BaseAuthForm>
</template>

<script>
import api from '../api.js'

import BaseAuthForm from './BaseAuthForm.vue'

export default {
  name: 'AuthFormLogin',
  components: {
    BaseAuthForm
  },
  data: function () {
    return {
      errMessage: ''
    }
  },
  methods: {
    onSubmit: function (payload) {
      api
        .login(payload)
        .then(({ data }) => {
          console.log(this.$alertify
            .success(`Welcome, ${data.user.email}`)
            .delay(3))
          this.$emit('login', data)
        })
        .catch((err) => {
          let { response } = err
          if (response && (response.status >= 400 && response.status < 500)) {
            this.errMessage = response.data.message
          } else {
            console.log(err)
          }
        })
    }
  }
}
</script>

<style>

</style>
