<template>
  <div class="add-item">
    <div class="container" style="width: 30%;">
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
        <b-form @submit.prevent="addItemFormSubmit">
          <b-form-group id="add-item-form-name" label="Name:" label-for="add-item-name">
            <b-form-input id="add-item-name" v-model="addItemForm.name" type="text" required></b-form-input>
          </b-form-group>

          <b-form-group id="add-item-form-price" label="Price:" label-for="add-item-price">
            <b-form-input id="add-item-price" v-model="addItemForm.price" required></b-form-input>
          </b-form-group>

          <b-form-group id="add-item-form-stock" label="Stock:" label-for="add-item-stock">
            <b-form-input id="add-item-stock" v-model="addItemForm.stock" type="text" required></b-form-input>
          </b-form-group>

          <b-form-group id="add-item-form-image" label="Image:" label-for="add-item-image">
            <b-form-file
              v-model="addItemForm.image"
              :state="Boolean(addItemForm.image)"
              placeholder="Choose a file..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <div class="mt-3">Selected file: {{ addItemForm.image ? addItemForm.image.name : '' }}</div>
          </b-form-group>
          <b-button type="submit" size="sm" block variant="primary">Add Item</b-button>
          <router-link to="/">
            <b-button size="sm" class="mt-2" block variant="outline-primary">Cancel</b-button>
          </router-link>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios";
import Swal from "sweetalert2";

export default {
  name: "Navbar1",
  data() {
    return {
      addItemForm: {
        name: "",
        image: [],
        price: "",
        stock: ""
      },
      isLoading: false
    };
  },
  methods: {
    addItemFormSubmit() {
      this.isLoading = true;

      const itemData = new FormData();
      itemData.append("name", this.addItemForm.name);
      itemData.append("price", this.addItemForm.price);
      itemData.append("stock", this.addItemForm.stock);
      itemData.append("image", this.addItemForm.image);
      itemData.append("tags", this.addItemForm.tags);

      console.log(this.addItemForm.image);
      console.log(itemData);

      axios({
        method: "POST",
        url: `/items`,
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
            title: "Your item has been added"
          });
          
          this.addItemForm = {
            title: "",
            content: "",
            visibility: "",
            tags: [],
            image: []
          };

          this.isLoading = false;
          this.$router.push("/");

          // this.getaddItemForms();
          // this.getAlladdItemForms();
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
            title: "Invalid input"
          });
        });
    }
    // addItemFormSubmit(evt) {
    //   evt.preventDefault();

    //   const itemData = this.addItemForm;

    //   axios({
    //     method: "POST",
    //     url: `/add-item`,
    //     data: userData
    //   })
    //     .then(({ data }) => {
    //       console.log(data);

    //       this.addItemForm.email = "";
    //       this.addItemForm.price = "";
    //       this.addItemForm.stock = "";
    //       this.$router.push("/");
    //       localStorage.userId = data.id;
    //       localStorage.token = data.token;
    //       localStorage.email = data.email;
    //       localStorage.price = data.price;
    //       localStorage.displayPicture = data.displayPicture;

    //       const Toast = Swal.mixin({
    //         toast: true,
    //         position: "top",
    //         showConfirmButton: false,
    //         timer: 3000
    //       });

    //       Toast.fire({
    //         type: "success",
    //         title: "add-item successful"
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);

    //       this.addItemForm.email = "";
    //       this.addItemForm.price = "";
    //       this.addItemForm.stock = "";

    //       const Toast = Swal.mixin({
    //         toast: true,
    //         position: "top",
    //         showConfirmButton: false,
    //         timer: 3000
    //       });

    //       Toast.fire({
    //         type: "error",
    //         title: "Email has been used already"
    //       });
    //     });
    // }
  }
};
</script>
