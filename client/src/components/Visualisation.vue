<template>
  <chart :chart-data="datacollection"></chart>
</template>
    <script>
import Chart from "./../Chart.js";
export default {
  props: ["productList"],
  components: {
    Chart
  },
  created() {
    this.iterate();
    console.log(this.productList);
  },
  data() {
    return {
      datacollection: null,
      prodName: [],
      prodStock: [],
      prodSold :[],
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    iterate() {

      this.productList.forEach(prod => {
        this.prodName.push(prod.name);
        this.prodStock.push(prod.stock);
        this.prodSold.push(prod.sold)
      });
    },
    fillData() {
      this.datacollection = {
        labels: this.prodName,
        datasets: [
          {
            label: "Sold Product",
            backgroundColor: "#A5CC82",
            data: this.prodSold
          },
          {
            label: "Stocks",
            backgroundColor: "#f87979",
            data: this.prodStock
          },
        ]
      };
    }
  }
};
</script>
    <style>
</style>