<template>
  <b-container fluid>
    <br><br>
    <form  @submit.prevent="editProduct">
      <b-row class="my-3">
        <b-col sm="3" lg="4">
        </b-col>
        <b-col sm="2" lg="1" class="label">
          <label for="input-none">Product Name :</label>
        </b-col>
        <b-col sm="4" lg="3">
          <b-form-input id="nameReg" v-model="item" :state="null"
            placeholder="your product name here..">
          </b-form-input>
        </b-col>
        <b-col sm="3" lg="4">
        </b-col>
      </b-row>

      <b-row class="my-3">
        <b-col sm="3" lg="4">
        </b-col>
        <b-col class="label" sm="2" lg="1">
          <label for="input-valid">Price :</label>
        </b-col>
        <b-col sm="4" lg="3">
          <b-form-input id="emailReg" v-model="price" placeholder="item's price here">
          </b-form-input>
        </b-col>
        <b-col sm="3" lg="4">
        </b-col>
      </b-row>

      <b-row class="my-3">
        <b-col sm="3" lg="4">
        </b-col>
        <b-col class="label" sm="2" lg="1">
          <label for="input-valid">Stock :</label>
        </b-col>
        <b-col sm="4" lg="3">
          <b-form-input id="passwordReg" v-model="stock" placeholder="stock of this item..">
          </b-form-input>
        </b-col>
        <b-col sm="3" lg="4">
        </b-col>
      </b-row>

      <b-row class="my-3">
        <b-col sm="3" lg="4">
        </b-col>
        <b-col class="label" sm="2" lg="1">
          <label for="input-valid">Description :</label>
        </b-col>
        <b-col sm="4" lg="3">
          <b-form-input id="addressReg" v-model="description"
            placeholder="item's description here..">
          </b-form-input>
        </b-col>
        <b-col sm="3" lg="4">
        </b-col>
      </b-row>

      <b-row class="my-3">
        <b-col sm="3" lg="4">
        </b-col>
        <b-col class="label" sm="2" lg="1">
          <label for="input-valid">Photo :</label>
        </b-col>
        <b-col sm="3" lg="2">
          <b-form-file id="ppReg" v-model="img" accept=".jpg, .png, .gif"></b-form-file>
        </b-col>
        <b-col sm="3" lg="4">
        </b-col>
      </b-row>

      <b-row class="my-5">
        <button class="btn btn-dark" type="submit" id="addProduct-btn">Edit Product</button>
      </b-row>
    </form>
  </b-container>
</template>

<style>
  .label {
    text-align: left;
    color: black;
  }

  #addProduct-btn {
    position: absolute;
    left: 48%
  }

</style>

<script>
import axios from '@/api/axios';
import Swal from 'sweetalert2';


export default {
  name: 'updateproduct',
  props: ['infoupdate'],
  data() {
    return {
      item: this.infoupdate.item,
      price: this.infoupdate.price,
      stock: this.infoupdate.stock,
      img: this.infoupdate.img,
      description: this.infoupdate.description,
    };
  },
  methods: {
    editProduct() {
      if (this.img && this.img.name) {
        const file = this.img;
        const extension = file.name.split('.')[1];
        const validExtensions = ['png', 'jpg', 'jpeg'];
        if (validExtensions.indexOf(extension) === -1) {
          Swal.fire({
            type: 'error',
            text: 'Valid extensions: .png, .jpeg, or .jpg',
          });
        } else {
          getBase64(file)
            .then(image => axios
              .put(`products/${this.infoupdate._id}`, {
                item: this.item,
                price: this.price,
                stock: this.stock,
                description: this.description,
                owner: localStorage.id,
                img: image,
                extension,
              }, {
                headers: {
                  jwtoken: localStorage.jwtoken,
                },
              })
              .then((data) => {
                Swal.fire({
                  type: 'success',
                  text: 'Your product has successfully added',
                });
                this.$router.push({
                  path: '/',
                });
              }))
            .catch((err) => {
              console.log(err);
              Swal.fire({
                type: 'error',
                title: 'Error!',
                text: `${err.message}, please check your input!`,
              });
            });
        }
      } else {
        axios
          .put(`products/${this.infoupdate._id}`, {
            item: this.item,
            price: this.price,
            stock: this.stock,
            description: this.description,
            owner: localStorage.id,
          }, {
            headers: {
              jwtoken: localStorage.jwtoken,
            },
          })
          .then((data) => {
            Swal.fire({
              type: 'success',
              text: 'Your product has successfully added',
            });
            this.$router.push({
              path: '/',
            });
          })
          .catch((err) => {
            Swal.fire({
              type: 'error',
              title: 'Error!',
              text: `${err.message}, please check your input!`,
            });
          });
      }
    },
  },
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = error => reject(error);
  });
}

</script>
