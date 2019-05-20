<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 d-flex py-5 border-right" id="panel">
        <h4 class="mb-5">Admin Menu</h4>
        <router-link to="/admin/addProduct" type="button" class="btn btn-sm my-2">Add Product</router-link>
        <router-link to="/admin/overview" type="button" class="btn btn-sm my-2">Overview</router-link>

      </div>
      <div class="col-5 my-4">
       
        <router-view
          :products="products"
          v-on:delete-data="deleteData"
          v-on:fetch-products="fetchProducts"
        ></router-view>
      </div>
      <div class="col-5">
        <Chart></Chart>
        <BarChart class="my-5"></BarChart>
      </div>
    </div>
  </div>
</template>
<script>

import Chart from '@/components/Chart.vue'
import BarChart from '@/components/BarChart.vue'
export default {
  props: ["products"],
  components : {
    Chart,
    BarChart
  },
  methods: {
    deleteData(id) {
      this.$emit("delete-data", id);
    },
    fetchProducts() {
      this.$emit("fetch-products");
    }
  },
  created() {
    this.$router.push('/admin/history')
  },
};
</script>
<style>
#panel {
  flex-direction: column;
  align-items: center;
  height: 90vh;
}
</style>
