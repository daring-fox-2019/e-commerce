<template>
  <div>
    <div class="container">
      <div
        class="row"
        style="margin-top: 100px; background-color: white;
        border: solid; border-color: #130831; padding: 100px; border-radius: 15px;"
      >
        <div class="col-5">
          <img :src="currentProduct.image" style="height: 300px; width: 100%;">
        </div>
        <div class="col-7">
          <h2>{{ currentProduct.name }}</h2>
          <p>{{currentProduct.description}}</p>
          <h5>Price: Rp {{currentProduct.price}},-</h5>
          <h5>Stock: {{currentProduct.stock}}</h5>
          <div style="background-color: #130831; border-radius: 15px; padding: 7px; width: 300px;">
            <input v-model="amount" type="number" :max="currentProduct.stock" required>
            <button @click="addToCart(currentProduct.stock)" class="btn btn-primary">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myServer from '@/api/myServer';
import { mapState } from 'vuex';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      amount: 0,
    };
  },
  computed: {
    ...mapState(['currentProduct']),
  },
  created() {
    this.$store.dispatch('showProduct', this.$route.params.id);
  },
  methods: {
    addToCart(stock) {
      if (this.amount > stock) {
        Swal.fire({
          type: 'error',
          title: 'Oh no!',
          text: 'Our stock is not enough for you order amount',
        });
      } else {
        this.$store.dispatch('addCart', { _id: this.$store.state.currentProduct._id, amount: this.amount });
        this.$router.push('/');
        Swal.fire('Yeay!', 'Items successfully added to your cart!', 'success');
      }
    },
  },
};
</script>
