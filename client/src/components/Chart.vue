<template>
  <chart :chart-data="datacollection"></chart>
</template>
    <script>
import Chart from "./../Chart.js";
import axios from "../api/localhost";
export default {
  components: {
    Chart
  },
  data() {
    return {
      datacollection: null,
      monthlyRevenue: []
    };
  },
  mounted() {
    this.fillData();
  },
  created() {
    this.getMo();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Monthly incomes",
            backgroundColor: "#A5CC82",
            data: this.monthlyRevenue
          }
        ]
      };
    },
    getMo() {
      let pembanding = [];
      let temp = [];
      this.monthlyRevenue = [];
      axios
        .get("/transactions/revenue", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          for (let i = 1; i < 13; i++) {
            let flag = false;
            let obj = {
              _id: i,
              revenue: 0
            };
            for (let j = 0; j < data.length; j++) {
              if (data[j]._id == obj._id) {
                flag = true;
                obj.revenue = data[j].revenue;
              }
            }
            if (flag) {
              pembanding.push(obj);
            } else {
              pembanding.push({
                _id: i,
                revenue: 0
              });
            }
          }
          for (let i = 0; i < pembanding.length; i++) {
            temp.push(pembanding[i].revenue);
          }

          this.monthlyRevenue = temp;
          this.fillData();
        })
        .catch(err => {
          console.log(err, "////");
          this.swal.fire(
            "Something is wrong",
            "Please reload the page",
            "error"
          );
        });
    }
  }
};
</script>
    <style>
</style>