<template>
  <div class="col-lg-9">
    <div class="row mt-4">
      <ProductItem v-for="product in products" :product="product" :key="product._id"/>
    </div>
  </div>
</template>
<script>
import ProductItem from "@/components/Product.vue";
import { mapState } from "vuex";

export default {
  components: {
    ProductItem
  },
  // props: ['products'],
  computed: mapState([
    // map this.count to store.state.count
    "products"
  ]),
  created() {
  }
};
</script>
