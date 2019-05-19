<template>
  <v-container fluid fill-height>
    <v-layout column justify-start>
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
  </v-container>
</template>
<script>
import ProductCard from "@/components/ProductCard.vue";
import api from "@/api/backend.js";

let config = {}
export default {
    components: {
        ProductCard
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
        api.get('/products', config)
            .then(({data}) => {
                this.products = data
            })
            .catch(err => {
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

