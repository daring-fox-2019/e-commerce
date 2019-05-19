<template>
  <v-card>
    <v-container>
      <v-card-title>
        <h1 class="display-1">Post a product</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="upload" v-model="productForm.valid">
          <v-text-field
            color="teal"
            v-model="productForm.name"
            :rules="productForm.nameRules"
            label="Name of Product"
            required
          ></v-text-field>
          <v-textarea
            v-model="productForm.description"
            rows="3"
            name="description"
            label="Description"
          ></v-textarea>
          <v-text-field
            color="teal"
            v-model="productForm.price"
            :rules="productForm.priceRules"
            label="Enter Price"
            prefix="Rp"
            required
          ></v-text-field>
          <v-text-field
            color="teal"
            v-model="productForm.stock"
            :rules="productForm.stockRules"
            label="Enter Stock"
            suffix="piece(s)"
            required
          ></v-text-field>
          <v-layout justify-space-between row>
            <v-btn flat color="teal" class="white--text" @click.native="openFileDialog">
              Attach
            </v-btn>
            <input type="file" id="file-upload" style="display:none" @change="onFileChange">
            <v-btn type="submit" color="teal" class="white--text">Upload</v-btn>
          </v-layout>
          {{ productForm.image ? productForm.image.name : '' }}
        </v-form>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'productForm',
  data() {
    return {
      productForm: {
        valid: false,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
        ],
        description: '',
        price: 0,
        priceRules: [
          v => !!v || 'Enter Price (ex: 6000000)',
        ],
        stock: 0,
        stockRules: [
          v => !!v || 'Enter Stock (ex: 100)',
        ],
        image: null,
      },
    };
  },
  methods: {
    resetForm() {
      this.productForm.name = '';
      this.productForm.description = '';
      this.productForm.price = 0;
      this.productForm.stock = 0;
      this.productForm.image = null;
    },
    login() {
      const { email, password } = this.loginForm;
      this.$store.dispatch('login', { email, password });
      this.$emit('close');
      this.resetForm();
    },
    openFileDialog() {
      document.getElementById('file-upload').click();
    },
    onFileChange(e) {
      // eslint-disable-next-line
      this.productForm.image = e.target.files[0];
    },
    upload() {
      // eslint-disable-next-line
      const { name, description, price, stock, image } = this.productForm;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('image', image);
      this.resetForm();
      this.$store.dispatch('upload', formData);
      this.$emit('close');
    },
  },
};
</script>
