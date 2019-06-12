<template>
  <div class="navbar">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <router-link
          class="navbar-item is-size-3"
          to="/"
        >e-commerce</router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <template v-if="isLogin">
            <router-link
              class="navbar-item has-text-grey-light"
              to="/cart"
            >
              <i class="fas fa-shopping-cart"></i>
            </router-link>
            <div class="is-divider-vertical"></div>
            <router-link
              class="navbar-item has-text-success"
              to="/item/create"
            >
              <i class="fas fa-plus-circle mrs"></i>
              New Item
            </router-link>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                {{user.email}}
              </a>
              <div class="navbar-dropdown">
                <a
                  class="navbar-item"
                  href="/logout"
                  @click.prevent="$emit('click-logout')"
                >Logout</a>
              </div>
            </div>
          </template>
          <div class="buttons" v-else>
            <router-link
              class="navbar-item button is-outlined"
              to="/login"
            >Login</router-link>
            <router-link
              class="navbar-item button is-outlined is-success"
              to="/register"
            >Register</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheNavbar',
  props: {
    isLogin: Boolean,
    user: Object
  }
}
</script>

<style scoped>
.is-divider-vertical {
  padding: 0 8px;
}
</style>
