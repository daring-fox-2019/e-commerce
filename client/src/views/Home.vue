<template>
  <div class="home">
    <v-carousel id="carousel">
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
    </v-carousel>

    <v-container id="showProduct" class="pa-0" fluid>
      <v-layout class="ma-4" justify-center>
      <h1>Product</h1>  
      </v-layout>
      <v-layout row wrap>
        <v-flex v-for="product in listProduct" :key="product._id" md4>
          <v-card>
            <v-img :src="product.image" >
            <span class="my-span">
              {{ product.name }}
            </span></v-img>
          </v-card>
        </v-flex>
      </v-layout>


      <v-layout class="ma-4" justify-center>
      <h1>Discover</h1>  
      </v-layout>
      <v-layout row wrap>
        <v-flex v-for="(item, index) in discover" :key="index" md3>
            <v-img :src="item.src" ></v-img>
            <span style="float: left;">{{item.text}}</span>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import CardProduct from "@/components/CardProduct.vue";
import Product from "@/components/Product.vue";
import axios from "axios";

export default {
  name: "home",
  components: {
    CardProduct,
    Product
  },
  data() {
    return {
      items: [  
        {
          src: "https://files1.porsche.com/filestore/image/multimedia/none/rd-2019-homepage-banner-ww-e3coupes-kw20/normal/929409a3-76dc-11e9-80c4-005056bbdc38;sN/porsche-normal.jpg",
        },
        {
          src: "https://files1.porsche.com/filestore/image/multimedia/none/rd-2018-homepage-banner-ww-thenewmacan-kw39/normal/8f8d6b33-bbe3-11e8-81d2-0019999cd470;sN/porsche-normal.jpg"
        },
        {
          src: "https://files1.porsche.com/filestore/image/multimedia/none/rd-2017-homepage-banner-ww-g2turbosphev-kw12ii/normal/ee48055f-88b6-11e7-99c7-0019999cd470;sN/porsche-normal.jpg"
        },
        {
          src: "https://files1.porsche.com/filestore/image/multimedia/none/rd-2017-homepage-banner-ww-718gts-kw44/normal/b2685067-b8c4-11e7-b591-0019999cd470;sN/porsche-normal.jpg"
        }
      ],
      discover: [
        {
          src: "https://files1.porsche.com/filestore/image/multimedia/none/rd-2018-homepage-teaser-ww-e-performance-kw12/normal/f7cc8e7c-6599-11e9-80c4-005056bbdc38;sK/porsche-normal.jpg",
          text: "Porsche E-Performance."
        },{
          src: "https://files1.porsche.com/filestore/image/multimedia/none/rd-2013-homepage-teaser-ww-pds/normal/6e3aa3c3-778e-11e7-99c7-0019999cd470;sK/porsche-normal.jpg",
          text: "Porsche Driver's Selection."
        },{
          src: "https://files1.porsche.com/filestore/image/multimedia/none/rd-2017-homepage-teaser-porscheexclusivemanufaktur-kw24/normal/3cbd9b47-4c59-11e7-bfe2-0019999cd470;sK/porsche-normal.jpg",
          text: "Porsche Exclusive Manufaktur."
        },{
          src: "https://files1.porsche.com/filestore/image/multimedia/none/teaser-ww-rediantpower-kw25/normal/9f09e518-33cc-11e6-9225-0019999cd470;sK/porsche-normal.jpg",
          text: "Radiant Power."
        }
      ],
      listProduct: []
    };
  },
  created() {
    axios
      .get("http://localhost:3000/products")
      .then(({ data }) => {
        this.listProduct = data;
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.home{
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.car {
  margin-bottom: 15px;
}

#list {
  margin-right: 5px;
}

#carousel {
  height: 100vh;
  width: 100%;
}
#showProduct {
  width: 100%;
}
#detail {
  display: fixed;
}

.my-span {
  color: black;
  font-size:2rem;
  margin-top: 20px;
  margin-left: 20px;
  float: left;
}
</style>
