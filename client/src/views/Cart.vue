<template>
  <div v-if="userCart.length !== 0" class="container">
    <h5 class="my-4 text-center display-4">My Cart</h5>
    <div class="row">
      <div class="col-8">
        <div class="row">
            <CartProducts v-on:delete-cart="deleteCart" v-on:update="update" :product="product" class="col-lg-6 my-3" v-for="(product, index) in userCart" :key="index"></CartProducts>
        </div>
      </div>
      <div class="col-4 my-4 text-center">
        <h5 class="my-4">Shopping Details</h5>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in userCart" :key="index">
              <th scope="row">{{index + 1}}</th>
              <td>{{product.ProductId.productName}}</td>
              <td>$ {{product.ProductId.price}}</td>
              <td>$ {{product.amount * product.ProductId.price}}</td>
            </tr>
          </tbody>
        </table>
        <a href="#" @click.prevent="previewCart" type="button" class="btn btn-light btn-lg">Checkout Cart</a>
      </div>
    </div>
  </div>
  <div v-else class="container">
    <div class="row">
      <div class="col-8">
          <img src="https://assets-ouch.icons8.com/thumb/512/4bb05dde-7b72-4683-b786-9a9b7b41e6b3.png" alt="" srcset="">
      </div>
      <div class="col-4 text-center mt-5">
        <h5>Your Cart is empty</h5>
        <p>Checkout Our Products!</p>
        <router-link to="/home" type="button" class="btn btn-light btn-lg mt-5">Continue Shop</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../api/localhost.js";
import CartProducts from "@/components/CartProducts.vue"
export default {
  components : {
    CartProducts
  },
  props : ['userCart'],
  created() {
      this.fetchCarts()
  },
  methods: {
    previewCart() {
      this.$router.push(`/carts/preview/${this.$route.params.id}`)
    },
    fetchCarts() {
      this.$emit('fetch-cart')
    },
    update(id, value) {
      axios
        .patch(
          `/carts/${id}`,
          {
            compute: value
          },
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(({ data }) => {
          console.log(data);
          this.fetchCarts()
        })
        .catch(err => {
          this.$swal('Items is out of stock')
          console.log(err);
        });
    },
    deleteCart(id){
      axios
        .delete(`/carts/${id}`, {
          headers : { token : localStorage.getItem('token') }
        })
        .then(({ data })=> {
          console.log(data);
          this.fetchCarts()
        })
        .catch((err)=> {
          console.log(err);
        })
    }
  }
};
</script>

<style scoped>
.btn {
  background: none;
  font-weight: 400;
  transition: 0.3s;
  border: black 2px solid;
  letter-spacing: -0.2px;
}
.btn:hover {
  background: #083232;
  color: white;
  border: black 1px solid;
}
</style>
