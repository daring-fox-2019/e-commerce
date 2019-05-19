<template>
  <div class="container">
    <div class="row">
        <div id="product-list" class="col-lg-3 scroll">
          <product-item v-for="product in products" :product="product" />
        </div>
      <div class="row-5">
        <router-view ></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import serverapi from "@/api/serverapi";
import ProductItem from '@/components/ProductItem.vue'
import { mapState } from 'vuex'

export default {
    computed : {
    ...mapState([
      'authors',
      'isLogin'
    ])
  },
  name: 'ProductList',
  components: {
    ProductItem : ProductItem
  },
  data() {
    return {
      products: []
    };
  },
  methods: {
    fetchProducts() {
      serverapi
        .get('/products', {
          headers:{
            token: localStorage.getItem('token')
          }
        })
        .then((data) => {
          console.log(data)
          this.products = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    $route(){
      this.fetchProducts();
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style>
h4 {
  font-weight: 600;
}
p {
  font-size: 12px;
  margin-top: 5px;
}
.price {
  font-size: 18px;
  margin: 0 auto;
  color: #333;
}
.right {
  float: right;
  border-bottom: 2px solid #4b8e4b;
}
.thumbnail {
  opacity: 0.7;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.thumbnail:hover {
  opacity: 1;
  box-shadow: 0px 0px 10px #4bc6ff;
}
.line {
  margin-bottom: 5px;
}
.scroll{
  width: 400px;
  padding: 10px;
  overflow: scroll;
  height: 600px;
}
</style>
