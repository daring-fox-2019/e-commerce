<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col col-sm-9">
        <table class="table">
          <thead>
            <th>Product(s)</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr v-for="product in myCart" :key="product._id">
              <td>
                <div class="row">
                  <div class="col col-sm-3" style="max-height: 100px; max-width: 100px;">
                    <img
                      :src="product.productId.image"
                      alt
                      style="object-fit: contain; max-height: 100%; max-width: 100%; min-height:100%; min-height:100%"
                    >
                  </div>
                  <div class="col col-sm-9">
                    <h6 class="pt-3">{{ product.productId.title }}</h6>
                  </div>
                </div>
              </td>
              <td>Rp. {{ product.productId.formatPrice }}</td>
              <td>
                <div v-if="editing !== product._id" class="d-flex justify-content-around">
                  <h5 class="pt-1">{{ product.quantity }}</h5>
                  <b-button
                    size="sm"
                    variant="light"
                    class="mb-3"
                    @click.prevent="update(product._id,product.quantity)"
                  >
                    <i class="fas fa-plus px-1"></i>
                    <i class="fas fa-minus px-1"></i>
                  </b-button>
                </div>
                <b-form
                  @submit.prevent="updateQty"
                  style="width: 70px"
                  v-show="editing === product._id"
                >
                  <b-form-input
                    type="number"
                    v-model="valueUpdate"
                    :max="product.productId.stock"
                    min="1"
                  ></b-form-input>
                </b-form>
              </td>
              <td>Rp. {{ product.subTotal}}</td>
              <td>
                <b-button
                  variant="danger"
                  size="sm"
                  @click.prevent="deleteCart(product._id, product.productId.title)"
                >Remove</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col col-sm-3">
        <b-card title="Summary">
          <div class="container-fluid d-flex flex-column" style="min-height: 300px">
            <div class="d-flex flex-column mt-auto">
              <p>Total: Rp. {{ total }}</p>
              <b-button variant="success" class="mb-3" @click.prevent='checkOut'>Checkout</b-button>
              <b-button variant="warning" @click.prevent="toHome">Continue Shopping</b-button>
            </div>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/server/axios.js";
import formatNumber from "format-currency";
export default {
  name: "cart",
  data() {
    return {
      myCart: [],
      valueUpdate: "",
      editing: "",
      total: 0
    };
  },
  methods: {
    checkOut(){
      if(this.myCart.length > 0){
        this.$swal({
          dangerMode: true,
          title: `Rp. ${this.total}`,
          text: "Are you sure do you want to checkout?",
          icon: "warning",
          buttons: ["Cancel", "Yes!"]
        })
        .then(result=>{
          if (result){
            axios
              .delete(`/carts/checkout`,{
                headers: {
                  token: localStorage.token
                }
              })
              .then(({ data })=>{
                this.$emit("updateCart");
                this.$swal('Success purchase!', 'The seller(s) has been notified to ship your purchase!', 'success')
                this.$router.push({path: '/'})
              })
              .catch(err=>{
                console.log(err)
              })
          }else{

          }
        })
      }else{
        this.$swal('Empty cart', 'Your cart is empty!', 'info')
      }
    },
    deleteCart(id, title) {
      this.$swal({
        dangerMode: true,
        title: `Are you sure to remove ${title}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: ["Cancel", "Yes!"]
      }).then(result => {
        if (result) {
          axios
            .delete(`/carts?id=${id}`, {
              headers: {
                token: localStorage.token
              }
            })
            .then(({ data }) => {
              this.$emit("updateCart");
              this.getMyCart();
            });
        } else {
        }
      });
    },
    toHome() {
      this.$router.push({ path: "/" });
    },
    getMyCart() {
      axios
        .get("/carts/owned", {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          this.myCart = data.map(el => {
            // el.qty = el.quantity;
            el.productId.formatPrice = formatNumber(el.productId.price).split(
              "."
            )[0];
            el.subTotal = formatNumber(el.quantity * el.productId.price).split(
              "."
            )[0];
            return el;
          });
          let total = 0;
          this.myCart.forEach(element => {
            total += element.quantity * element.productId.price;
          });
          this.total = formatNumber(total).split(".")[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateQty() {
      axios
        .patch(
          "/carts/qty/",
          { id: this.editing, qty: this.valueUpdate },
          {
            headers: { token: localStorage.token }
          }
        )
        .then(({ data }) => {
          this.getMyCart();
          this.$emit("updateCart");
          this.editing = "";
          this.valueUpdate = "";
        });
    },
    update(id, qty) {
      this.valueUpdate = qty;
      this.editing = id;
    }
  },
  created() {
    this.getMyCart();
  }
};
</script>
