<template>
  <div>
    <AuthFormLogin @login="$emit('login', $event)"/>
  </div>
</template>

<script>
import AuthFormLogin from '../components/AuthFormLogin.vue'

export default {
  name: 'LoginPage',
  components: {
    AuthFormLogin
  }
}
</script>

<style>

</style>
