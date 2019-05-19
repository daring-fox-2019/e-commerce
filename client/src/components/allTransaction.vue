<template>
  <div>
     <h1>All Customers Transaction Progress</h1>
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
      </div>
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
    this.fetchTransactions()
  },
  methods: {

    fetchTransactions() {
      axios
        .get("/transactions", {
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
.recieved {
  color: green;
}

.pending {
  color: red;
}
</style>
