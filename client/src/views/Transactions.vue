<template>
<v-layout>
    <v-data-table
        :headers="headers"
        :items="transactions"
        class="elevation-1"
    >
    <template v-slot:items="props">
      <td class="text-xs-center">{{ props.item._id }}</td>
      <td class="text-xs-center">{{  formattedPrice(props.item.totalAmount) }}</td>
      <td class="text-xs-center">{{ formattedDate(props.item.created_at) }}</td>
      <td class="text-xs-center">{{ props.item.status.toUpperCase() }}</td>
      <td><v-btn v-if="props.item.status.toLowerCase() !== 'received'" color="red" @click="updateStatus(props.item._id)"><small class="smallText">Confirm Delivery Status</small></v-btn></td>
    </template>
  </v-data-table>
  <!-- <v-dialog v-model="statusDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Update Receipt Status</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-select
                  :items="['sent', 'received' ]"
                  label="Delivery Status"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>Thank you for your kind cooperation!</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" flat @click="closeStatusDialog">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="updateStatus">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
</v-layout>
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
                    value: '_id'
                },
                { text: 'Amount (in IDR)', value: 'totalAmount' },
                { text: 'Date', value: 'created_at' },
                { text: 'Delivery Status', value: 'status' },
                { text: 'Actions', value: 'actions' },
            ],
        }
    },
    mounted() {
        this.fetchTransactions();
    },
    methods: {
        fetchTransactions() {
            api.get('/cart/transactions', { headers: {Authorization: localStorage.ecomm_token } })
            .then(({data}) => {
                this.transactions = data;
            })
            .catch(err => {
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
