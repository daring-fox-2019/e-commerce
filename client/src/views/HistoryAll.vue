<template>
  <v-container grid-list-md>
    <v-flex class="mb-4">
      <v-card>
        <v-card-title>
          <h1>Purchase Summary</h1>
        </v-card-title>
        <canvas id="chart2" width="400" height="100"></canvas>
      </v-card>
    </v-flex>

    <v-flex>
      <v-card>
        <v-card-text v-show="isLoggedIn">
          <h1>Order History</h1>
          <div v-for="(item, index) in orders" :key="index">
            <v-card style="background-color: grey !important; color: black;">
              <v-card-title>{{ item.createdAt }}</v-card-title>
              <v-card-text>
                <div style="display: flex; justify-content: space-between">
                  <h2>Purchased Games:</h2>
                  <h2>Total: {{ item.totalStr }}</h2>
                </div>
                <v-layout>
                  <v-card
                    v-for="(game, index) in item.products"
                    :key="index"
                    width="270"
                    class="ma-2"
                  >
                    <v-card-title>{{ game.name }} {{ game.priceStr }}</v-card-title>
                    <v-card-text>
                      <v-layout row>
                        <v-flex>
                          <v-img
                            :src="require(`../assets/game/${game.shortkey}-1.jpg`)"
                            width="230"
                          ></v-img>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-container>
                  <v-btn v-show="!item.deliveryStatus" disabled>Not yet claimed</v-btn>
                  <v-btn disabled v-show="item.deliveryStatus">Claimed</v-btn>
                </v-container>
                <v-layout></v-layout>
              </v-card-actions>
            </v-card>
            <v-divider class="mt-2"></v-divider>
          </div>
        </v-card-text>
        <v-card-text v-show="!isLoggedIn">
          <h1>Login to see your purchasing history.</h1>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import swal from "sweetalert";
import { Bar } from "vue-chartjs";
import Chart from "chart.js";

export default {
  data() {
    return {
      orders: []
    };
  },
  extends: Bar,
  mounted() {
    console.log('mounted')
    axios({
      method: 'get',
      url: 'http://34.87.56.140/transactions',
      headers: {
        token: localStorage.token
      }
    })
      .then(({ data }) => {
        // console.table(data)
        let labels = []
        let dataset = []
        data.forEach(item => {
          let time = new Date(item.createdAt).toDateString()
          let income = item.total / 1000
          labels.push(time)
          dataset.push(income)
        })
        var ctx = document.getElementById("chart2").getContext("2d");
        var myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: "Income (in Rp 1.000,-)",
                data: dataset,
                backgroundColor: 
                  "rgba(54, 162, 235, 0.5)",
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      })
      .catch(err => {
        swal(err.message)
      })
  },
  props: ["isLoggedIn"],
  methods: {
    claimPurchase(id) {
      swal(id);
      axios({
        method: "put",
        url: `http://34.87.56.140/transactions/${id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          deliveryStatus: true
        }
      })
        .then(({ data }) => {
          swal("Purchase claimed!", "Play your games now!", "success");
          this.getTransaction();
        })
        .catch(err => {
          console.log({ err });
        });
    },
    getTransaction() {
      console.log('get transaction start')
      axios({
        method: "get",
        url: "http://34.87.56.140/transactions",
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          data.forEach(item => {
            item.createdAt = item.createdAt
              .slice(0, 19)
              .split("T")
              .join(" ");
            item.totalStr =
              "Rp " +
              item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          });
          // console.log(data);
          this.orders = data;
          console.log('get transaction end')
        })
        .catch(err => {
          console.log({ err });
          // console.log(response)
          // let { status, statusText, data } = response
          // swal(`Error ${status}: ${statusText}`, data.message, 'error')
        });
    }
  },
  created() {
    console.log('created')
    this.getTransaction();
  },
  watch: {
    isLoggedIn() {
      if (this.isLoggedIn) {
        this.getTransaction();
      } else {
        this.orders = [];
      }
    }
  }
};
</script>

<style>
</style>
