<template>
  <Revenue :chart-data="datacollection"></Revenue>
</template>
    <script>
import Revenue from "./../Revenue.js";
export default {
  props: ["productList"],
  components: {
    Revenue
  },
  created() {
    this.getMo()
    console.log(this.monthlyRevenue, 'HOW MUCH MONEY DO I MAKE??');
    
  },
  data() {
    return {
      datacollection: null,
      monthlyRevenue: [],  
    };
  },
  mounted() {
    this.getMo()
    this.fillData();
  },
  methods: {
    getMo() {
      this.monthlyRevenue = []
      this.axios.get('/transactions/revenue/months', {
        headers : {'token' : localStorage.getItem('token')}
      })
      .then(({data}) => {
       


        for (let i = 0; i < 12; i++) {
          console.log(temp);
          
          data.forEach(mo => {
            console.log(mo, 'sssss');
            
            if (i != mo._id) {
              temp.push(0)
            } else if (i == mo._id) {
              temp.push(mo.revenue)
            }
          });
        }
        this.monthlyRevenue = temp
      })
      .catch(err => {
        this.swal.fire('Something is wrong', 'Please reload the page', 'error')
      })

    },
    fillData() {
      this.datacollection = {
        labels:  [
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
            label: "Revenue Growth by Month (IDR)",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#3e95cd",
              "#8e5ea2",
            ],
            data: this.monthlyRevenue
          }
        ]
      };
    }
  }
};
</script>
    <style>
</style>