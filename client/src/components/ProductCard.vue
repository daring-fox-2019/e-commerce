<template>
  <v-hover>
    <v-card slot-scope="{ hover }" class="mx-auto" color="grey lighten-4" max-width="300">
      <v-img :aspect-ratio="16/9" :src="product.image">
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out yellow lighten-4 v-card--reveal display-1 black--text"
            style="height: 100%;"
          >Rp. {{formattedPrice}}</div>
        </v-expand-transition>
      </v-img>
      <v-card-text class="pt-4" style="position: relative;">
        <v-btn absolute color="yellow" class="grey--text" fab large right top @click="addToCart">
          <v-icon>shopping_cart</v-icon>
        </v-btn>
        <!-- <router-link :to="`/products/${product._id}`"><div class="font-weight-light grey--text title mb-2">Fiqh</div></router-link> -->
        <router-link :to="`/products/${product._id}`">
          <h3 class="grey--text mb-2">
           {{ product.name }}
          </h3>
        </router-link>
        <div class="font-weight-light black--text mb-2 text-truncate">
          {{ product.description }}
        </div>
      </v-card-text>
      <v-layout row v-if="$store.state.user && $store.state.user.role === 'admin'">
        <v-flex>
          <v-btn color="blue" small :to="'products/'+product._id+'/update'">Update</v-btn>
          <v-btn color="red" small @click="deleteProduct">Delete</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-hover>
</template>
<script>
import commaFormat from '@/helpers/priceFormat.js'

export default {
    props: ['product'],
    computed: {
      formattedPrice() {
        return commaFormat(this.$props.product.price);
      }
    },
    methods: {
      addToCart() {
        let item = {
          _id: this.$props.product._id, 
          quantity: 1, 
          price:  this.$props.product.price,
        }

        this.$store
            .dispatch('addCartItem', item)
            .then(({ data }) => {
                console.log(data);
                this.$store.dispatch('getCurrentCart');
            })
            .catch((err) => {
              let msg  = err.response.data
              if(msg.includes('dup')) {
                msg = 'Product existing in the cart!'
              }
              swal.fire('AddItem Error', msg , 'error');
            });
    },
      deleteProduct() {
        this.$emit('deleteproduct', this.$props.product._id);
      } 
    }
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .7;
  position: absolute;
  width: 100%;
}
a:link, a:active {
  text-decoration: none;
}
</style>


