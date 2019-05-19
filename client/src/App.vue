<template>
  <div id="app">
    <navbar v-show="$store.state.logRegStatus.loggedIn"/>
    <router-view/>
    <footers v-show="$store.state.logRegStatus.loggedIn"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footers from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footers,
  },
  created() {
  },
};
</script>

<style>
body {
  padding-top: 56px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
