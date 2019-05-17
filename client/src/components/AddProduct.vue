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

    <div class="input-group mb-3">
    <input v-on:change="getImage" class="" type="file" multiple />
      <!-- <div class="custom-file">
        <input v-on:change="getImage" type="file" class="custom-file-input" id="inputGroupFile01">
        <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
      </div> -->
    </div>

    <label for="comment">Description</label>
    <textarea v-model="description" class="form-control" rows="3" id="description"></textarea>

    <div v-if="$route.params.id == undefined">
      <button @click.prevent="addProduct" type="submit" class="mt-4 adminbtn btn">Submit</button>
    </div>
    <div v-else>
      <button @click.prevent="editProduct($route.params.id)" type="submit" class="mt-4 adminbtn btn">Edit</button>
    </div>

    

  </form>
</template>

<script>
export default {
  name: "AddProd",
  components : {
      
  },
  props: ["categoryList", "currentProduct"],
  data() {
    return {
      name: "",
      stock: "",
      price: "",
      description: "",
      image: "",
      category: "",
      images : []
    };
  },
  watch: {
    currentProduct() {
        if (this.$route.params.id != undefined) {
            this.name = this.currentProduct.name
            this.stock = this.currentProduct.stock
            this.price = this.currentProduct.price
            this.description = this.currentProduct.description
            this.category = this.currentProduct.category
            this.image = this.currentProduct.image
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
      formData.append("image", this.image);
      formData.append("category", this.category);

      this.axios
      .patch(`/products/${id}`, formData, {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data"
          }
        })
      .then(({data}) => {
          
          this.name = "";
          this.stock = "";
          this.price = "";
          this.description = "";
          this.image = "";
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
      })
    },
    getChosenCategory(opt) {
      this.category = event.target.value;
    },
    getImage() {
        for (let i = 0; i < event.target.files.length; i++) {
            this.images.push(event.target.files[i])
        }
    //   this.image = event.target.files[0];
      console.log(this.images, "apakah imagenya???");
    },
    addProduct() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("stock", this.stock);
      formData.append("price", this.price);
      formData.append("category", this.category);

      for (let i = 0; i < this.images.length; i++) {
          formData.append("image", this.images[i]) 
          console.log('aaaaaaaa');
          console.log(formData);
          
      }

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
          this.images = [];
          this.category = "";
          this.$emit("successaddproduct");
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
.admin-left {
  border-right: 1px solid grey;
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
}
 
h1, h2 {
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
