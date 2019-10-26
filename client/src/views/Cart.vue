<template>
  <v-container grid-list-md>
    <v-layout row>
      <v-flex xs4 fill-height>
        <v-card>
          <v-card-text v-show="cart.length > 0">
            <div v-for="(item, index) in cart" :key="index">
              <h2>
                <router-link
                  :to="'/myCart/' + item.product._id"
                  style="color: white;"
                >{{item.product.name}}</router-link>
              </h2>
              <v-layout row>
                <router-link :to="'/myCart/' + item.product._id">
                  <v-img
                    :src="require(`../assets/game/${item.product.shortkey}-1.jpg`)"
                    width="230"
                  ></v-img>
                </router-link>
                <v-layout column class="mx-3">
                  <router-link :to="'/myCart/' + item.product._id">View</router-link>
                  <p>{{ item.product.priceStr }}</p>
                  <p>
                    <a style="color: red;" @click.prevent="removeFromCart(item._id)">Remove</a>
                  </p>
                </v-layout>
              </v-layout>
              <v-divider class="mt-2"></v-divider>
            </div>
            <v-divider></v-divider>
            <v-layout row>
              <p>Total:</p>
              <v-spacer></v-spacer>
              <p>{{ totalStr }}</p>
            </v-layout>
            <v-btn color="success" @click.prevent="checkOut">Checkout</v-btn>
          </v-card-text>
          <v-card-text v-show="cart.length <= 0">
            Your cart is empty.
            <router-link to="/games">Click here</router-link> to browse games.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs8 fill-height>
        <router-view></router-view>
        <!-- <v-card min-height="400">
          <v-container>
          </v-container>
        </v-card>-->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: "cart",
  props: ["isLoggedIn"],
  data() {
    return {
      cart: [],
      total: 0,
      totalStr: ""
    };
  },
  methods: {
    getCart() {
      axios({
        method: "get",
        url: "http://34.87.56.140/carts/myCart",
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          data.forEach(item => {
            item.product.priceStr =
              "Rp " +
              item.product.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.total += item.product.price;
          });
          this.totalStr =
            "Rp " + this.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.cart = data;
        })
        .catch(err => {
          console.log({ err });
        });
    },
    removeFromCart(id) {
      axios({
        method: "delete",
        url: `http://34.87.56.140/carts/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          swal("Item Deleted", " ", "success");
          this.total = 0;
          this.getCart();
          this.$emit("update-cart");
        })
        .catch(err => {
          console.log({ err });
        });
    },
    checkOut() {
      swal({
          title: "Confirm checkout?",
          text: `The total amount you need to pay is ${this.totalStr}`,
          icon: "warning",
          buttons: true,
          // dangerMode: true,
        })
        .then(result => {
          if (result) {
            let games = [];
            this.cart.forEach(item => {
              games.push(item.product);
            });
            console.log({ products: games, total: this.total });
            axios({
              method: "post",
              url: "http://34.87.56.140/transactions",
              headers: {
                token: localStorage.token
              },
              data: {
                products: games,
                total: this.total
              }
            })
              .then(({ data }) => {
                swal(
                  "Success!",
                  "Have fun playing your new games.",
                  "success"
                );
                this.getCart();
                this.$emit("update-cart");
              })
              .catch(({ response }) => {
                let { status, statusText, data } = response;
                swal(`Error ${status}: ${statusText}`, data.message);
                console.log({ response });
              });
          }
        });
    }
  },
  created() {
    this.getCart();
  },
  watch: {
    isLoggedIn() {
      if (this.isLoggedIn) {
        this.getCart();
      } else {
        this.cart = [];
      }
    }
  }
};
</script>

<style>

</style>
