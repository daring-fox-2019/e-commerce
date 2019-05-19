<template>
  <div>
    <div class="row">
      <Carousel />

    </div>
    <div class="row">
      <div class="col-md-3" v-for="product in products" :key="product._id">
        <router-link :to="{'name': 'product-detail', params :{ id: product._id } }">
          <div class="my-card">
            {{product.name}}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Carousel from '@/components/Carousel.vue'
  import api from '@/api/localapi'

  export default {
    name: 'Home',
    components: {
      Carousel
    },
    data() {
      return {
        products : []
      }
    },
    methods: {
      fetchProducts() {
        api
        .get('/products')
        .then(({data}) => {
          this.products=data
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    mounted() {
      this.fetchProducts()
    }
  }
</script>