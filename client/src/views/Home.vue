<template>
  <v-container style="min-height:76vh" fluid>
    <v-layout row class="mb-3">
      <v-flex sm6 class="pa-2">
        <Carousel/>
      </v-flex>
      <v-flex sm6 class="pa-2">
        <h1 class="display-2 mb-1">New!</h1>
        <v-layout row>
          <v-flex v-for="index in 3" :key="index" sm4 class="px-1">
            <ProductCard/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <h1 class="display-2">we choose for you</h1>
    <v-layout row class="mb-3">
      <v-flex sm6 class="pa-2">
        <RecommendCard :i-style="0" />
      </v-flex>
      <v-flex sm6 class="pa-2">
        <v-layout row class="mb-5">
          <v-flex sm6 class="px-1">
            <RecommendCard :i-style="1" />
          </v-flex>
          <v-flex sm6 class="px-1">
            <RecommendCard :i-style="1" />
          </v-flex>
        </v-layout>
        <h1 class="display-4 grey--text">think beyond.</h1>
        <h1 class="display-4 teal--text">think future.</h1>
      </v-flex>
    </v-layout>

    <router-link to="/"><h1 class="display-2">all products</h1></router-link>
    <v-layout row wrap class="mb-3">
      <v-flex v-for="index in 6" :key="index" sm2 class="pa-2">
        <ProductCard/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
a {
  color: teal;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>

<script>
import Carousel from '@/components/Carousel.vue';
import ProductCard from '@/components/ProductCard.vue';
import RecommendCard from '@/components/RecommendCard.vue';

export default {
  name: 'home',
  components: {
    Carousel,
    ProductCard,
    RecommendCard,
  },
};
</script>
