<template>
  <div class="container">
    <div class="col">
      <div class="row-12 bg-warning">sdasd</div>
      <div class="div row-12">
        <div class="row-12 border bg-info">
          <form class="col-5 float-right" method="post" @submit.prevent="addProduct" >
            <div class="form-group">
              <label for="productname">Product Name:</label>
              <input
              v-model="name"
              type="text"
              class="form-control"
              id="productname"
              placeholder="Product name">
            </div>
            <div class="form-group">
              <label for="description">Description:</label>
              <textarea
              v-model="description"
              class="form-control"
              id="description"
              rows="3"
              placeholder="Description Product"></textarea>
            </div>
            <div class="form-group">
              <label for="price">Price:</label>
              <input
              v-model="price"
              type="number"
              class="form-control"
              id="price"
              placeholder="Price">
            </div>
            <div class="custom-file">
              <label for="image"></label>
              <input
              type="file"
              id="file"
              ref="file"
              v-on:change="handleFileUpload()"/>  <br>
            </div>
            <div class="form-group">
              <label for="category">Category:</label>
              <input
              v-model="category"
              type="text"
              class="form-control"
              id="category"
              placeholder="Category">
            </div>
            <div class="form-group">
              <label for="stock">Stock:</label>
              <input
              v-model="stock"
              type="number"
              class="form-control"
              id="stock"
              placeholder="Stock">
            </div>
            <button class="btn btn-success" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import ServerApi from '@/api/serverapi';

export default {
  data() {
    return {
      name: '',
      description: '',
      price: '',
      image_url: '',
      category: '',
      stock: '',
      file: '',
    };
  },
  methods: {
    addProduct() {
      const formData = new FormData();
      formData.append('image', this.file);
      ServerApi
        .post('/products/upload',
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        .then((uploaded) => {
          return ServerApi
            .post('/products', {
              name: this.name,
              description: this.description,
              price: this.price,
              image_url: uploaded.data,
              category: this.category,
              stock: this.stock,
            })
            .then((newProduct) => {
              this.name = '';
              this.description = '';
              this.price = '';
              this.image_url = '';
              this.category = '';
              this.stock = '';
              this.file = '';
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Data Saved',
                showConfirmButton: false,
                timer: 1500,
              });
            });
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Create new product failed',
          });
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>

<style>
</style>
