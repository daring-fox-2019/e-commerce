<template>
  <div>
    <div class="row">
      <Carousel />
    </div>
    <Card
      :categories="cerealProducts"
    >
      <div class="row">
        <h5>Cereals</h5>
      </div>
    </Card>
    <Card
      :categories="shirtProducts"
    >
      <div class="row">
        <h5>Shirt</h5>
      </div>
    </Card>
    <Card
    :categories="aqiqahProducts"
    >
      <div class="row">
        <h5>Aqiqah</h5>
      </div>
    </Card>
    <Card
      :categories="birthdayProducts"
    >
      <div class="row">
        <h5>Birthday</h5>
      </div>
    </Card>
  </div>
</template>

<script>
  import api from '@/api/localapi'
  import Carousel from '@/components/Carousel.vue'
  import Card from '@/components/Card.vue'

  export default {
    name: 'Home',
    components: {
      Carousel,
      Card
    },
    data() {
      return {
        products : [],
        cerealProducts : [],
        aqiqahProducts : [],
        shirtProducts : [],
        birthdayProducts : []
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
      },
      fetchProductByCereal() {
        api
        .get('/products/category?category=cereal')
        .then(({data}) => {
          this.cerealProducts=data
        })
        .catch(err => {
          console.log(err);
        })
      },
      fetchProductByShirt() {
        api
        .get('/products/category?category=shirt')
        .then(({data}) => {
          this.shirtProducts=data
        })
        .catch(err => {
          console.log(err);
        })
      },
      fetchProductByAqiqah() {
        api
        .get('/products/category?category=aqiqah')
        .then(({data}) => {
          this.aqiqahProducts=data
        })
        .catch(err => {
          console.log(err);
        })
      },
      fetchProductByBirthday() {
        api
        .get('/products/category?category=birthday')
        .then(({data}) => {
          this.birthdayProducts=data
        })
        .catch(err => {
          console.log(err);
        })
      },
    },
    mounted() {
      this.fetchProducts()
      this.fetchProductByCereal()
      this.fetchProductByShirt()
      this.fetchProductByAqiqah()
      this.fetchProductByBirthday()
    }
  }
</script>