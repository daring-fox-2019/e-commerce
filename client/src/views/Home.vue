<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <v-carousel id="carousel">
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
    </v-carousel>
    <v-container fluid>
      <v-layout row>
        <v-flex xs4 order-md2 order-xs1>
          <v-card dark tile flat color="red lighten-1">
            <v-card-text>#1</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4 order-md3 order-xs2>
          <v-card dark tile flat color="red lighten-2">
            <v-card-text>#2</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4 order-md1 order-xs3>
          <v-card dark tile flat color="red darken-1">
            <v-card-text>#3</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex v-for="product in listProduct" :key="product._id">
          <CardProduct :product=product />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "home",
  components: {
    CardProduct
  },
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ],
      listProduct: []
    };
  },
  created() {
    axios
      .get("http://localhost:3000/products")
      .then(({data}) => {
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
#detail {
  display: fixed;
}
</style>
