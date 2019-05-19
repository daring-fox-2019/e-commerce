<template>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div v-for="product in products" :key="product._id" class="col col-md-3 pt-4">
        <ProductCard :product="product" class="card"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
export default {
  name: "productList",
  components: {
    ProductCard
  },
  props: ["products"],
  methods: {}
};
</script>

<style scoped>
.card {
  /* the other rules */
  transition: transform 0.2s, box-shadow 0.3s;
}
.card:hover {
  transform: scale(1.01);

  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
}
</style>