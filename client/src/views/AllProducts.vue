<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <h1 class="my-4">Beli - Bli</h1>
        <div class="list-group">
          <Category/>
        </div>
      </div>
      <div class="col-lg-9">
        <div class="row mt-4">
          <Product v-for="product in products" :key="product._id"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Product from '@/components/Product.vue';
import Category from '@/components/Category.vue';
import axios from '@/axios'

export default {
  name: 'allproducts',
  components: {
    Product,
    Category,
  },
  data() {
    return {
      // products: []
    };
  },
    computed: mapState([
    // map this.count to store.state.count
    'products'
  ]),
  // watch: {
  //   '$store.state.products'(){
  //     this.products = this.$store.state.products
  //   }
  // },
  created() {
    if (!this.$store.state.logRegStatus.loggedIn) {
      this.$router.push('/auth');
    } else {
      this.$store.dispatch('getAllProducts');
    }
  },
  // created() {
  //     axios({
  //       method: 'GET',
  //       url: '/products/read',
  //       headers: {
  //         token: localStorage.getItem('token'),
  //       },
  //     })
  //       .then(({ data }) => {
  //         this.products = data
  //         console.log(this.products)
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  
};
</script>
