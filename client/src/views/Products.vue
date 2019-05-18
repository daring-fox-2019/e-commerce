<template>
  <v-container fluid fill-height>
    <v-layout column>
      <v-flex>
        <v-layout px-2>
          <v-spacer/>
          <v-btn color="blue" to="/addproduct">Add Product</v-btn>
        </v-layout>
      </v-flex>
      <v-layout wrap>
        <v-flex xs12 sm4 md4 lg3 v-for="n in 9" :key="n" pa-3>
          <ProductCard/>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: {
    ProductCard
  },
  data() {
    return {};
  }
};
</script>

