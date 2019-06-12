<template>
  <BaseAuthForm
    :errMessage="errMessage"
    @submit="onSubmit"
  >
    <template #header>
      <div class="has-text-centered mbm">
        <p class="is-size-4">Register</p>
        <p>
          Already has an account?
          <router-link to="/login">Login</router-link>
        </p>
      </div>
    </template>
    <template #footer>
      <button
        type="submit"
        class="button is-medium is-success is-fullwidth mtl"
      >Register</button>
    </template>
  </BaseAuthForm>
</template>

<script>
import api from '../api.js'

import BaseAuthForm from './BaseAuthForm.vue'

export default {
  name: 'AuthFormRegister',
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
        .register(payload)
        .then(({ data }) => {
          this.$alertify.alert(
            'Success',
            'Successfully created your account, please login to continue'
          )
          this.$router.push('/login')
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
