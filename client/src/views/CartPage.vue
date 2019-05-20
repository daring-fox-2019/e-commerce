<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column">
          <ItemList
            :items="items"
            :token="token"
            @update-cart="onUpdateCart"
            @remove-all="onRemoveAll"
          />
        </div>
        <div class="column is-4">
          <CartSummary :quantity="cart.length" :total="total"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api.js'

import ItemList from '../components/ItemList.vue'
import CartSummary from '../components/CartSummary.vue'

export default {
  name: 'CartPage',
  props: {
    token: String
  },
  components: {
    ItemList,
    CartSummary
  },
  data: function () {
    return {
      cart: []
    }
  },
  computed: {
    items: vm => Array.from(
        new Set(vm.cart.map(item => item._id))
      ).map(itemId => ({
        ...vm.cart.find(item => item._id === itemId),
        count: vm.cart.filter(item => item._id === itemId).length
      })
    ),
    total: vm => vm.cart.length
      ? vm.cart.reduce((acc, cart) => acc + (vm.count(cart._id) * cart.price), 0)
      : 0
  },
  created: function () {
    api
      .fetchCart(this.token)
      .then(({ data }) => {
        this.cart = data.cart
      })
      .catch(err => console.log(err))
  },
  methods: {
    count: function (itemId) {
      return this.cart.filter(item => item._id === itemId).length
    },
    onUpdateCart: function (cart) {
      this.cart = cart
    },
    onRemoveAll: function (itemId) {
      this.cart = this.cart.filter(item => item._id !== itemId)
    }
  }
}
</script>

<style>

</style>
