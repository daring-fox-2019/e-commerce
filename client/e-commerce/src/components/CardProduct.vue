<template>
  <div>
    <div class="card" style="width: 18rem;">
      <img
        class="mx-auto d-block"
        :src="gundam.image"
        alt="Card image cap"
        style="width:150px;height:180px;"
      >
      <div class="card-body">
        <h5 class="card-title">{{gundam.name}}</h5>
        <p class="card-text">Rp {{gundam.price}}</p>
        <label for="price">Qty</label>
        <input v-model="cart.quantity"  id="price" type="number" min="1" :max="gundam.stock" /><br>
        <button v-if="gundam.stock > 0" @click.prevent="addCart()" class="btn btn-danger   "><i class="fas fa-cart-plus"></i>Add To Cart</button> 
        <p v-else>STOCK HABIS</p>
       <button type="button" class="m-2 btn btn-warning" data-toggle="modal" :data-target="'#'+gundam._id">
  See Description
</button>

<!-- The Modal -->
<div class="modal" :id="gundam._id">
  <div class="modal-dialog">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">{{gundam.name}}</h4>
        
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
      {{gundam.description}}
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["gundam"],
  data() {
    return {
        cart: {
            productId: this.gundam._id,
            quantity: '1',
        }
    };
  },
  methods: {
      addCart(){
          this.$emit('addcart', this.cart)
      }
  }

};
</script>

