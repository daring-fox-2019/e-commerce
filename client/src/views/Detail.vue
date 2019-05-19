<template>
  <div class="home">
    <v-layout>
      <v-flex id="list">
        <v-img :src="product.image" aspect-ratio="2.75"></v-img>
        <div v-if="!isEdit">
          <v-card-title primary-title class="detailProduct">
            <h1>{{product.name}}</h1>
          </v-card-title>
          <v-card-title class="detailProduct">
            <v-icon>attach_money</v-icon>&emsp;
            <h3>{{priceProduct}}</h3>
          </v-card-title>
          <v-card-title class="detailProduct">
            <v-icon>collections_bookmark</v-icon>&emsp;
            <h3>{{product.stock}}</h3>
          </v-card-title>
          <v-card-actions>
            <v-btn
              flat
              color="orange"
              @click="addCart"
              v-if="!this.$store.state.isAdmin && product.stock>0"
            >Add Cart</v-btn>
            <v-btn flat color="orange" @click="edit" v-if="this.$store.state.isAdmin">Edit</v-btn>
          </v-card-actions>
        </div>
        <div v-else id="formEdit">
          <v-flex xs5 mt-5 justify-center>
            <v-card class="elevation-12">
              <v-toolbar dark color="dark">
                <v-toolbar-title>Add Product</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="name"
                    v-model="product.name"
                    label="Product name"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    label="Select Image"
                    @click="pickFile"
                    v-model="product.imageName"
                    prepend-icon="attach_file"
                  ></v-text-field>
                  <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                  >
                  <img :src="product.imageUrl" height="150" v-if="product.imageUrl">
                  <br>
                  <v-text-field
                    prepend-icon="attach_money"
                    name="price"
                    v-model="product.price"
                    label="Price"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="collections_bookmark"
                    name="stock"
                    v-model="product.stock"
                    label="Stock"
                    type="text"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="editProduct">Send</v-btn>
                <v-btn color="red" @click="edit">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'home',
  components: {},
  data() {
    return {
      product: {},
      priceProduct: '',
      isEdit: false,
      product: {
        name: '',
        price: '',
        stock: '',
        imageName: '',
        imageUrl: '',
        imageFile: '',
      },

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    };
  },
  watch: {
    $route() {
      this.fetchData();
    },
    product(val) {
      let rupiah = '';
      const angkarev = val.price
        .toString()
        .split('')
        .reverse()
        .join('');
      for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += `${angkarev.substr(i, 3)}.`;
      this.priceProduct = `Rp. ${rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('')}`;
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get(`http://35.198.240.251/products/${this.$route.params.id}`)
        .then(({ data }) => {
          this.product = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCart() {
      if (this.product.stock > 0) {
        axios
          .post(
            'http://35.198.240.251/cart',
            { productId: this.product._id },
            { headers: { token: localStorage.token } },
          )
          .then(() => {
            swal('Add to Cart Success!', 'success');
          })
          .catch((err) => {
            swal('Add to Cart Failed!', 'warning');
            console.log(err);
          });
      }
    },
    edit() {
      this.isEdit = !this.isEdit;
    },
    reset() {
      (this.product.name = ''),
      (this.product.price = ''),
      (this.product.stock = ''),
      (this.product.imageFile = ''),
      (this.product.imageName = ''),
      (this.product.imageUrl = '');
    },

    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const { files } = e.target;
      if (files[0] !== undefined) {
        this.product.imageName = files[0].name;
        if (this.product.imageName.lastIndexOf('.') <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener('load', () => {
          this.product.imageUrl = fr.result;
          this.product.imageFile = files[0];
        });
      } else {
        this.product.imageFile = '';
        this.product.imageUrl = '';
      }
    },

    editProduct() {
      const data = new FormData();
      data.append('name', this.product.name);
      data.append('price', this.product.price);
      data.append('stock', this.product.stock);
      if (this.product.imageFile) {
        data.append('image', this.product.imageFile, this.product.imageName);
      }

      axios
        .put(`http://35.198.240.251/products/${this.product._id}`, data, {
          headers: { token: localStorage.token },
        })
        .then(() => {
          swal('Edit Product Success!', 'success');
          this.reset();
          this.fetchData();
          this.isEdit = false;
          console.log('Edit SUKSES');
        })
        .catch((err) => {
          swal('Edit Product Failed!', 'warning');
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.detailProduct {
  margin-left: 30px;
}

#list {
  padding: 10px;
  height: 100vh;
  overflow: scroll;
  margin-right: 5px;
}

#detail {
  display: fixed;
}

#formEdit {
  text-align: center;
  justify-content: center;
  align-content: center;
  display: flex;
}
</style>
