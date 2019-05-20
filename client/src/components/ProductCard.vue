<template>
  <v-card>
    <v-img
      v-if="product.imageURL"
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

    <v-progress-linear
      v-show="!productInput && loading"
      color="teal"
      :indeterminate="true">
    </v-progress-linear>

    <v-card-title primary-title>
      <h1 class="title mb-2">{{ product.name }}</h1>
      <v-container fluid class="pa-0" >
        <v-layout
          v-if="product.imageURL"
          class="mb-1"
          justify-space-between row
        >
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
      <v-btn
        v-if="product.imageURL"
        flat color="teal"
      >
        <v-icon>add_shopping_cart</v-icon>
        Add to Cart
      </v-btn>
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
import axios from '@/api/server';
import Swal from 'sweetalert2';
import { mapState } from 'vuex';

export default {
  name: 'productCard',
  props: {
    ratio: Number,
    trunc: Boolean,
    productInput: Object,
  },
  computed: {
    ...mapState([
      'loading',
    ]),
    currency() {
      let format = 'Rp ';
      format += this.product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      return format;
    },
  },
  watch: {
    // eslint-disable-next-line
    '$route.params'() {
      if (this.productInput) {
        this.product = this.productInput;
      } else {
        this.getProduct();
      }
    },
  },
  mounted() {
    if (this.productInput) {
      this.product = this.productInput;
    } else {
      this.getProduct();
    }
  },
  data() {
    return {
      product: {
        _id: '',
        name: '',
        description: '',
        price: 0,
        stock: 0,
        imageURL: null,
        created: null,
        updated: null,
      },
    };
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;
      this.$store.commit('setLoading', true);
      axios
        .get(`/products/${id}`)
        .then(({ data }) => {
          this.$store.commit('setLoading', false);
          const { product } = data;
          this.product = product;
        })
        .catch((err) => {
          this.$store.commit('setLoading', false);
          const { message } = err.response.data;
          Swal.fire({
            position: 'top',
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
};
</script>
