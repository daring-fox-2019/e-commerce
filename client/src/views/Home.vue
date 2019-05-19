<template>
  <v-container fluid fill-height>
    <v-layout column justify-start v-if="!$store.state.isLoading">
      <div class="headline">Featured Books</div>
      <v-layout px-2 v-if="$store.state.user && $store.state.user.role ==='admin'">
          <v-spacer></v-spacer>
          <v-btn color="blue" to="/addproduct">Add Product</v-btn>
      </v-layout>
      <v-layout wrap>
        <v-flex xs12 sm4 md4 lg3 v-for="product in products" :key="product._id" pa-3>
          <ProductCard :product="product" @deleteproduct="deleteProduct"/>
        </v-flex>
      </v-layout>
    </v-layout>
    <v-container v-if="$store.state.isLoading" full-height fluid>
        <v-layout mb-5 align-center justify-center>
            <v-flex>
                <Circle2 :size="'120px'"></Circle2>
            </v-flex>
        </v-layout>
    </v-container>
  </v-container>
</template>
<script>
import ProductCard from "@/components/ProductCard.vue";
import api from "@/api/backend.js";
import {Circle2} from 'vue-loading-spinner';

let config = {}
export default {
    components: {
        ProductCard,
        Circle2,
    },
    data() {
        return {
            products: [],
        }
    },
    mounted() {
        config = {
            headers: {
                'Authorization': localStorage.ecomm_token
            }
        }
        this.$store.commit('setIsLoading', true);
        api.get('/products', config)
            .then(({data}) => {
                this.products = data
                this.$store.commit('setIsLoading', false);
            })
            .catch(err => {
                this.$store.commit('setIsLoading', false);
                swal.fire('Error', err.response.data, 'error')
            })
    },
    methods: {
        deleteProduct(id) {
            api.delete('/products/' + id, config)
            .then(({data}) => {
                swal.fire('Success', 'Product deleted successfully!', 'success')
                this.products = this.products.filter(x => x._id !== id)
            })
            .catch(err => {
                swal.fire('Error', err.response.data, 'error')
            })
        }
    }
};
</script>