<template>
  <div>
    <Navbar/>
    <router-view />

    <!-- <Login v-show="show === 'loginPage'"/>

    <Register v-show="show === 'registerPage'"/>

    <Home v-if="show === 'homePage'"/> -->
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Categories from '@/components/Categories.vue';

export default {
  data() {
    return {};
  },
  computed: {
    show() {
      return this.$store.state.show;
    },
  },
  created() {
    if (localStorage.token) {
      console.log('lakakun ini!');
      this.$store.dispatch('stayLoggedIn');
      // this.$store.dispatch('getCarts');
    } else {
      this.$router.push('/login');
    }
  },
  methods: {},
  components: {
    Navbar,
  },
};
</script>


<style>
</style>
