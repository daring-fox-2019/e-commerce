<template>
  <div>
    <p class="is-size-2 has-text-centered section">
      <router-link to="/">e-commerce</router-link>
    </p>
    <div class="columns is-centered">
      <div class="column box">
        <form
          class="pam"
          @submit.prevent="$emit('submit', { email, password })"
        >
          <slot name="header"></slot>
          <p
            class="has-text-danger mbs"
            v-if="errMessage"
          >{{errMessage}}</p>
          <div class="field">
            <label class="label">Email</label>
            <input
              type="email"
              class="input"
              v-model="email"
              required
              autofocus
            />
          </div>
          <div class="field">
            <label class="label">Password</label>
            <input
              type="password"
              class="input"
              v-model="password"
              required
            />
          </div>
          <slot name="footer"></slot>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseAuthForm',
  props: {
    errMessage: String
  },
  data: function () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style scoped>
.column.box {
  max-width: 360px!important;
}
</style>
