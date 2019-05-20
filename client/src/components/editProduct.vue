<template>
  <div class="container p-3">
    <h1 class="text-center">Edit Product</h1>
    <form enctype="multipart/form-data">
      <div class="form-group">
        <label>Title:</label>
        <input v-model="title" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label>Description:</label>
        <textarea v-model="description" type="text" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label>Stock:</label>
        <input v-model="stock" type="number" class="form-control">
      </div>
      <div class="form-group">
        <label>Price:</label>
        <input v-model="price" type="number" class="form-control">
      </div>
      <div class="custom-file p-4">
        <input v-on:change="getImage" ref="image" type="file" class="custom-file-input" lang="in">
        <label class="custom-file-label" for="customFileLang">{{image}}</label>
      </div>
      <button v-on:click.prevent="editProduct" type="submit" class="btn btn-primary">Simpan</button>
    </form>
  </div>
</template>

<script>
import axios from "@/api/axios.js";

export default {
  name: "editProduct",
  data() {
    return {
      idProduct: "",
      valid: true,
      title: "",
      description: "",
      stock: "",
      price: "",
      image: ""
    };
  },
  created() {
    this.idProduct = this.$route.params.id;
    this.getOne();
  },
  wacth () {
    this.getOne()
  },
  methods: {
    getOne() {
      axios
        .get(`products/${this.$route.params.id}`, {headers : {token : localStorage.getItem('token')}})
        .then(({ data }) => {
          console.log(data);
          this.title = data.title;
          this.description = data.description;
          this.stock = data.stock;
          this.image = data.image;
          this.price = data.price;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getImage() {
      this.image = this.$refs.image.files[0];
    },

    editProduct() {
      let fd = new FormData();
      fd.append("title", this.title);
      fd.append("description", this.description);
      fd.append("price", this.price);
      fd.append("stock", this.stock);
      fd.append("image", this.image);
      axios
        .put(`products/${this.$route.params.id}`, fd, { headers : { token : localStorage.getItem('token')}})
        .then(product => {
          console.log(product);
          this.$router.push({path:'/listProduct'})
        })
        .catch(err => {

        });
    }
  }
};
</script>

<style>
</style>
