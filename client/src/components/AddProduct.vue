<template>
  <form>
    <div class="form-group">
      <label for>Product Name</label>
      <input
        v-model="name"
        type="text"
        class="form-control form-control-danger"
        placeholder="Product Name"
      >
    </div>
    <div class="row">
      <div class="col-6 form-group">
        <label for>Stock</label>
        <input
          v-model="stock"
          type="Number"
          min="0"
          class="form-control form-control-danger"
          placeholder="Stock"
        >
      </div>
      <div class="form-group col-6">
        <label for>Price</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">IDR</span>
          </div>
          <input v-model="price" type="text" class="form-control" aria-label="Price">
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for>Category</label>
      <select
        v-bind:categoryList="categoryList"
        @change="getChosenCategory(this)"
        v-model="category"
        class="form-control"
      >
        <option v-for="cat in categoryList" :value="cat._id" :key="cat._id">{{cat.name}}</option>
      </select>
    </div>

    <label for>Image</label>

    <div class="custom-file">
      <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
      <input
        v-on:change="getImage"
        type="file"
        class="mb-4 custom-file-input"
        id="inputGroupFile04"
        aria-describedby="inputGroupFileAddon04"
      >
    </div>

    <br>
    <label for="comment">Description</label>
    <textarea v-model="description" class="form-control" rows="3" id="description"></textarea>

    <div v-if="$route.params.id == undefined">
      <button @click.prevent="addProduct" type="submit" class="mt-4 adminbtn btn">Submit</button>
    </div>
    <div v-else>
      <button
        @click.prevent="editProduct($route.params.id)"
        type="submit"
        class="mt-4 adminbtn btn"
      >Edit</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "AddProd",
  components: {},
  props: ["categoryList", "currentProduct"],
  data() {
    return {
      name: "",
      stock: "",
      price: "",
      description: "",
      image: "",
      category: "",
    };
  },
  watch: {
    currentProduct() {
      if (this.$route.params.id != undefined) {
        this.name = this.currentProduct.name;
        this.stock = this.currentProduct.stock;
        this.price = this.currentProduct.price;
        this.description = this.currentProduct.description;
        this.category = this.currentProduct.category;
        this.image = this.currentProduct.image;
      }
    }
  },
  methods: {

    editProduct(id) {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("stock", this.stock);
      formData.append("price", this.price);
      formData.append("category", this.category);
      formData.append("image", this.image);

      this.axios
        .patch(`/products/${id}`, formData, {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          this.name = "";
          this.stock = "";
          this.price = "";
          this.description = "";
          this.category = "";

          this.swal.fire(
            "Product updated",
            "View it on your dashboard",
            "success"
          );

          this.$emit("successeditproduct");
        })
        .catch(err => {
          this.swal.fire(`Something is wrong`, "Please reload", "error");
        });
    },
    getChosenCategory(opt) {
      this.category = event.target.value;
    },
    getImage() {
      this.image = event.target.files[0];
      console.log(this.image, "apakah imagenya???");
    },
    addProduct() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("image", this.image);
      formData.append("stock", this.stock);
      formData.append("price", this.price);
      formData.append("category", this.category);

      console.log("apakah formdata", formData);

      this.axios
        .post(`/products`, formData, {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          let { data } = response;
          this.swal.fire(
            "Product added",
            "View it on your dashboard",
            "success"
          );
          this.name = "";
          this.stock = "";
          this.price = "";
          this.description = "";
          this.image = "";
          this.category = "";
          this.$emit("successaddproduct", this.name);
        })
        .catch(function(err, textStatus) {
          this.swal.fire(`Something is wrong`, "Please reload", "error");
        });
    }
  },
  created() {}
};
</script>

<style>
.btnremove .admin-left {
  border-right: 1px solid grey;
}

.btncard {
  background-color: transparent;
  font-size: 12px;
  color: black;
  border-style: 1px solid rgb(233, 233, 233) !important;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.btncard:hover {
  background-color: rgb(230, 230, 230);
}

.adminbtn {
  margin: 2px;
  display: inline-block;
  width: 130px;
  background-color: grey;
  font-size: 12px;
  color: white;
  border-style: 1px solid grey !important;
  border-radius: 22px;
}

.adminbtn:hover {
  opacity: 0.6;
}

#my-strictly-unique-vue-upload-multiple-image {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
