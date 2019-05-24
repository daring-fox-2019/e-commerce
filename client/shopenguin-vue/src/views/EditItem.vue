<template>
  <div class="add-item">
    <div class="container" style="width: 30%; padding-top: 5%;">
      <!-- <img src="../assets/default-item-picture.jpg" alt=""> -->
      <div style="display: flex; justify-content: center; align-items: flex-end;" v-if="isLoading">
        <div style="display: flex;">
          <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
          <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
          <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
        </div>
        <div>
          <img
            src="../assets/loading.gif"
            alt="Loading..."
            style="max-width: 100%; max-height: 100%; min-width: 200px; max-height: 200px; margin-left: -2rem;"
          >
        </div>
      </div>
      <div v-else>
        <b-form @submit.prevent="editItemFormSubmit">
          <b-form-group id="add-item-form-name" label="Name:" label-for="add-item-name">
            <b-form-input id="add-item-name" v-model="editItemForm.name" type="text" required></b-form-input>
          </b-form-group>

          <b-form-group id="add-item-form-price" label="Price:" label-for="add-item-price">
            <b-form-input id="add-item-price" v-model="editItemForm.price" required></b-form-input>
          </b-form-group>

          <b-form-group id="add-item-form-stock" label="Stock:" label-for="add-item-stock">
            <b-form-input id="add-item-stock" v-model="editItemForm.stock" type="text" required></b-form-input>
          </b-form-group>

          <b-form-group id="add-item-form-image" label="Image:" label-for="add-item-image">
            <b-form-file
              v-model="editItemForm.image"
              :state="Boolean(editItemForm.image)"
              placeholder="Choose a file..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <div class="mt-3">Selected file: {{ editItemForm.image ? editItemForm.image.name : '' }}</div>
          </b-form-group>
          <b-button type="submit" size="sm" block variant="success">Edit Item</b-button>
          <router-link to="/">
            <b-button size="sm" class="mt-2" block variant="outline-success">Cancel</b-button>
          </router-link>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "@/api/axios";
import Swal from "sweetalert2";

export default {
  name: "Navbar1",
  data() {
    return {
      editItemForm: {
        name: "",
        image: [],
        price: "",
        stock: ""
      },
      isLoading: false,
    };
  },
  created() {
    console.log(this.$route.params);
    this.getCurrentItem(this.$route.params.id);
    console.log(this.currentItem);
    this.editItemForm.name = this.currentItem.name;
    this.editItemForm.price = this.currentItem.price;
    this.editItemForm.stock = this.currentItem.stock;
  },
  computed: {
    ...mapState(["currentItem"]),
  },
  methods: {
    ...mapActions(["getCurrentItem"]),
    editItemFormSubmit() {
      this.isLoading = true;

      const itemData = new FormData();
      itemData.append("name", this.editItemForm.name);
      itemData.append("price", this.editItemForm.price);
      itemData.append("stock", this.editItemForm.stock);
      itemData.append("image", this.editItemForm.image);
      itemData.append("tags", this.editItemForm.tags);

      console.log(this.editItemForm.image);
      console.log(itemData);

      axios({
        method: "PUT",
        url: `/items/${this.$route.params.id}`,
        data: itemData,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log({ data });

          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "success",
            title: "Your item has been edited"
          });
          
          this.editItemForm = {
            title: "",
            content: "",
            visibility: "",
            tags: [],
            image: []
          };

          this.isLoading = false;
          this.$router.push("/");

          // this.geteditItemForms();
          // this.getAlleditItemForms();
        })
        .catch(err => {
          console.log(err.message);
          this.isLoading = false;
          // this.currentPage = "afterLoginHome";

          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    }
  }
};
</script>
