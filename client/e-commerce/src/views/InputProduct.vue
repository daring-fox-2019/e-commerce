<template>
  <div class="container p-5" style="margin-top:100px">
    <div class="pb-4">
      <h1>Add <b> Product </b> Here ... </h1>
    </div>

    <div class="row">

      <div class="col-lg-6 col-sm-12 border p-5">
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
      <div class="col-lg-6 col-sm-12 px-5">
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
            <label for="price-product">Weight : <span style="color:grey"> <i>input on gram </i></span></label>
            <b-input v-model="product.weight" id="weight-product" class="p-2"></b-input>
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
          <b-button variant="success" block type="submit" v-if="!editFlag"> submit product</b-button>
          <b-button variant="success" block type="button" v-if="editFlag" @click.prevent="editProduct"> edit product</b-button>
        </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import axios from '@/database/axios';

export default {
  components: {
    VueTagsInput,
  },
  data() {
    return {
      userId: '',
      file: null,
      product: {
        name: null,
        description: null,
        price: 0,
        stock: 0,
        image: null,
        tags: [],
        weight: null,
      },
      tag: '',
      editFlag: false,

    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.getProductData();
      this.editFlag = true;
    }
  },
  methods: {
    reset() {
      this.file = null;
    },
    clearProduct() {
      this.product = {
        name: null,
        description: null,
        price: 0,
        stock: 0,
        image: null,
        tags: [],
      };
    },
    getProductData() {
      const { id } = this.$route.params;

      axios.get(`/products/${id}`, { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          this.product = data;
        })
        .catch((err) => {
          this.$swal(':(', `${err.response.data.message}`, 'error');
        });
    },
    editProduct() {
      const { id } = this.$route.params;
      axios.patch(`/products/${id}`,
        this.product,
        { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          this.$store.commit('updateProduct', data);
          this.$swal('Success', 'Edit Product Success', 'success');
        })
        .catch((err) => {
          this.$swal('Oopps...', `${err.response.data.message}`, 'error');
        });
    },
    submitProduct() {
      axios.post('/products',
        this.product,
        { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          this.$swal('Success', 'Add Product Success', 'success');
          this.clearProduct();
        })
        .catch((err) => {
          this.$swal('Oopps...', `${err.response.data.message}`, 'error');
        });
    },
    uploadPhoto() {
      if (this.file) {
        const formData = new FormData();
        formData.append('file', this.file);

        axios.post('/upload',
          formData, { headers: { token: localStorage.getItem('token') } }).then(({ data }) => {
          this.reset();
          this.product.image = data.url;
          this.product.tags = data.labels;
        })
          .catch((err) => {
            this.$swal('Oopps...', `${err.response.data.message}`, 'error');
          });
      } else {
        this.$swal('Oopps...', 'select photo first', 'error');
      }
    },
  },
};
</script>
