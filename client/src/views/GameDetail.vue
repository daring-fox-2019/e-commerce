<template>
  <section>
    <v-container>
      <v-carousel height="700">
        <!-- :delimiter-icon="require(`../assets/game/${currentGame.shortkey}-${i+1}.jpg`)" -->
        <v-carousel-item
          v-for="(item,i) in currentGame.featuredImg"
          :key="i"
          :src="require(`../assets/game/${currentGame.shortkey}-${i+1}.jpg`)"
        ></v-carousel-item>
      </v-carousel>
      <v-card class="mt-4">
        <v-container>
          <v-card-title>
            <h1>{{currentGame.name}}</h1>
            <v-spacer></v-spacer>
            <h1>Rp {{currentGame.price}}</h1>
            <v-btn color="success" @click.prevent="addToCart(currentGame._id)">
              <v-icon>shopping_cart</v-icon>Add to Cart
            </v-btn>
          </v-card-title>
          <v-card-text>
            <p>{{currentGame.tags}}</p>
            <p style="text-align: justify;">{{currentGame.description}}</p>
          </v-card-text>
        </v-container>
      </v-card>
    </v-container>
    <!-- {{currentGame}} -->
    <!-- <v-img :src="currentGame.featuredImg[0]"></v-img> -->
  </section>
</template>

<script>
export default {
  name: "gameDetail",
  props: {},
  data() {
    return {
      currentGame: {}
    };
  },
  methods: {
    addToCart(id) {
      // console.log({id})
      if(!localStorage.token) {
        this.$router.push('/login')
        // this.$emit('login-popup')
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:3000/carts',
          headers: {
            token: localStorage.token
          },
          data: {
            productId: id
          }
        })
          .then(({data}) => {
            swal.fire('Added to cart!', this.currentGame.name, 'success')
            this.$emit('update-cart', data)
          })
          .catch(err => {
            console.log({ err })
          })
      }
    },
  },
  created() {
    // console.log(this.$route.params);
    axios({
      method: "get",
      url: `http://localhost:3000/products/${this.$route.params.id}`
    })
      .then(({ data }) => {
        // console.log({ data });
        data.tags = data.tags.join(', ')
        data.price = data.price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.currentGame = data;
      })
      .catch(err => {
        console.log({ err });
      });
  }
};
</script>