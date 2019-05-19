<template>
  <form @submit.prevent="addProduct" enctype="multipart/form-data" class="col-6 mx-auto">
    <button @click="logout" type="button" class="btn btn-danger">Logout</button>
    <div class="form-group">
      <label for="formGroupExampleInput">Name</label>
      <input
      v-model="name"
        type="text"
        class="form-control"
        id="formGroupExampleInput"
        placeholder="Example input"
        required
      >
    </div>
    <div class="form-group row">
        <label for="exampleFormControlFile1">Image File</label>
        <input @change="selectFile" type="file" class="form-control-file" id="exampleFormControlFile1" required>
        <img v-show="imagePreview" :src="imagePreview" style="height:300px;width:300px;" alt="Preview Image">
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">Price</label>
      <input
      v-model="price"
        type="number"
        min="1000"
        max="1000000"
        class="form-control"
        id="formGroupExampleInput2"
        placeholder="Another input"
        required
      >
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">Stock</label>
      <input
      v-model="stock"
        type="number"
        min="1"
        max="100"
        class="form-control"
        id="formGroupExampleInput2"
        placeholder="Another input"
        required
      >
    </div>
    <button type="submit" class="btn btn-primary">Add Product</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      image_url: '',
      price: 1000,
      stock: 1,
      imagePreview: '',
    };
  },
  methods: {
    addProduct() {
      const produk = new FormData();
      produk.append('name', this.name);
      produk.append('image_url', this.image_url);
      produk.append('price', this.price);
      produk.append('stock', this.stock);
      console.log(produk);

      this.$store.dispatch('addProduct', produk);
    },
    selectFile(event) {
      if (event.target.files[0]/* event.target.files &&  */) {
        this.image_url = event.target.files[0];
        const ini = this;
        const reader = new FileReader();
        reader.onload = function (e) {
          ini.imagePreview = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    },
    logout() {
      this.$store.commit('logout');
    },
  },
};
</script>
