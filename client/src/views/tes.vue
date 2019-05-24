<template>
  <div>
    <v-layout>
      <v-flex>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex v-for="product in listProduct" :key="product._id" xs6>
              <v-card flat tile id="product">
                <v-img :src="product.image" height="250px">
                  <v-layout pa-2 column fill-height>
                    <v-spacer></v-spacer>
                    <v-flex shrink>
                      <div class="subheading">{{product.name}}</div>
                    </v-flex>
                  </v-layout>
                  <div class="middle">
                    <v-btn>Detail</v-btn>
                  </div>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      listProduct: [],
    };
  },
  created() {
    axios.get('http://localhost:3000/products').then(({ data }) => {
      this.listProduct = data;
    });
  },
};
</script>

<style scoped>
.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
#product:hover {
  opacity: 0.6;
}
#product:hover .middle {
  opacity: 1;
}
</style>
