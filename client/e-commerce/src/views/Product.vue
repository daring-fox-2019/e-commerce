<template>
  <div>
    <div>
      <div v-if="isAdmin === true">
       <h3></h3>
        <b-row class="row">
          <b-col class="col-3" style="margin: 50px;">
            <h3>Add Product</h3>
            <div class="form-group">
              <label for="productname">Product Name</label>
              <input
                type="text"
                class="form-control"
                id="productname"
                placeholder="Enter name"
              ><br>
            </div>
            <div class="form-group">
              <label for="addproductimage">Add Product Image</label>
              <input type="file"
              class="form-control"
              @change="previewFile"
              id="addproductimage"><br>
            </div>
            <div class="form-group">
              <label for="productprice">Product Price</label>
              <input
                type="text"
                class="form-control"
                id="productprice"
                placeholder="Enter price"
              ><br>
            </div>
            <div class="form-group">
              <label for="productstock">Product Stock</label>
              <input
                type="number"
                class="form-control"
                id="productstock"
              ><br>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                id="description"
                placeholder="product description"
              ></textarea><br>
            </div>
            <div class="form-group">
              <button type="button" @click="newProduct" class="btn btn-outline-secondary btn-sm btn-block">Upload</button>
            </div>
          </b-col>
        <div class="col-6" style="margin: 50px 0px 50px 50px;">
          <h3>All products</h3>
          <listitems :isAdmin="isAdmin" :items="items"/>
        </div>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import listitems from '@/components/listitems'
export default {
  name: 'Product',
  props: ['isLogin', 'userId'],
  data: function () {
    return {
      isAdmin: false,
      items: [],
      product: {
        name: "",
        image: null,
        price: null,
        stock: null
      }
    }
  },
  mounted () {
    this.$axios({
      method: "get",
      url: "http://localhost:3000/products",
      headers: {
        id: localStorage.getItem('_id'),
        token: localStorage.getItem('token')
      }
    })
    .then(({data})=>{
      this.items = data
    })
    .catch(({response})=>{
      this.$swal(response.status, response.data.message, "error")
    })
    let id = localStorage.getItem('user')
    if(id === '5ce158d52edb972b1e4dc5c4'){
      this.isAdmin = true
    }
  },
  components: {
    listitems
  },
  methods: {
    newProduct(){
      console.log("input produk")
    },
    previewFile(e){
      this.product.image = e.target.files[0]
    }
  }
}
</script>
