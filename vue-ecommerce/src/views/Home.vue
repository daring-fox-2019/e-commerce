<template>
  <div class="home">
    <navbar/>
    <div class="container mt-5" style="height: 500px;">
    <carousel/>
  </div>
  <b-nav-form>
    <b-form-input v-model="searchQuery" type="text" class="col-8 offset-2 mr-sm-2" placeholder="Search"></b-form-input>
  </b-nav-form>
    <div class="dflex justify-content-center jumbotron" style="background-color : transparent">
      <!-- <div class="card col">
        <h1 class="card">Product List</h1>
        <div class="card-body row justify-content-center">
          <div class="card row col-2 justify-content-center mr-2 ml-2 mt-3" v-for="index in 5" :key="index">
            <img style="width: 200px; margin-left: 40px;" src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/5/1784442/1784442_4b0763f2-e6e3-4350-b0fd-7bae03e7731f_960_1280.jpg" alt="hoodie-ps">
                <span> Title : </span>
                <span> Price : </span>                
                <span> Description : </span>
          </div>
        </div>
    </div> -->
    <div class="card col-8 offset-2">
    <div class="row justify-content-center">
      <div v-for="product in products" :key="product._id">
      <router-link :to="product._id + '/detailPage'" style="text-decoration: none; color: black">
      <b-card
        :img-src="product.image"
        img-alt="Image"
        img-top
        id="product-card"
        tag="article"
        style="max-width: 12rem; min-width: 12rem;background-color : 	#bde7e6"
        class="mt-2 mb-4 mr-2 ml-2 imageCard"
      >
        <!-- <h5 slot="header" style="text-align: left;"> header </h5> -->
        <b-card-text >
          <!-- <img src="product.image"> -->
          <div style="text-align : left">
          <h6>{{product.title}}</h6>
          <!-- <hr/>
          <span class="product-desc">
          Some quick example text lorem ipsum dolor sit amet.
          </span> -->
          </div>
          <hr/>
          <div style=" text-align: right ">
          <b><span class="price">
          Rp.{{product.price}}
          </span></b>
          <div>
          <span>{{product.location}}</span>
          </div>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          </div>
        </b-card-text>
        <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
      </b-card>
      </router-link>

      </div>
    </div>
  </div>
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import navbar from '@/components/navbar.vue'
import carousel from '@/components/carousel.vue'


export default {
  name: 'home',
  data(){
    return {
      searchQuery : "",
      products : []
    }
  },
  computed: {
    filteredResources(){
      console.log(this.searchQuery);
      if(this.searchQuery){
          return this.products.filter((item)=>{
              return item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          })
      }else{
          return this.products
      }
    }
  },
  components: {
    navbar,
    // HelloWorld
    carousel
  },
  methods: {
    toDetail(id){
      // this.$router.push('/:id/productDetail/')
    }
  },
  created(){
    this.products = []

    axios({
      method : 'get',
      url : "http://localhost:3000/products"
    })
    .then(({data}) =>{
      data.forEach(element => {
        // console.log(element);
        this.products.push(element)
      });
    })
    .catch(err =>{
      console.log(err);
    })
  }
}
</script>

<style>
.b-card{
  border-radius: 0.5;
}

#product-card {
  transition: transform 0.5s;
}
#product-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .15);
  content: '';
  opacity: 0;
  z-index: -1;
}
#product-card:hover, #product-card:focus {
  transform: scale3d(1.006, 1.006, 1);
}
#product-card:hover::after, #product-card:focus::after {
  opacity: 1;
}

.card-img-top{
  height: 200px
}


</style>
