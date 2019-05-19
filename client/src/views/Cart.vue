<template>
  <v-layout row px-3 py-5>
    <v-flex xs12 sm8 md8 lg8>
      <v-card>
        <v-toolbar color="yellow black--text" class="mb-3">
          <v-toolbar-title>Cart</v-toolbar-title>
        </v-toolbar>
        <v-list>
          <v-list-tile
            v-for="item in $store.state.cart.items"
            :key="item._id"
            class="cartTile"
          >
          <v-layout>
            <v-list-tile-avatar>
              <img :src="item.product.image">
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title v-text="item.product.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.quantity"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title v-text="formattedPrice(item.price)"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn flat icon ><v-icon color="red" @click="removeItem(item._id)">close</v-icon></v-btn>
            </v-list-tile-action>
          </v-layout>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex ml-2 xs12 sm4 md4 lg4>
        <v-card>
            <v-toolbar class="yellow black--text">
                <v-toolbar-title>
                    Total
                </v-toolbar-title>
            </v-toolbar>
              <v-card-title>
                <h1 class="headline orange--text font-weight-bold py-3">Rp. {{ totalPrice }}</h1>
              </v-card-title>
              <v-card-actions>
                <v-btn color="blue" dark @click="checkout">Pay</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
    </v-flex>
  </v-layout>
</template>
<script>
import {mapState} from 'vuex';
import commaFormat from '@/helpers/priceFormat.js'

export default {
    computed: {
        cartItems() {
            console.log(this.$store.state.cart);
            return this.$store.state.cart.items;
        },
        totalPrice() {
            return commaFormat(this.$store.state.cart.totalAmount);
        },
        ...mapState(['cart'])
    },
    methods: {
        formattedPrice(amt) {
            return `Rp. `+ commaFormat(amt);
        },
        removeItem(id) {
            this.$store.dispatch('removeCartItem', id)
                .then(({ data }) => {
                    this.$store.commit('removeItem', id)
                    this.$store.dispatch('getCurrentCart');
                })
                .catch(err => {
                    if(err.response) {
                        err = err.response.data
                    }

                    swal.fire('Error', err, 'error')
                })
        },
        checkout() {
            this.cart.status = 'paid';
            swal.fire({
                title: 'Processing payment...'
            });
            
            swal.showLoading();

            this.$store.dispatch('processPayment')
                .then(({ data }) => {
                    swal.close();
                    swal.fire('Success', `We've received your payment succesfully.
                    Please go to your User page to confirm the delivery receipt.`, 'success')
                })
                .catch(err => {
                    swal.close();
                    if(err.response) {
                        err = err.response.data
                    }
                    swal.fire('Error', err, 'error')
                })
        }
    }
}
</script>
<style scoped>
.cartTile {
    min-height: 70px;
}
</style>

