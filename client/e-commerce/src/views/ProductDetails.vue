<template>
  <div class="container pt-5">
    <div class="row content">
      <div class="col col-md-8 m-auto">
        <img :src="product.image" style="object-fit:contain; max-height:500px; max-width:100%">
      </div>
      <div class="col col-md-4 d-flex flex-column">
        <h4 class="py-4">{{ product.title }}</h4>
        <div class="pb-5">
          <p>{{ product.description }}</p>
        </div>
        <div>
          <h5>Stock: {{ product.stock }}</h5>
        </div>
        <div>
          <h5>Seller: {{ seller.name }}</h5>
        </div>
        <div class="py-4" v-show="user._id === seller._id">
          <div class="row d-flex justify-content-center">
            <h4>Owner's Options:</h4>
          </div>
          <div class="row d-flex justify-content-around pt-1">
            <b-button variant="info" @click.prevent="openModal">Edit</b-button>
            <b-button variant="danger" @click.prevent="deleteProduct">Delete</b-button>
          </div>
        </div>
        <div class="mt-auto d-flex justify-content-between">
          <h5 class="mt-2">Rp. {{ product.formatPrice }}</h5>
          <b-button size="xs" class="mb-2" variant="success" @click.prevent="addCart">
            <i class="fas fa-shopping-cart pr-2"></i>Add to Cart
          </b-button>
        </div>
      </div>
    </div>

    <!-- MODAL EDIT FORM -->
    <b-modal id="product-form-modal" hide-footer title="Edit Product" size="lg">
      <div>
        <b-form @submit.prevent="update">
          <b-form-group id="input-title-label" label="Title:" label-for="title">
            <b-form-input
              id="input-title"
              v-model="formProduct.title"
              type="text"
              required
              placeholder="Enter Title"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-textarea
              id="input-description"
              placeholder="Description..."
              v-model="formProduct.description"
              rows="3"
              max-rows="8"
            ></b-form-textarea>
          </b-form-group>
          <div class="row">
            <div class="col">
              <b-form-group label="Stock:" label-for="input-stock">
                <b-form-input type="number" id="input-stock" v-model="formProduct.stock" min="1"></b-form-input>
              </b-form-group>
            </div>
            <div class="col">
              <b-form-group label="Price:" label-for="input-price">
                <b-form-input type="number" id="input-price" v-model="formProduct.price" min="1000"></b-form-input>
              </b-form-group>
            </div>
          </div>
          <b-form-group
            label="Category: "
            label-for="category-select"
            description="Select category..."
          >
            <b-form-select
              id="category-select"
              v-model="formProduct.category"
              :options="options"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group label="Image:" label-for="file-input">
            <b-form-file
              id="file-input"
              v-model="file"
              :state="Boolean(file)"
              placeholder="Choose a file..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
          </b-form-group>
          <div class="row justify-content-center">
            <b-button variant="primary" type="submit">Save!</b-button>
          </div>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "@/api/server/axios";
import formatNumber from "format-currency";
export default {
  name: "productDetails",
  data() {
    return {
      product: {},
      seller: {},
      user: {},
      file: "",
      formProduct: {
        title: "",
        description: "",
        stock: 1,
        price: 0,
        category: ""
      },
      options: [
        { value: "technology", text: "Technology" },
        { value: "fashion", text: "Fashion" },
        { value: "toy", text: "Toy" },
        { value: "household", text: "Household Furniture" },
        { value: "fnb", text: "Food & Beverage" }
      ]
    };
  },
  methods: {
    openModal() {
      this.formProduct.title = this.product.title;
      this.formProduct.description = this.product.description;
      this.formProduct.stock = this.product.stock;
      this.formProduct.price = this.product.price;
      this.$bvModal.show("product-form-modal");
    },
    update() {
      if (!this.file) {
        axios
          .patch(
            `/products/${this.product._id}`,
            {
              title: this.formProduct.title,
              description: this.formProduct.description,
              stock: this.formProduct.stock,
              price: this.formProduct.price
            },
            {
              headers: {
                token: localStorage.token
              }
            }
          )
          .then(({ data }) => {
            this.$bvModal.hide("product-form-modal");
            this.$swal(
              "Updated!",
              `${data.title}'s data has been updated`,
              "success"
            );
            this.getProduct();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let formData = new FormData();
        formData.append("file", this.file);
        axios
          .post("/products/upload", formData, {
            headers: {
              token: localStorage.token
            }
          })
          .then(({ data }) => {
            axios
              .patch(
                `/products/${this.product._id}`,
                {
                  title: this.formProduct.title,
                  description: this.formProduct.description,
                  stock: this.formProduct.stock,
                  price: this.formProduct.price,
                  image: data.imageUrl
                },
                {
                  headers: {
                    token: localStorage.token
                  }
                }
              )
              .then(({ data }) => {
                this.$bvModal.hide("product-form-modal");
                this.$swal(
                  "Updated!",
                  `${data.title}'s data has been updated`,
                  "success"
                );
                this.getProduct();
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
    deleteProduct() {
      this.$swal({
        dangerMode: true,
        title: `Are you sure to delete ${this.product.title}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: ["Cancel", "Yes!"]
      }).then(result => {
        if (result) {
          axios
            .delete(`/products/${this.product._id}`,{
              headers: {
                token: localStorage.token
              }
            })
            .then(({ data }) => {
              this.$router.push({ path: "/" });
              this.$swal("Deleted", `${data.title} has been deleted`, "info");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
        }
      });
    },
    getUser() {
      axios
        .get("/users/payload", {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          this.user = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProduct() {
      axios
        .get(`/products/one?id=${this.$route.params.id}`)
        .then(({ data }) => {
          let obj = data;
          obj.formatPrice = formatNumber(data.price).split(".")[0];
          this.product = obj;
          axios.get(`/users/one?id=${data.sellerId}`).then(({ data }) => {
            this.seller = data;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    addCart() {
      if (!localStorage.token) {
        this.$swal('Info required', 'You have to login first!', 'info')
        this.$router.push({ path: "/login" });
      } else if (this.user._id !== this.product.sellerId) {
        axios
          .post(
            "/carts",
            {
              productId: this.product._id
            },
            {
              headers: { token: localStorage.token }
            }
          )
          .then(({ data }) => {
            this.$emit("updateCart");
            this.$router.push({ name: "cart" });
          });
      } else {
        this.$swal(
          "This is your own product",
          "You cannot add your own product to your cart!",
          "info"
        );
      }
    }
  },
  created() {
    this.getProduct();
    if (localStorage.token) {
      this.getUser();
    }
  }
};
</script>

<style scoped>
.content {
  min-height: 73vh;
}
</style>