<template>
  <div class="home">
    <router-view></router-view>
    <CardDeck />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import CardDeck from '@/views/CardDeck.vue';
import axios from '@/database/axios';

export default {
  name: 'home',
  components: {
    Header,
    CardDeck,
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('getCartData');
    }
  },
};
</script>
