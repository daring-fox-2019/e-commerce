<template>
  <v-card width="355">
    <v-img :src="product.image" aspect-ratio="2.75" left></v-img>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{product.name}}</h3>
        <div>{{product.price}}</div>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat color="orange" @click="addCart">Add Cart</v-btn>
      <v-btn flat color="orange" to="">See More</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  props: ["product"],
  methods: {
    addCart() {
      console.log(this.product._id);

      axios
        .post(
          "http://localhost:3000/cart",
          { productId: this.product._id },
          { headers: { token: localStorage.token } }
        )
        .then(({ data }) => {
            console.log("ADD CART SUCCESS");
            
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
