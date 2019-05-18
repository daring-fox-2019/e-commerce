<template>
  <div class="home">
    <v-layout>
      <v-flex xs4 id="list">
        <v-card>
          <v-flex>
            <v-card>
              <v-img :src="product.image" aspect-ratio="2.75" left></v-img>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{product.name}}</h3>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="orange" @click="addCart">Add Cart</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-card>
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
      product: {},
    };
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get(`http://localhost:3000/products/${this.$route.params.id}`)
        .then(({ data }) => {
          this.product = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCart() {
      axios
        .post(
          'http://localhost:3000/cart',
          { productId: this.product._id },
          { headers: { token: localStorage.token } },
        )
        .then(() => {
          console.log('ADD CART SUCCESS');
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
