<template>
  <div v-if="transactions.length !== 0" class="container my-4">
    <div class="row">
      <img src="https://maxst.icons8.com/_nuxt/ouch/img/art-4.f0601da.png" class="mx-4" alt srcset>
      <div class=" text-block">
        <h1 class="pb-4">Transaction Status</h1>
        <div class="card my-4" v-for="(transaction, index) in transactions" :key="index">
          <h5 class="card-header">Transaction Details</h5>
          <div class="card-body">
            <div class="row justify-content-between">
              <p class="mx-4">ID : {{transaction._id}}</p>
              <p v-if="transaction.status" class="recieved mx-4">Received</p>
              <p v-if="!transaction.status" class="pending mx-4">On Delivery</p>
            </div>
            <div class="row">
              <p class="mx-4">created at: {{new Date(transaction.createdAt).toUTCString()}}</p>
            </div>
            <div class="row">
              <p class="mx-4">Total Purchase: $ {{transaction.total}}</p>
            </div>
            <div class="row">
              <a
                @click.prevent="updateArrival(transaction._id)"
                class="mx-4"
                href="#"
              >Confirm Arrival</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="row justify-content-center my-5">
    <div class="col-8">
      <img
        class="ml-5"
        src="https://assets-ouch.icons8.com/thumb/807/d5f0a70f-7b7b-4bb6-b4ba-7396e7280839.png"
        alt
        srcset
      >
    </div>
    <div class="col-4">
      <h5>No Transactions</h5>
      <p>Your Transaction doesn't have any history</p>
    </div>
  </div>
</template>

<script>
import axios from "../api/localhost";

export default {
  data() {
    return {
      transactions: []
    };
  },
  created() {
    this.fetchTransactions();
  },
  methods: {
    updateArrival(id) {
      axios
        .patch(
          `/transactions/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          console.log(data);
          this.fetchTransactions();
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchTransactions() {
      axios
        .get("/transactions/user", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.transactions = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
img {
  width: 20%;
  height: 20%;
}
.recieved {
  color: green;
}

.pending {
  color: red;
}
</style>
