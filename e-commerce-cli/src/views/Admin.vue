<template>
    <div class="container table-responsive">
        <br>
        <h1 style="color:black;font-weight:900">Jualeun Transaction History</h1>
        <br><br>
        <table class="table table-hover">
            <thead style="font-weight:900">
                <td>No</td>
                <td>Cart Id</td>
                <td>Time</td>
                <td>Customer</td>
                <td>Products</td>
                <td>Checked Out</td>
                <td>Delivered</td>
            </thead>
            <tr v-for="(transaction,index) in transactionList" :key="index">
                <td>{{ index+1 }}</td>
                <td>{{ transaction._id }}</td>
                <td>{{ transaction.name }}</td>
                <td> {{ transaction.owner.email }} </td>
                <td>
                    <p v-for="(product,index) in transaction.products" :key="'a'+index">
                        {{index+1+". "+product.item}}
                    </p>
                </td>
                <td> {{ transaction.checkout }} </td>
                <td> {{ transaction.delivered }} </td>
            </tr>
        </table>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from '@/api/axios';

export default {
  name: 'admin',
  data() {
    return {
      transactionList: [],
    };
  },
  methods: {
    onStart() {
      axios
        .get('carts/admin', {
          headers: { jwtoken: localStorage.jwtoken },
        })
        .then(({ data }) => {
          this.transactionList = data;
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            type: 'error',
            text: 'You are not admin!',
            title: 'Do not try',
          });
          this.$router.push({path:'/'})
        });
    },
  },
  created() {
    this.onStart();
  },
};
</script>

<style>

</style>
