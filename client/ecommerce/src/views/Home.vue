<template>
  <div class="home" >
    <div
      v-for="(item,index) in items" :key="index"
      class="jumbotron  "
      style="background-color:#F8F1BD;" >
        <ItemMain v-if= "index % 2 == 0" class="d-flex justify-content-center flex-row-reverse" v-bind:item = "item" />
        <ItemMain v-if= "index % 2 == 1" class="d-flex justify-content-center flex-row" v-bind:item = "item" />
    </div>
    <div class="container-fluid" >
        <div class="row d-flex justify-content-center" style="background-color:#F0D798">
          <h2 style="color:#FEFEFD;" class="mt-3"> Other perfect stuff</h2>
        </div>
        <div class="row d-flex justify-content-center" style="background-color:#D0B673">
          <a href=""><h5 class="mb-3">See All ></h5></a>
        </div> 
        <div class="row mb-5 mt-3">
          <div class="col-sm-3 p-5">
            <a href="">
                <img src="https://cdn.shopify.com/s/files/1/2943/3986/products/product-image-625792735_1024x1024@2x.jpg?v=1529948100" class="img-thumbnail" style="height:100%; width:100%">
            </a>
          </div>
          <div class="col-sm-3 p-5">
            <a href="">
                <img src="https://cdn.shopify.com/s/files/1/2943/3986/products/product-image-901331497_1024x1024@2x.jpg?v=1553536310" class="img-thumbnail" style="height:100%; width:100%">
            </a>
          </div>
          <div class="col-sm-3 p-5">
            <a href="">
                <img src="https://cdn.shopify.com/s/files/1/2943/3986/products/product-image-805652084_1024x1024@2x.jpg?v=1538415197" class="img-thumbnail" style="height:100%; width:100%">
            </a>
          </div>
          <div class="col-sm-3 p-5">
            <a href="">
                <img src="https://cdn.shopify.com/s/files/1/2943/3986/products/product-image-490002421_1024x1024@2x.jpg?v=1527953117" class="img-thumbnail" style="height:100%; width:100%">
            </a>
          </div>
        </div>      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from '@/api/server.js'
import ItemMain from '@/components/ItemMain.vue'
export default {
  name: 'home',
  data () { 
    return {
      items : [],
      position : " "
    }
  },
  components: {
    ItemMain
  },
  methods : {
      fetchItem () {
        axios.get('/items')
      .then (({ data }) =>{
        this.items = data.filter (el =>{
            return el.mainPage == true
        })
      })
      .catch (err =>{
        console.log(err)
      })
      }
  },
  mounted () {
      this.fetchItem()
  },
}
</script>

<style>
 .home {
   font-family: Roboto, sans-serif ;
   }
  body {
    background-color: #F8F7F8;
  }
</style>
