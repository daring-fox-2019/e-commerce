<template>
  <div class="container">
   <Visualisation v-bind:product-list="productList"></Visualisation>
  </div>
</template>

<script>
import Chart from "chart.js";
 import Visualisation from '@/components/Visualisation.vue';
 export default {
   props : ['productList'],
   components : {Visualisation}

};
</script>

<style>
</style>
