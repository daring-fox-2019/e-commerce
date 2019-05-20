<template>
  <div class="ui card">
    <div class="image">
      <!-- <div class="ui left black ribbon icon label">
        <i class="edit icon" @click="$emit('edit-product', product._id)"></i>
        <i class="trash icon" @click="$emit('delete-product', product._id)"></i>
        </div> -->
      <img
        :src="product.image"
        class="visible content"
        style="width: 100%; height: 200px;"
      >
    </div>
    <div class="center aligned content">
      <a class="header">{{ product.name }}</a>
      <div class="meta">
        Stock: {{ product.stock }}
      </div>
      Rp. {{ product.price }}
    </div>
<div 
  class="ui basic bottom attached button" 
  tabindex="0"
  @click="$emit('add-to-cart', product._id)"
  :class="{ disabled: onCart == 'Added to Cart' }"
  >
    <p>{{ onCart }}</p>
</div>
  </div>
</template>

<script>
export default {
  name: 'ProducCard',
  props: {
    product: Object,
    cart: Array
  },
  created() {
  },
  computed: {
    onCart() {
      let cart = this.cart.map(el => el._id)
      if(cart.indexOf(this.product._id) < 0) {
        return 'Add to Cart'
      } else {
        return 'Added to Cart'
      }
    }
  }
}
</script>

<style>
</style>
