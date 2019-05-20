<template>
  <v-container fluid>
    <router-view></router-view>

    <h1 class="display-2">all products</h1>
    <v-layout row wrap class="mb-3">
      <v-flex v-for="(product, index) in products" :key="index" sm2 class="pa-2">
        <ProductCard :productInput="product" :ratio="2" trunc/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'products',
  components: {
    ProductCard,
  },
  computed: {
    ...mapState([
      'products',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchProducts',
    ]),
  },
  created() {
    this.fetchProducts();
  },
};
</script>
