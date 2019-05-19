<template>
  <div class="container my-2">
    <h5 v-if="$route.name == 'addProduct'">Add Product</h5>
    <h5 v-if="$route.name == 'editProduct'">Edit Product</h5>
    <form>
      <div class="form-group">
        <label for="productName">Product Name</label>
        <input type="text" class="form-control" id="productName" v-model="productName">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea type="text" class="form-control" id="description" v-model="description"></textarea>
      </div>
      <div class="row">
        <div class="form-group col-6">
          <label for="Price">Price</label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">$</span>
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Amount (to the nearest dollar)"
              v-model="price"
            >
          </div>
        </div>
        <div class="form-group col-6">
          <label for="stock">Stock</label>
          <input type="text" class="form-control" id="inputStock" v-model="stock">
        </div>
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <input type="text" class="form-control" id="category" v-model="category">
      </div>
      <div class="input-group">
        <div class="custom-file">
          <input
            type="file"
            class="custom-file-input"
            id="inputGroupFile04"
            aria-describedby="inputGroupFileAddon04"
            v-on:change="getImage"
          >
          <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
        </div>
      </div>
      <button v-if="$route.name == 'addProduct'" @click.prevent="addProduct" type="submit" class="btn btn-success mt-4">Submit</button>
      <button v-else-if="$route.name == 'editProduct'" @click.prevent="editProduct" type="submit" class="btn btn-success mt-4">Submit</button>
      <button
        v-if="$route.name == 'editProduct'"
        @click.prevent="addProduct"
        type="submit"
        class="btn btn-danger mx-3 mt-4"
      >Delete</button>
    </form>
  </div>
</template>

<script>
import axios from "../api/localhost.js";

export default {
  name: "FormProduct",
  data() {
    return {
      productName: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      category: ""
    };
  },
  methods: {
    getImage(event) {
      let formData = new FormData();
      this.image = event.target.files[0];
      formData.append("image", this.image);
    },

    addProduct() {
      let formData = new FormData();

      formData.append("productName", this.productName);
      formData.append("description", this.description);
      formData.append("price", this.price);
      formData.append("stock", this.stock);
      formData.append("image", this.image);
      formData.append("category", this.category);

      axios
        .post(`/products`, formData, {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.$swal("New Product Added!");
          this.clearState();
        })
        .catch(err => {
          console.log(err);
        });
    },
    editProduct() {

      let formData = new FormData();
      formData.append("productName", this.productName);
      formData.append("description", this.description);
      formData.append("price", this.price);
      formData.append("stock", this.stock);
      formData.append("image", this.image);
      formData.append("category", this.category);

      axios
          .patch(`/products/${this.$route.params.id}`, formData, {headers : { token : localStorage.getItem('token')}})
          .then(({ data }) => {
            this.$swal('Update Complete')
            console.log(data);
          })
          .catch((err)=> {
            console.log(err);
          })
    },
    clearState() {
        this.productName = "",
        this.description = "",
        this.price = 0,
        this.stock = 0,
        this.image = "",
        this.category = ""
    },
    getData() {
      axios
        .get(`products/${this.$route.params.id}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          console.log(data, " data");

          let {
            productName,
            description,
            price,
            stock,
            image,
            category
          } = data;
            this.productName = productName,
            this.description = description,
            this.price = price,
            this.stock = stock,
            this.image = image,
            this.category = category.name;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getData();
    } else {
      this.clearState();
    }
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        axios
          .get(`products/${this.$route.params.id}`, {
            headers: { token: localStorage.getItem("token") }
          })
          .then(({ data }) => {
            console.log(data, " data");

            let {
              productName,
              description,
              price,
              stock,
              image,
              category
            } = data;
            (this.productName = productName),
              (this.description = description),
              (this.price = price),
              (this.stock = stock),
              (this.image = image),
              (this.category = category.name);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.clearState();
      }
    }
  }
};
</script>

<style scoped>
h5 {
  font-size: 40px;
}
</style>
