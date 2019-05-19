<template>
  <div class="container-fluid pt-5">
    <div class="row mx-5">
      <div class="col col-md-3 d-flex flex-column">
        <ProfileCard :user="user"/>
        <b-button variant="success" class="mt-3" v-b-modal.product-form-modal>Add Product</b-button>
      </div>
      <div class="col col-md-9">
        <div class="row d-flex justify-content-center">
          <h1>My Products</h1>
        </div>
        <div class="row d-flex justify-content-center pt-5" v-if="myProduct.length < 1">
          <h3>You are not selling any product..</h3>
        </div>

        <ProductList :products="myProduct" v-if="myProduct.length >=1"/>
      </div>
    </div>
    <b-modal id="product-form-modal" hide-footer title="New Product" size="lg">
      <div>
        <b-form @submit.prevent='upload'>
          <b-form-group id="input-title-label" label="Title:" label-for="title">
            <b-form-input
              id="input-title"
              v-model="newProduct.title"
              type="text"
              required
              placeholder="Enter Title"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-textarea
              id="input-description"
              placeholder="Description..."
              v-model="newProduct.description"
              rows="3"
              max-rows="8"
            ></b-form-textarea>
          </b-form-group>
          <div class="row">
            <div class="col">
              <b-form-group label="Stock:" label-for="input-stock">
                <b-form-input type="number" id="input-stock" v-model="newProduct.stock" min='1'></b-form-input>
              </b-form-group>
            </div>
            <div class="col">
              <b-form-group label="Price:" label-for="input-price">
                <b-form-input type="number" id="input-price" v-model="newProduct.price" min='1000'></b-form-input>
              </b-form-group>
            </div>
          </div>
          <b-form-group
            label='Category: '
            label-for='category-select'
            description='Select category...'        
          >
            <b-form-select id='category-select' v-model="newProduct.category" :options="options" required></b-form-select>
          </b-form-group>
          <b-form-group label="Image:" label-for="file-input">
            <b-form-file
              id="file-input"
              v-model="file"
              :state="Boolean(file)"
              placeholder="Choose a file..."
              drop-placeholder="Drop file here..."
              required
            ></b-form-file>
            <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
          </b-form-group>
          <div class="row justify-content-center">
            <b-button variant="primary" type='submit'>Add Product!</b-button>
          </div>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "@/api/server/axios.js";
import ProfileCard from "@/components/ProfileCard.vue";
import ProductList from "@/views/ProductList.vue";
import formatNumber from "format-currency";

export default {
  name: "profile",
  data() {
    return {
      user: {},
      myProduct: [],
      file: "",
      newProduct: {
        title: "",
        description: "",
        stock: 1,
        price: 0,
        category: ""
      },
      options: [
        { value: 'technology', text: "Technology" },
        { value: "fashion", text: "Fashion" },
        { value: "toy", text: "Toy" },
        { value: 'household', text: "Household Furniture" },
        { value: 'fnb', text: "Food & Beverage" }
      ]
    };
  },
  components: {
    ProfileCard,
    ProductList
  },
  methods: {
    getMyProducts() {
      axios
        .get(`/products?sellerId=${this.user._id}`, {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.myProduct = data.map(el => {
            el.formatPrice = formatNumber(el.price).split(".")[0];
            return el;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    upload() {
      console.log("uploading");
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post("/products/upload", formData, {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          console.log("create product");
          axios
            .post(
              "/products",
              {
                title: this.newProduct.title,
                description: this.newProduct.description,
                image: data.imageUrl,
                price: this.newProduct.price,
                stock: this.newProduct.stock,
                category: this.newProduct.category
              },
              {
                headers: {
                  token: localStorage.token
                }
              }
            )
            .then(({ data }) => {
              this.getMyProducts();
              this.$bvModal.hide("product-form-modal");
              this.$swal('Success!', `${data.title} has been added`, 'success')
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (localStorage.token) {
      axios
        .get("/users/payload", {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          this.user = data;
          this.getMyProducts();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

