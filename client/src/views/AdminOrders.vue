<template>
    <div>
        <div class="text-center mb-3 mt-5">
            <h3>Order List</h3>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Cart</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Status</th>
                    <th scope="col">Total Payment</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(transaction, index) in transactions"
                    :key="index"
                >
                    <td>
                        <ol>
                            <li :key="index" v-for="(cart, index) in transaction.carts">
                                {{cart.product.name}}
                            </li>
                        </ol>
                    </td>
                    <td>{{transaction.userId.name}}</td>
                    <td>{{transaction.status}}</td>
                    <td>{{convertToRupiah(transaction.totalPayment)}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import api from '@/api/localapi'
import { convertToRupiah } from '@/helpers/convertToRupiah'

export default {
    data() {
        return {
            transactions:[]
        }
    },
    mounted() {
        this.fetchTransactions()
    },
    methods: {
        fetchTransactions() {
            api
            .get('/transactions/all')
            .then(({data}) => {
                console.log(data);
                this.transactions = data
            })
            .catch(err => {
                console.log(err);
            })
        },
        convertToRupiah
    },
}
</script>

<style>

</style>
