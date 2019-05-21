<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-8">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" style="width:50px">No</th>
                <th scope="col" style="width:100px">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody v-for="(product, index) in products" v-bind:key="index">
              <tr>
                <th scope="row">{{index+1}}</th>
                <td>
                  <p>{{product.title}}</p>
                  <img
                    :src="product.image"
                    alt
                    style="max-height: 100px"
                  >
                </td>
                <td >{{getRupiah(product.price)}}</td>
                <td>
                  <button type="button" class="btn btn-outline-danger" @click="removeCart(product._id)">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-4">
          <div class="container mt-5">
            <div class="card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Ringkasan Belanja</h5>
                <p class="card-text">Total Harga : {{total}}</p>
                <a href="#" class="btn btn-primary">Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios.js";
import convertRupiah from "rupiah-format";
export default {
  data() {
    return {
      products : [],
      total : ''
    };
  },
  created() {
    this.getListCart();
  },
  methods: {
    getListCart() {
      axios
        .get("/products/cartProduct", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.products = data
          console.log(this.products);
          let total = 0
          data.forEach(el => {
            total+=el.price
          });
          this.total = convertRupiah.convert(total)
        })
        .catch(err=>{
          console.log(err);
        })
    },
    getRupiah(price){
      return convertRupiah.convert(price)
    },
    removeCart(id){
      axios
        .patch(`/products/cart/${id}`, null,{
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.getListCart()
          console.log(data);
        })
        .catch(err=>{
          console.log(err);
        })
    }
  }
};
</script>

<style>
</style>
