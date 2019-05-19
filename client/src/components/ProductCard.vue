<template>
  <v-card>
    <v-img
      src="http://static1.businessinsider.com/image/596e282cc50c291e008b4fb4-1190-625/the-best-apple-products-to-buy-from-apples-refurbished-mac-store.jpg"
      aspect-ratio="2"
    ></v-img>

    <v-card-title primary-title>
      <h1 class="title mb-2">Iphone 6s</h1>
      <v-container fluid class="pa-0">
        <v-layout class="mb-1" justify-space-between row>
          <span class="green--text">Rp 6,000,000.00</span>
          <span class="grey--text">Stock: 10</span>
        </v-layout>
        <p class="text-truncate">
          {{ product.description }}
        </p>
        <router-link class="pa-0" to="/">see details...</router-link>
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
  data() {
    return {
      product: {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae felis ac turpis fermentum lobortis ac a ante. Aenean eget libero tortor. Aenean laoreet tincidunt congue. Aliquam lacinia, orci at rhoncus eleifend, lacus lorem pharetra diam, eu laoreet tortor felis nec odio. Donec pretium euismod ipsum. Aliquam euismod, leo eu cursus auctor, mauris mauris posuere risus, in venenatis nibh velit nec ex. Nulla sed viverra eros. Phasellus congue urna ut pulvinar dignissim. Aenean tristique nisl ac libero ultricies, nec imperdiet ligula vestibulum. Fusce vel mauris ac nibh viverra faucibus. Proin non vehicula nibh. Ut venenatis fringilla magna non porttitor. Cras et laoreet est. Praesent euismod lorem lectus, elementum vulputate sem accumsan a. Nulla dignissim ante non nibh sagittis, eu pulvinar nisl ullamcorper.',
      },
    };
  },
};
</script>
