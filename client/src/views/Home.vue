<template>
  <div class="home container">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to E-commerce"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>
