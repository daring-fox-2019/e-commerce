<template>
  <div>
    <v-app>
      <HeadBar/>
      <router-view/>
      <footer>
        <FootBar/>
      </footer>
    </v-app>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar.vue';
import FootBar from '@/components/FootBar.vue';

export default {
  name: 'app',
  components: {
    HeadBar,
    FootBar,
  },
};
</script>
