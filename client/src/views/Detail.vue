<template>
  <div class="home">
    <v-layout>
      <v-flex id="list">
        <v-img :src="product.image" aspect-ratio="2.75"></v-img>
        <v-card-title primary-title class="detailProduct">
          <h1>{{product.name}}</h1>
        </v-card-title>
        <v-card-title class="detailProduct">
          <h3>{{priceProduct}}</h3>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" @click="addCart">Add Cart</v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'home',
  components: {},
  data() {
    return {
      product: {},
      priceProduct: '',
    };
  },
  watch: {
    $route() {
      this.fetchData();
    },
    product(val) {
      let rupiah = '';
      const angkarev = val.price
        .toString()
        .split('')
        .reverse()
        .join('');
      for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += `${angkarev.substr(i, 3)}.`;
      this.priceProduct = `Rp. ${rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('')}`;
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get(`http://localhost:3000/products/${this.$route.params.id}`)
        .then(({ data }) => {
          this.product = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCart() {
      axios
        .post(
          'http://localhost:3000/cart',
          { productId: this.product._id },
          { headers: { token: localStorage.token } },
        )
        .then(() => {
          console.log('ADD CART SUCCESS');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.detailProduct {
  margin-left: 30px;
}

#list {
  padding: 10px;
  height: 100vh;
  overflow: scroll;
  margin-right: 5px;
}

#detail {
  display: fixed;
}
</style>
