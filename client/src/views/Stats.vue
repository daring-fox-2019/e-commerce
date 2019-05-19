<template>
  <div class="container">
    <Visualisation v-bind:product-list="productList"></Visualisation>
    <Revenue></Revenue>

  </div>
</template>

<script>
import Chart from "chart.js";
import Visualisation from "@/components/Visualisation.vue";
import Revenue from "@/components/Revenue.vue";

export default {
  props: ["productList"],
  components: { Visualisation, Revenue }
};
</script>

<style>
</style>
