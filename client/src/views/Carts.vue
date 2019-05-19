<template>
  <v-container>

  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'carts',
  computed: {
    ...mapState([
      'isLogin',
    ]),
  },
  watch: {
    isLogin() {
      this.checkLog();
    },
  },
  created() {
    this.checkLog();
  },
  methods: {
    checkLog() {
      if (!this.isLogin) {
        this.$router.push('/');
      }
    },
  },
};
</script>
