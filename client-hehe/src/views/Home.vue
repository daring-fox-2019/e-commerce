<template>
  <div class="container-fluid">
    <Categories/>
    <!-- <Carousel style="margin-bottom: 75px;"/> -->
    <div class="row d-flex justify-content-around">
      <div class="col-3" v-for="(product, index) in allProducts" :key="index">
        <Products v-bind:product="product" class="zoom" style="padding: 0px">
          <div v-if="currentUser.role === 'customer'">
            <button class="btn btn-warning" @click="showProduct(product._id)">See product</button>
          </div>

          <div v-if="currentUser.role === 'admin'" class="d-flex justify-content-around">
            <button
              type="button"
              class="btn btn-warning"
              data-toggle="modal"
              data-target="#editProductForm"
              data-whatever="@mdo"
              @click="editProduct(product._id)"
            >
              <h6 style="margin: 0;">Edit product</h6>
            </button>
            <button class="btn btn-danger" @click="deleteProduct(product._id)">Delete Product</button>
          </div>
        </Products>
        <br>
        <br>
      </div>
    </div>

    <div
      class="modal fade"
      id="editProductForm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label class="col-form-label">Name:</label>
                <input v-model="editedProduct.name" type="text" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="col-form-label">Description:</label>
                <textarea v-model="editedProduct.description" class="form-control"></textarea>
              </div>
              <div class="form-group">
                <label class="col-form-label">Image:</label>
                <input type="file" v-on:change="uploadImage" required>
              </div>
              <div class="form-group">
                <label class="col-form-label">Price:</label>
                <input v-model="editedProduct.price" type="number" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="col-form-label">Stock:</label>
                <input v-model="editedProduct.stock" type="number" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="col-form-label">Category:</label>
                <select v-model="editedProduct.category" required>
                  <option>Ships</option>
                  <option>Helmets</option>
                  <option>Suits</option>
                  <option>Gloves</option>
                  <option>Boots</option>
                </select>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button
                  @click="confirmEdit"
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                >Confirm edit product</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Products from '@/components/Products.vue';
import Carousel from '@/components/Carousel.vue';
import Categories from '@/components/Categories.vue';
import myServer from '@/api/myServer';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      products: null,
      editedProduct: {
        _id: '',
        name: '',
        description: '',
        image: '',
        price: '',
        stock: '',
        category: '',
      },
    };
  },
  computed: {
    ...mapState(['allProducts', 'currentUser']),
  },
  created() {
    if (!localStorage.token) this.$router.push('/login');
    this.$store.dispatch('getAllProducts');
  },
  methods: {
    uploadImage(event) {
      this.editedProduct.image = event.target.files[0];
    },
    getProduct(id) {
      myServer
        .get(`/${id}`)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    editProduct(id) {
      this.editedProduct._id = id;
      myServer
        .get(`/product/${id}`)
        .then(({ data }) => {
          this.editedProduct.name = data.name;
          this.editedProduct.description = data.description;
          this.editedProduct.image = data.image;
          this.editedProduct.price = data.price;
          this.editedProduct.stock = data.stock;
          this.editedProduct.category = data.category;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    confirmEdit() {
      this.$router.push('/loading');
      const formData = new FormData();
      formData.append('name', this.editedProduct.name);
      formData.append('description', this.editedProduct.description);
      formData.append('image', this.editedProduct.image);
      formData.append('price', this.editedProduct.price);
      formData.append('stock', this.editedProduct.stock);
      formData.append('category', this.editedProduct.category);
      this.$store.dispatch('confirmEdit', [this.editedProduct._id, formData]);
    },
    deleteProduct(id) {
      this.$store.dispatch('deleteProduct', id);
    },
  },
  components: {
    Products,
    Carousel,
    Categories,
  },
};
</script>

<style>
.zoom {
  padding: 50px;
  transition: transform 0.2s;
  margin: 0 auto;
}

.zoom:hover {
  transform: scale(1.1);
}
</style>
