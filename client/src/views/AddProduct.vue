<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex>
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
            <v-btn color="success" @click="addProduct">Send</v-btn>
            <v-btn to="/signin" color="red">Back</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
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
  methods: {
    reset() {
      (this.product.name = '')(this.product.price = '')(this.product.stock = '')(this.product.imageFile = '')(this.product.imageName = '')(this.product.imageUrl = '');
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

    addProduct() {
      console.log(this.product.name, this.product.price, this.product.stock);

      const data = new FormData();
      data.append('name', this.product.name);
      data.append('price', this.product.price);
      data.append('stock', this.product.stock);
      if (this.product.imageFile) {
        data.append('image', this.product.imageFile, this.product.imageName);
      }

      axios
        .post('http://localhost:3000/products', data, {
          headers: { token: localStorage.token },
        })
        .then(() => {
          console.log('ADD SUKSES');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
