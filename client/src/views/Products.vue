<template>
  <v-container fluid>
    <router-view></router-view>

    <h1 class="display-2">all products</h1>
    <v-layout row wrap class="mb-3">
      <v-flex v-for="index in 50" :key="index" sm2 class="pa-2">
        <ProductCard :ratio="2" trunc/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'products',
  components: {
    ProductCard,
  },
};
</script>
