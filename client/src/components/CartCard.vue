<template>
  <div>
    <b-container fluid>
      <b-row style="height: 75px;">
        <b-col cols="1" class="px-0 border flex-center">
          <!-- <input type="checkbox"> -->
          <b-form-checkbox></b-form-checkbox>
        </b-col>
        <b-col cols="2" class="px-0 border flex-center">
          <div style="max-height: 80px; max-width:80px; overflow:hidden;">
            <img
              :src="item.product.image || 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'"
              style="background:cover;width:100%;"
            >
          </div>
        </b-col>
        <b-col cols="6" class="px-2 py-1 border">
          <b-row>
            <b-col>product: {{item.product.name}}</b-col>
          </b-row>
          <b-row>
            <b-col>Price: {{item.product.price}}</b-col>
          </b-row>
          <!-- <b-row>
            <b-col>{Item Seller}</b-col>
          </b-row> -->
        </b-col>
        <b-col cols="3" class="px-0 border d-flex justify-content-between align-items-center">
          <div class="pl-3">Qty: {{item.quantity}}</div>
          <div class="col px-0">
              <div class="d-flex justify-content-end pr-2">
                <!-- <div class="m-1"><i class="fas fa-heart"></i></div> -->
                <div class="m-1" @click="removeFromCart(item._id)"><a href="#"><i class="far fa-trash-alt"></i></a></div>
              </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: ['item'],
  name: 'CartCard',
  methods: {
    removeFromCart(cart_id) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
          if (result.value) {
          this.$store.dispatch('removeFromCart', cart_id)
        }
      })
    }
  }
};
</script>

<style>
</style>
