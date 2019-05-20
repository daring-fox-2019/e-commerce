<template>
  <div>
    <div class="container">
      <h1 class="mt-1">Admin Page</h1>
      <div class="row">
        <div class="col-3">
            <h3>Navigation</h3>
          <div>
            <router-link to="/admin/create">
              <button class="mb-3 btn btn-danger">Add Product</button>
            </router-link>
          </div>
          <div>
            <router-link to="/admin/list">
              <button class="btn btn-info">List Product</button>
            </router-link>
          </div>
        </div>

        <div class="col-9">
          <router-view
            v-bind:edit="edit"
            v-on:ganti="update"
            v-on:ubah="getOneProduct"
            v-on:hapus="deleteProduct"
            v-bind:gundams="gundams"
            v-on:buat="build"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import ecommerce from "@/api/e-commerceApi";
export default {
  data() {
    return {
      image: "",
      gundams: [],
      edit: {
        id: "",
        name: "",
        price: "",
        stock: "",
        image: "",
        description: ""
      }
    };
  },
  methods: {
    build(state) {
      ecommerce.defaults.headers.common["token"] = localStorage.token;
      let formData = new FormData();

      formData.append("image", state.file);
      ecommerce
        .post("/upload", formData)
        .then(link => {
          this.image = link.data.link;
          ecommerce
            .post("/admin", {
              name: state.name,
              price: state.price,
              stock: state.stock,
              image: this.image,
              description: state.description
            })
            .then(({ data }) => {
              this.image = "";
              Swal.fire({
                title: "Create Data Success",
                text: `product: ${data.name} successfully added`,
                type: "success",
                confirmButtonText: "Cool"
              });
            })
            .catch(err => {
              Swal.fire({
                title: "Error!",
                text: `${err.response.data.message}`,
                type: "error",
                confirmButtonText: "Cool"
              });
            });
        })
        .catch(error => {
          Swal.fire({
            title: "Error!",
            text: `Incorect input`,
            type: "error",
            confirmButtonText: "Cool"
          });
        });
    },
    fetchData() {
      ecommerce
        .get("/")
        .then(({ data }) => {
          this.gundam = [];
          for (const gundam of data) {
            this.gundams.push(gundam);
          }
        })
        .catch(err => {
          Swal.fire({
            title: "Error!",
            text: `Invalid Data`,
            type: "error",
            confirmButtonText: "Cool"
          });
        });
    },
    deleteProduct(id) {
      ecommerce.defaults.headers.common["token"] = localStorage.token;
      ecommerce
        .delete(`/admin/${id}`)
        .then(({ data }) => {
         Swal.fire({
                title: "Delete Data Success",
                type: "success",
                confirmButtonText: "Cool"
              });
        })
        .catch(err => {
          Swal.fire({
            title: "Error!",
            text: `Invalid Data`,
            type: "error",
            confirmButtonText: "Cool"
          });
        });
    },
    getOneProduct(id) {
      ecommerce.defaults.headers.common["token"] = localStorage.token;
      ecommerce
        .get(`/admin/${id}`)
        .then(({ data }) => {
          console.log(data);

          (this.edit.name = data.name),
            (this.edit.price = data.price),
            (this.edit.stock = data.stock),
            (this.edit.image = data.image),
            (this.edit.description = data.description);
          this.edit.id = data._id;
        })
        .catch(err => {
          console.log(err);
        });
    },
    update(id) {
      ecommerce.defaults.headers.common["token"] = localStorage.token;
      if (this.edit.file) {
        let formData = new FormData();
        formData.append("image", this.edit.file);
        ecommerce
          .post("/upload", formData)
          .then(link => {
            this.edit.image = link.data.link;
            ecommerce
              .put(`/admin/${id}`, this.edit)
              .then(({ data }) => {
                Swal.fire({
                  title: "Update Data Success",
                  text: `product: ${data.name} successfully update`,
                  type: "success",
                  confirmButtonText: "Cool"
                });
              })
              .catch(err => {
                Swal.fire({
                  title: "Error!",
                  text: `Incorect input`,
                  type: "error",
                  confirmButtonText: "Cool"
                });
              });
          })
          .catch(err => {
            Swal.fire({
            title: "Error!",
            text: `Incorect input`,
            type: "error",
            confirmButtonText: "Cool"
          });
          });
      } else {
        ecommerce
          .put(`/admin/${id}`, this.edit)
          .then(({ data }) => {
            Swal.fire({
              title: "Update Data Success",
              text: `product: ${data.name} successfully update`,
              type: "success",
              confirmButtonText: "Cool"
            });
          })
          .catch(err => {
            Swal.fire({
            title: "Error!",
            text: `Incorect input`,
            type: "error",
            confirmButtonText: "Cool"
          });
          });
      }
    }
  },
  created() {
    this.gundams = [];
    this.fetchData();
  },
  watch: {
    $route() {
      this.gundams = [];
      this.fetchData();
    }
  }
};
</script>
