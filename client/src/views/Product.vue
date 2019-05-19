<template>
  <v-container>
    <v-layout justify-center row>
      <v-flex sm6>
        <ProductCard :ratio="1.5"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'detailProduct',
  components: {
    ProductCard,
  },
};
</script>
