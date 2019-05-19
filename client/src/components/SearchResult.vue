<template>
  <v-container fluid fill-height>
    <v-layout column>
      <h1 class="mb-4">Search</h1>
      <v-layout wrap>
        <v-flex xs12 sm4 md4 lg3 v-for="product in products" :key="product._id" pa-3>
          <ProductCard :product="product"/>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
import ProductCard from "@/components/ProductCard.vue";
import api from "@/api/backend.js";

let config = {}
export default {
    components: {
        ProductCard
    },
    data() {
        return {
            products: [],
        }
    },
    watch: {
      $route: function(oldVal, newVal) {
        console.log(newVal);
        this.products = this.$store.state.searchList;
      }
    },
    mounted() {
      console.log('search...');
      this.products = this.$store.state.searchList;
    },
    methods: {
    }
};
</script>

