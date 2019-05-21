<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-4 mb-5" v-for="(list,index) in listproduct" :key="index">
          <div class="card">
            <div class="card-header">{{list.title}}</div>
            <div class="card-body">
              <div class="view overlay zoom">
                <router-link :to="'/detailProduct/' + list._id">
                  <img
                    v-bind:src="list.image"
                    class="rounded mx-auto d-block"
                    alt="..."
                    height="300"
                    width="300"
                  >
                </router-link>
              </div>
            </div>
            <div class="card-body">
              <div style="display:flex; justify-content: center">{{ getRupiah(list.price)}}</div>
            </div>
            <div class="card-footer" style="display:flex; justify-content: space-between" v-if="!iscustomer">
              <button type="submit" @click="editProduct(list._id)">Edit</button>
              <button type="submit" @click="deleteProduct(list._id)">Delete</button>
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
  name: "ListProduct",
  props: ["page", "listproduct"],
  data() {
    return {
      iscustomer : false
    };
  },
  created() {
    if (localStorage.role === "customer") {
      this.iscustomer = true;
    }
  },
  methods: {
    editProduct(id) {
      this.$router.push({ path: `/editProduct/${id}` });
    },
    deleteProduct(id) {
      axios
        .delete(`products/${id}`,{headers : {token : localStorage.getItem('token')}})
        .then(({ data }) => {
          this.$router.push({ path: `/listProduct` });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRupiah(price){
      return convertRupiah.convert(price)
    }
  }
};
</script>

<style>
</style>
