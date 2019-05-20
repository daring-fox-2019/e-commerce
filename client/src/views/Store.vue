<template>
  <div id="store">
        <v-carousel>
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
         ></v-carousel-item>
        </v-carousel>
        <br>
        <h1 style="text-align:center;">Products</h1>
        <div class="row">
            <Card v-for="product in products" :product="product"></Card>
        </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  data() {
    return {
      products: [],
      items: [
          {
            src: 'https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2017/08/Banner-Blog-Seller-Center-1200x630.jpg'
          },
          {
            src: 'http://www.sopsip.com/upload/sopsip.com/deal/14763/36d32c0257e8608cb62c31c666788f3a.jpg'
          },
          {
            src: 'http://www.sopsip.com/upload/sopsip.com/deal/14363/fcc86d67842f686ff72b4914d2e898a8.jpg'
          },
        ],
    };
  },
  components:{
      Card
  },
  methods: {
    getAllProducts() {
      let token = localStorage.getItem("token");
      this.$axios
        .get("http://localhost:3000/products", { headers: { token } })
        .then(({ data }) => {
          this.products = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getAllProducts();
  }
};
</script>


<style scoped>
    .row{
        margin-top:50px;
        margin-left: 10%;
        margin-right: 10%;
    }
</style>
