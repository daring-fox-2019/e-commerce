<template>
  <router-view :token="token" :user-id="user._id"></router-view>
</template>

<script>
export default {
  name: 'ItemPage',
  props: {
    token: String,
    user: Object
  }
}
</script>

<style>

</style>
