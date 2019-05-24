<template>
  <div style="width:100%">
    <b-row style="height: 270px;overflow:hidden;" class="p-3">
      <b-col style="background-color:lightgrey;overflow:hidden;" class="px-0">
        <img
          src="https://www.growtoretire.com/wp-content/themes/nucleare-pro/images/no-image-box.png"
          alt
          v-if="!product.image"
          style="width:inherit;background-size:cover"
        >
        <img :src="product.image" alt="test" style="width:inherit;" v-else>
      </b-col>
    </b-row>
    <!-- next row -->
    <b-row>
      <b-col>
        <div class="input-group mb-3 mt-3">
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="upload-picture"
              @change="uploadPicture"
            >
            <label class="custom-file-label" for="upload-picture">Choose file</label>
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- form -->
    <b-row class="pt-1">
      <b-col>
        <b-form style="width:100%;">
          <b-form-group id="input-group-4" label="Product Name:" label-for="product-name">
            <b-form-input
              type="text"
              id="product-name"
              v-model="product.name"
              required placeholder="Input Product Name"></b-form-input>
            <!-- <b-form-invalid-feedback :state="validation">
              Your user ID must be 5-12 characters long.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation">
              Looks Good.
            </b-form-valid-feedback>-->
          </b-form-group>

          <b-form-group id="input-group-4" label="Available stock:" label-for="stock">
            <b-form-input type="number"
              min="1" id="stock"
              required
              v-model="product.stock"
              placeholder="Input Subtitle"></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Price:" label-for="price">
            <b-form-input
              type="number"
              min="1"
              id="price"
              required
              v-model="product.price"
              placeholder="Input Item Price"></b-form-input>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button variant="outline-success" @click="submitProductData" :disabled="noPicture" >Register Item</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import server from '@/api/server';

export default {
  name: 'add-item-form',
  data() {
    return {
      product: {
        name: '',
        image: '',
        price: '',
        stock: '',
      },
      noPicture: true,
    };
  },
  methods: {
    uploadPicture(event) {
      this.product.image = 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif';
      this.file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', this.file);

      server
        .post('/images', formData, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          this.product.image = data.image;
          this.noPicture = false;
          console.log(data);
          console.log('update image successfull');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitProductData() {
      const product_obj = {
        name: this.product.name,
        stock: this.product.stock,
        price: this.product.price,
        image: this.product.image,
      };

      this.$store.dispatch('submitProductData', product_obj);
    },
  },
};
</script>

<style>
</style>
