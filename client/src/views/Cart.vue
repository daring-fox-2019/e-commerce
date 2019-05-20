<template>
  <div class="container" style="margin-bottom: 50px;">
    <table class="table table-bordered" style="margin-top: 100px;">
      <tr>
        <th>
          <h3>No.</h3>
        </th>
        <th>
          <h3>Image</h3>
        </th>
        <th>
          <h3>Name</h3>
        </th>
        <th>
          <h3>Price</h3>
        </th>
        <th>
          <h3>Amount</h3>
        </th>
        <th>
          <h3>Total price</h3>
        </th>
        <th>
          <h3>Option</h3>
        </th>
      </tr>
      <tr v-for="(cart, index) in carts" :key="index">
        <td>{{ index + 1 }}</td>
        <td>
          <img style="max-width: 400px; max-height: 300px;" :src="cart.product.image">
        </td>
        <td>
          <h3>{{ cart.product.name }}</h3>
        </td>
        <td>
          <h3>Rp {{ cart.product.price }},-</h3>
        </td>
        <td>
          <h3>{{ cart.amount }}</h3>
        </td>
        <td>
          <h3>Rp {{ cart.product.price * cart.amount }},-</h3>
        </td>
        <td>
          <a href="#" @click="removeCart(cart._id)">
            <h3>Remove from cart</h3>
          </a>
        </td>
      </tr>
    </table>
    <div style="text-align: right;">
      <h1>Total: Rp {{ totalPurchase }},-</h1>
        <router-link to="/cart/form">
        <h2
          style="
          background-color: #130831;
          color: #D2D1FF;
          border-radius: 15px;
          padding: 10px;
          width: max-content;"
        >To Checkout</h2>
        </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      // totalPurchase: 0,
    };
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    },
    totalPurchase() {
      let num = 0;
      this.$store.state.carts.forEach((el) => {
        num += el.product.price * el.amount;
      });
      return num;
    },
  },
  created() {
    this.$store.dispatch('getCarts');
  },
  mounted() {},
  methods: {
    removeCart(id) {
      this.$store.dispatch('removeCart', id);
    },
    toCheckout(carts) {
      if (carts.length === 0) {
        Swal.fire({
          type: 'error',
          title: 'Umm...',
          text: 'There\'s nothing on the cart....',
        });
      } else {
      }
    },
  },
};
</script>
