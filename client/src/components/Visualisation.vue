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
    this.iterate()
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
            borderColor: "#A5CC82",
            fill: false,
            data: this.prodSold
          },
          {
            label: "Stocks",
            borderColor : "#f87979",
            fill: false,
            data: this.prodStock
          },
        ]
      };
    }
  },
  watch: {
    productList() {
      this.iterate()
    }
  },
};
</script>
    <style>
</style>