<template>
  <v-card>
    <v-img
      class="white--text"
      aspect-ratio="1"
      :src="product.imageURL"
    >
      <v-container fill-height style="background:rgba(0, 0, 0, 0.3)" fluid>
        <v-layout>
          <v-flex xs12>
            <span :class="style[iStyle].header">{{ product.name }}</span>
          </v-flex>
        </v-layout>
        <footer>
          <router-link :to="`/products/${product._id}`">
            <span :class="style[iStyle].detail">
              see here
              <v-icon :small="style[iStyle].small" color="white">
                navigate_next
              </v-icon>
            </span>
          </router-link>
        </footer>
      </v-container>
    </v-img>
  </v-card>
</template>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>

<script>
export default {
  name: 'recommendCard',
  props: {
    iStyle: Number,
    productInput: Object,
  },
  mounted() {
    this.product = this.productInput;
  },
  data() {
    return {
      style: [
        {
          header: 'display-1',
          detail: 'title',
          small: false,
        },
        {
          header: 'title',
          detail: 'body-2',
          small: true,
        },
      ],
      product: {
        _id: '',
        name: '',
        imageURL: '',
        created: null,
        updated: null,
      },
    };
  },
};
</script>
