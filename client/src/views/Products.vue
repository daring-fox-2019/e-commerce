<template>
  <v-container fluid fill-height>
    <v-layout column>
      <v-flex>
        <v-layout px-2>
          <v-spacer/>
          <v-btn color="blue" to="/addproduct">Add Product</v-btn>
        </v-layout>
      </v-flex>
      <v-layout wrap>
        <v-flex xs12 sm4 md4 lg3 v-for="product in products" :key="product._id" pa-3>
          <ProductCard :product="product"/>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
import ProductCard from "@/components/ProductCard.vue";
import api from "@/api/backend.js";

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
        let config = {
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
};
</script>

