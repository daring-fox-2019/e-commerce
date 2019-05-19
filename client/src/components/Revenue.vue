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
    
  },
  data() {
    return {
      datacollection: null,
      monthlyRevenue: [],  
    };
  },
  mounted() {
    console.log(this.monthlyRevenue, '..', 'HOW MUCH MONEY DO I MAKE??');

  },
  methods: {
    getMo() {
      let pembanding = []
      let temp = []
      this.monthlyRevenue = []
      this.axios.get('/transactions/revenue/months', {
        headers : {'token' : localStorage.getItem('token')}
      })
      .then(({data}) => {
       console.log(data, '.....'); 
        for(let i =1; i < 13; i++) {
          let flag = false
          let obj = {
            _id : i,
            revenue : 0
          }
          for (let j = 0; j < data.length; j++) {
            if (data[j]._id == obj._id) {
              flag = true
              obj.revenue = data[j].revenue
            } 
          }
          if (flag) {
            pembanding.push(obj)
          } else {
            pembanding.push({
              _id : i,
              revenue : 0
            })
          }
        }
        console.log(pembanding);
        for (let i = 0; i < pembanding.length; i++) {
          temp.push(pembanding[i].revenue); 
        }
        
        this.monthlyRevenue = temp
        this.fillData();

      })
      .catch(err => {
        console.log(err, '////');
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