<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row d-flex justify-content-center">
          <div class='mt-4'>
            <div class="list-inline list1" id="categories">
              <a class="list-inline-item px-5" href="#" @click.prevent='getAll'>All Category</a>
              <a class="list-inline-item px-5" href="#" @click.prevent='getQuery("fashion")'>Fashion</a>
              <a class="list-inline-item px-5" href="#" @click.prevent='getQuery("technology")'>Technology</a>
              <a class="list-inline-item px-5" href="#" @click.prevent='getQuery("household")'>Household Furniture</a>
              <a class="list-inline-item px-5" href="#" @click.prevent='getQuery("fnb")'>Food & Beverages</a>
              <a class="list-inline-item px-5" href="#" @click.prevent='getQuery("toy")'>Toys</a>
            </div>
          </div>
        </div>
        <div class='row' v-if='this.$route.params.id'>
          <router-view @updateCart='updateCart'></router-view>
        </div>
        <div class="row" v-else-if='!this.$route.params.id && searchResult.length === 0'>
          <ProductList :products='fetchedProducts'/>
        </div>
        <div class='row' v-else-if='searchResult.length > 0'>
          <ProductList :products='searchResult'/>
        </div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/views/ProductList.vue'
import axios from "@/api/server/axios";
import formatNumber from 'format-currency';

export default {
  name: "home",
  props: ['searchResult'],
  components: {
    ProductList
  },
  data(){
    return {
      fetchedProducts : [],
    };
  },
  methods: {
    updateCart(){
      this.$emit('updateCart')
    },
    getQuery(category){
      this.fetchedProducts = []
      this.$emit('empty-result')
      axios
        .get(`/products?category=${category}`,{
          headers:{
            token: localStorage.token
          }
        })
        .then(({ data })=>{
          this.fetchedProducts = data.map(el=>{
            el.formatPrice = formatNumber(el.price).split('.')[0]
            return el
          })
        })
        .catch(err=>{
          console.log(err)
        })
    },
    getAll(){
      this.$emit('empty-result')
      axios
      .get('/products', {
        headers : {
          token: localStorage.token
        }
      })
      .then(({ data })=>{
        this.fetchedProducts = data.map(el=>{
          el.formatPrice = formatNumber(el.price).split('.')[0]
          return el
        })
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  created(){
    this.getAll()
  }
};
</script>

<style>
.list1 a:hover{
  text-decoration: none;
  transform: scale(1.2);
  color: black
}
.list1 a{
  color: black;
  transition: transform .2s
}
/* #categories a:after{
  content: " |";
} */
</style>

