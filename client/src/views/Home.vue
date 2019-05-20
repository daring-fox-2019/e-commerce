<template>
  <v-container fluid>
    <v-layout row class="mb-3">
      <v-flex sm6 class="pa-2">
        <Carousel/>
      </v-flex>
      <v-flex sm6 class="pa-2">
        <h1 class="display-2 mb-1">New!</h1>
        <v-layout row>
          <v-flex v-for="(product, index) in newProducts" :key="index" sm4 class="px-1">
            <ProductCard :product-input="product" :ratio="2" trunc/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <h1 class="display-2">we choose for you</h1>
    <v-layout row class="mb-3">
      <v-flex sm6 class="pa-2">
        <RecommendCard :product-input="recommendedProducts[0]" :i-style="0"/>
      </v-flex>
      <v-flex sm6 class="pa-2">
        <v-layout row class="mb-5">
          <v-flex sm6 class="px-1">
            <RecommendCard :product-input="recommendedProducts[1]" :i-style="1"/>
          </v-flex>
          <v-flex sm6 class="px-1">
            <RecommendCard :product-input="recommendedProducts[2]" :i-style="1"/>
          </v-flex>
        </v-layout>
        <h1 class="display-4 grey--text">think beyond.</h1>
        <h1 class="display-4 teal--text">think future.</h1>
      </v-flex>
    </v-layout>

    <router-link to="/products"><h1 class="display-2">all products</h1></router-link>
    <v-layout row wrap class="mb-3">
      <v-flex v-for="(product, index) in headlineProducts" :key="index" sm2 class="pa-2">
        <ProductCard :productInput="product" :ratio="2" trunc/>
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
import { mapActions, mapState } from 'vuex';

export default {
  name: 'home',
  components: {
    Carousel,
    ProductCard,
    RecommendCard,
  },
  computed: {
    ...mapState([
      'products',
    ]),
    newProducts() {
      let products = [];
      if (this.products.length < 3) {
        // eslint-disable-next-line
        products = this.products;
      } else {
        products = this.products.slice(0, 3);
      }
      return products;
    },
    headlineProducts() {
      let products = [];
      if (this.products.length < 6) {
        // eslint-disable-next-line
        products = this.products;
      } else {
        products = this.products.slice(0, 6);
      }
      return products;
    },
    recommendedProducts() {
      const products = [];
      if (this.products.length < 3) {
        // eslint-disable-next-line
        products = this.products;
      } else {
        let indexRandom = -1;
        // eslint-disable-next-line
        for (let i = 0; i < 3; i++) {
          indexRandom = Math.round(Math.random() * (this.products.length - 1));
          products.push(this.products[indexRandom]);
        }
      }
      return products;
    },
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
