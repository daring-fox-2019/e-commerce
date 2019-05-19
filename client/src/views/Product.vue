<template>
  <div class="home">
    <v-layout>
      <v-flex xs4 id="list">
        <v-card
          v-for="product in listProduct"
          :key="product._id"
          class="car"
          :to="'/product/'+product._id"
        >
          <v-flex>
            <v-card>
              <v-img :src="product.image" aspect-ratio="2.75"></v-img>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{product.name}}</h3>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex xs8 id="detail">
        <router-view/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'home',
  components: {},
  data() {
    return {
      listProduct: [],
    };
  },
  created() {
    axios
      .get('http://35.198.240.251/products')
      .then(({ data }) => {
        this.listProduct = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.car {
  margin-bottom: 15px;
}

#list {
  padding: 10px;
  height: 100vh;
  overflow: scroll;
  margin-right: 5px;
}

#detail {
  display: fixed;
}
</style>
