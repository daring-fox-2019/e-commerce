<template>
<v-container>
    <v-layout column>
        <h1 class="mb-5">All Transactions</h1>
        <v-data-table
            :headers="headers"
            :items="transactions"
            class="elevation-1"
        >
            <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item._id }}</td>
                <td class="text-xs-center">{{ props.item.user.firstname +' '+ props.item.user.lastname}}</td>
                <td class="text-xs-center">{{  formattedPrice(props.item.totalAmount) }}</td>
                <td class="text-xs-center">{{ formattedDate(props.item.created_at) }}</td>
                <td class="text-xs-center">{{ props.item.status.toUpperCase() }}</td>
                <td><v-btn v-if="props.item.status.toLowerCase() === 'paid'" color="red" @click="updateStatus(props.item._id)"><small class="smallText">Confirm Delivery Status</small></v-btn></td>
            </template>
        </v-data-table>
    </v-layout>
</v-container>
</template>
<script>
import moment from 'moment';
import api from '@/api/backend.js'
import priceFormat from '@/helpers/priceFormat'

export default {
    data() {
        return {
            statusDialog: false,
            transaction: null,
            transactions: [],
            headers: [
                {
                    text: 'Transaction ID',
                    value: '_id',
                    align: 'center',
                },
                { text: 'Owner', value: 'user' , align: 'center' },
                { text: 'Amount (in IDR)', value: 'totalAmount', align: 'center' },
                { text: 'Date', value: 'created_at' , align: 'center'},
                { text: 'Delivery Status', value: 'status' , align: 'center'},
                { text: 'Actions', value: 'actions' , align: 'center'},
            ],
        }
    },
    mounted() {
        this.fetchTransactions();
    },
    methods: {
        fetchTransactions() {
            api.get('/transactions', { headers: {Authorization: localStorage.ecomm_token } })
            .then(({data}) => {
                console.log('trans...', data);
                this.transactions = data;
            })
            .catch(err => {
                console.log(err);
                if(err.response) {
                    err = err.response.data
                }
                swal.fire('Error', err, 'error');
            })
        },
        formattedPrice(price) {
            return 'Rp. ' + priceFormat(price)
        },
        formattedDate(date) {
            return moment(new Date(date)).format('MMM DD, YYYY');
        },
        showStatusChange(transaction) {
            this.transaction = transaction;
            this.statusDialog = true;
        },
        closeStatusDialog() {
            this.transaction = null;
            this.statusDialog = false;
        },
        updateStatus(id) {
            this.$store.dispatch('confirmReceipt', id)
                .then(({ data }) => {
                    this.fetchTransactions();
                    swal.fire('Success', `Thanks for confirming the product receipt!`, 'success')
                })
                .catch(err => {
                    if(err.response) {
                        err = err.response.data
                    }
                    swal.fire('Error', err, 'error')
                })
        },

    },
}
</script>
<style scoped>
.smallText {
    font-size: 10px;
}
</style>
