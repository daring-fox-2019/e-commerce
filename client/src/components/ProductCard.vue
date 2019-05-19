<template>
  <v-card>
    <v-img
      :src="product.imageURL"
      :aspect-ratio="ratio"
    >
      <v-container v-if="!trunc" fluid fill-height>
        <v-layout justify-end row>
          <router-link to='/products'>
            <v-btn icon flat>
              <v-icon>close</v-icon>
            </v-btn>
          </router-link>
        </v-layout>
      </v-container>
    </v-img>

    <v-card-title primary-title>
      <h1 class="title mb-2">{{ product.name }}</h1>
      <v-container fluid class="pa-0">
        <v-layout class="mb-1" justify-space-between row>
          <span class="green--text">{{ currency }}</span>
          <span class="grey--text">Stock: {{ product.stock }}</span>
        </v-layout>
        <p :class="trunc ? 'text-truncate' : ''">
          {{ product.description }}
        </p>
        <router-link
          v-if="trunc"
          class="pa-0"
          :to="`/products/${product._id}`"
        >
          see details...
        </router-link>
      </v-container>
    </v-card-title>

    <v-card-actions>
      <v-btn flat color="teal"><v-icon>add_shopping_cart</v-icon>Add to Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
  a {
    color: teal;
    text-decoration: none;
  }
</style>

<script>
export default {
  name: 'productCard',
  props: {
    ratio: Number,
    trunc: Boolean,
    productInput: Object,
  },
  computed: {
    currency() {
      let format = 'Rp ';
      format += this.product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      return format;
    },
  },
  mounted() {
    if (this.productInput) {
      this.product = this.productInput;
    }
  },
  data() {
    return {
      product: {
        _id: '1',
        name: 'Iphone 6S',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae felis ac turpis fermentum lobortis ac a ante. Aenean eget libero tortor. Aenean laoreet tincidunt congue. Aliquam lacinia, orci at rhoncus eleifend, lacus lorem pharetra diam, eu laoreet tortor felis nec odio. Donec pretium euismod ipsum. Aliquam euismod, leo eu cursus auctor, mauris mauris posuere risus, in venenatis nibh velit nec ex. Nulla sed viverra eros. Phasellus congue urna ut pulvinar dignissim. Aenean tristique nisl ac libero ultricies, nec imperdiet ligula vestibulum. Fusce vel mauris ac nibh viverra faucibus. Proin non vehicula nibh. Ut venenatis fringilla magna non porttitor. Cras et laoreet est. Praesent euismod lorem lectus, elementum vulputate sem accumsan a. Nulla dignissim ante non nibh sagittis, eu pulvinar nisl ullamcorper.',
        price: 6000000,
        stock: 100,
        imageURL: 'http://static1.businessinsider.com/image/596e282cc50c291e008b4fb4-1190-625/the-best-apple-products-to-buy-from-apples-refurbished-mac-store.jpg',
        created: null,
        updated: null,
      },
    };
  },
};
</script>
