<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <h1 class="my-4">Beli - Bli</h1>
        <div class="list-group">
          <Category v-for="category in categories" :category="category" :key="category"/>
        </div>
      </div>
      <router-view/>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import Product from '@/components/Product.vue';
import Category from '@/components/Category.vue';
import axios from '@/axios'

export default {
  name: 'allproducts',
  components: {
    // Product,
    Category,
  },
  data() {
    return {
      // products: []
    };
  },
    computed: mapState([
    // map this.count to store.state.count
    'categories','products'
  ]),
  watch: {
    $route(to, from){
      this.getProducts()
    }
  },
  created() {
    if (!this.$store.state.logRegStatus.loggedIn) {
      this.$router.push('/auth');
    }
    this.getProducts()
  },
  methods: {
    getProducts(){
      if(this.$route.params.category == 'all')
        this.$store.dispatch('getAllProducts')
      else
        this.$store.dispatch('getProductsByCategory',this.$route.params.category)
    }
  }
};
</script>
