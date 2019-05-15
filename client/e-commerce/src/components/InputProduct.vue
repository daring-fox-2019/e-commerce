<template>
  <div class="container p-5">
    <div class="row">
      <div class="col border p-5">
        <div class="row">
          <div style="background-color:#f1f1f1;width:100%;height:400px; overflow:hidden">
            <img :src="product.image" width="100%" height="auto">
          </div>
        </div>
        <div class="row my-3">
          <b-form block style="width:100%">
            <b-form-file v-model="file" ref="file-input" class="mb-2" style="width:100%"></b-form-file>
            <div class="row mt-3">

              <div class="col" v-if="file != null">
                <b-button
                  variant="success"
                  style="width:100%"
                  type="button"
                  @click.prevent="uploadPhoto"
                >upload photo</b-button>
              </div>

              <div class="col" v-if="file != null">
                <b-button
                  variant="outline-secondary"
                  style="width:100%"
                  type="button"
                  @click="reset"
                >reset</b-button>
              </div>

            </div>
          </b-form>
        </div>
      </div>
      <div class="col px-5">
        <b-form @submit.prevent="submitProduct">
          <div class="p-2">
            <label for="name-product">Product Name :</label>
            <b-input v-model="product.name" id="name-product"></b-input>
          </div>

          <div class="p-2">
            <label for="description-product">Product Description</label>
            <b-input v-model="product.description" id="description-product" class="p-2"></b-input>
          </div>

          <div class="p-2">
            <label for="stock-product">Stock</label>
            <b-input v-model="product.stock" id="stock-product" class="p-2"></b-input>
          </div>

          <div class="p-2">
            <label for="price-product">Price</label>
            <b-input v-model="product.price" id="price-product" class="p-2"></b-input>
          </div>

          <div class="p-2">
              <label for="price-product">Tags</label>
            <vue-tags-input v-model="tag" :tags="product.tags" @tags-changed="newTags => product.tags = newTags"/>
          </div>
        
        <div class="p-2 mt-1">
          <b-button variant="success" block type="submit"> submit product</b-button>
        </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import axios from '@/database/axios'

export default {
  components: {
    VueTagsInput
  },
  data() {
    return {
      userId: "",
      file: null,
      product: {
        name: null,
        description: null,
        price: 0,
        stock: 0,
        image: null,
        tags: [],
      },
      tag: '',
      
    };
  },
  methods: {
    reset() {
      this.file = null;
    },
    clearProduct(){
       this.product = {
        name: null,
        description: null,
        price: 0,
        stock: 0,
        image: null,
        tags: [],
      }
    },
    submitProduct(){
      axios.post('/products',
          { name : this.product.name,
            description : this.product.description,
            price : this.product.price,
            stock : this.product.stock,
            image : this.product.image,
            tags : this.product.tags
          },
          { headers : { token: localStorage.getItem('token')}
        })
      .then( ({ data }) => {
        this.$swal('Success', 'Add Product Success', 'success')
        this.clearProduct()
      })
      .catch( err => {
        this.$swal('Oopps...', `${err.response.data.message}`, 'error')
      })
    },
    uploadPhoto(){
      if(this.file){
        let formData = new FormData()
        formData.append('file', this.file);

        axios.post(`/upload`,
          formData, { headers :{token : localStorage.getItem('token')}}
        ).then(({data}) =>  {
          this.reset()
          this.product.image = data
        })
        .catch( err =>  {
          this.$swal('Oopps...', `${err.response.data.message}`, 'error')
        });

      } else {
        this.$swal('Oopps...', 'input photo first', 'error')
      }
    }
  }
};
</script>
