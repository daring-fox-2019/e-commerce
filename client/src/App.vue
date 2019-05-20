<template>
  <div id="app" class="has-background-white-ter">
    <TheNavbar
      v-if="!['register', 'login'].includes($route.name)"
      :isLogin="isLogin"
      :user="user"
      @click-logout="onClickLogout"
    />
    <router-view
      @login="onLogin"
      :token="token"
      :user="user"
    />
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'

export default {
  name: 'App',
  components: {
    TheNavbar
  },
  data: function () {
    return {
      user: {},
      token: ''
    }
  },
  computed: {
    isLogin: function () {
      return !!this.token
    }
  },
  created: function () {
    if (localStorage.getItem('ecommerce_token')) {
      this.user = JSON.parse(localStorage.getItem('ecommerce_user'))
      this.token = localStorage.getItem('ecommerce_token')
    }
  },
  methods: {
    onLogin: function ({ user, jwtToken }) {
      this.$router.push('/')
      this.user = user
      this.token = jwtToken
      localStorage.setItem('ecommerce_user', JSON.stringify(user))
      localStorage.setItem('ecommerce_token', jwtToken)
    },
    onClickLogout: function () {
      this.user = {}
      this.token = ''
      localStorage.removeItem('ecommerce_user')
      localStorage.removeItem('ecommerce_token')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
