<template>
  <v-container grid-list-md>
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
                  <v-card v-for="(game, index) in item.products" :key="index" width="270" class="ma-2">
                    <v-card-title>{{ game.name }} {{ game.priceStr }}</v-card-title>
                    <v-card-text>
                      <v-layout row>
                        <v-flex>
                          <v-img :src="require(`../assets/game/${game.shortkey}-1.jpg`)" width="230"></v-img>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-layout>
              </v-card-text>
              <v-card-footer>
                <v-container>
                  <v-btn color="success" v-show="!item.deliveryStatus" @click.prevent="claimPurchase(item._id)">Claim your purchase</v-btn>
                  <v-btn disabled v-show="item.deliveryStatus">Claimed</v-btn>
                </v-container>
                <v-layout>

                </v-layout>
              </v-card-footer>
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
export default {
  data() {
    return {
      orders: []
    };
  },
  props: ["isLoggedIn"],
  methods: {
    claimPurchase(id) {
      swal.fire(id)
      axios({
        method: 'put',
        url: `http://localhost:3000/transactions/${id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          deliveryStatus: true
        }
      })
        .then(({ data }) => {
          swal.fire('Purchase claimed!', 'Play your games now!', 'success')
          this.getTransaction()
        })
        .catch(err => {
          console.log({ err })
        })
    },
    getTransaction() {
      axios({
        method: "get",
        url: "http://localhost:3000/transactions",
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
          console.log(data);
          this.orders = data;
        })
        .catch(err => {
          console.log({ err });
          // console.log(response)
          // let { status, statusText, data } = response
          // swal.fire(`Error ${status}: ${statusText}`, data.message, 'error')
        });
    }
  },
  created() {
    this.getTransaction();
  },
  watch: {
    isLoggedIn() {
      if(this.isLoggedIn) {
        this.getTransaction()
      } else {
        this.orders = []
      }
    },
  }
};
</script>

<style>
</style>
