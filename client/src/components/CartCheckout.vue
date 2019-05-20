<template>
  <div>
    <b-container fluid class="border">
      <b-row>
        <b-col class="px-0 border">
          <div>Cart Checkout</div>
        </b-col>
      </b-row>
      <!-- header -->
      <b-row >
        <b-col cols="1" class="px-0 border">No</b-col>
        <b-col class="px-0 border">Product Name</b-col>
        <b-col cols="2" class="border">Qty</b-col>
        <b-col cols="4" class="border">Price</b-col>
      </b-row>
      <b-row 
        v-for="item in cart"
        :key="item._id">
        <b-col cols="1" class="px-0 border">1</b-col>
        <b-col class="px-0 border">{{item.product.name}}</b-col>
        <b-col cols="2" class="border">{{item.quantity}}</b-col>
        <b-col cols="4" class="border">Rp. {{item.product.price}}</b-col>
      </b-row>
      <b-row>
        <b-col class="px-0 border">{Total}</b-col>
      </b-row>
      <b-row class="p-2">
        <b-button block variant="primary" class="py-1" @click="checkout">Pay Now</b-button>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
    name: 'cart-checkout',
    computed: {
        cart() {
            return this.$store.state.user.cart
        }
    },
    methods: {
      checkout() {
        const cartIdArray = []
        this.cart.forEach(el => {
          cartIdArray.push(el._id)
        })
        // console.log(cartIdArray)

        this.$store.dispatch('checkoutCart', cartIdArray)
      }
    }
};
</script>

<style>
</style>
