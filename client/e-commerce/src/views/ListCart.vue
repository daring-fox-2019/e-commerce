<template>
  <div class="animated fadeIn">
    <div>
      <b-modal ref="my-modal" hide-footer title="Payment">
        <div class="d-block text-center">
          <h3>Finish Your Payment</h3>
        </div>
        <div>
          <b-form-group label="Total payment:" label-for="total" description>
            <b-form-input
              id="total"
              type="text"
              required
              placeholder
              v-model="totalPayment"
              disabled
            ></b-form-input>

            <div class="mt-2">
              <b-form-group label="select courier :" label-for="courier">
                <b-form-select id="courier" v-model="courier" :options="optionsCourier" required></b-form-select>
              </b-form-group>
            </div>

            <div v-if="courier">
              <b-form-group label="select service:" label-for="service">
                <b-form-select id="service" v-model="service" :options="optionsService" required></b-form-select>
              </b-form-group>
            </div>
          </b-form-group>
        </div>
        <div v-if="item.product_id && courier && shippingDetails">
          <p>
            Shipping_cost : {{ displayCostShipping }}
            <br>
            Deliver From : {{ item.product_id.seller_id.address.detail }},
            {{ shippingDetails.rajaongkir.origin_details.city_name }},
            {{ shippingDetails.rajaongkir.origin_details.province }}
            <br>
            Deliver To : {{ item.user_id.address.detail }},
            {{ shippingDetails.rajaongkir.destination_details.city_name }},
            {{ shippingDetails.rajaongkir.destination_details.province }}
          </p>
        </div>
        <b-button v-if="service != 0" variant="success" block @click="payItem(item._id)">Pay</b-button>
        <b-button class="mt-2" variant="outline-secondary" block @click.prevent="hideModal">Close Me</b-button>
      </b-modal>
    </div>

    <div class="transaction-detail container" id="cart" style="margin-top:100px">
      <h2 class="p-2">
        Your C<b>art</b>
        <span v-if="cartList.length == 0">Is<b>Empty</b></span>
      </h2>

      <div v-if="!isBusy && cartList.length != 0" class="text-center text-success my-5">
        <b-spinner class="align-middle"></b-spinner>
      </div>

      <table class="table mt-4" v-if="isBusy" style="text-align:center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Total</th>
            <th scope="col">Seller</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in cartList" :key="i">
            <th scope="row">{{ i+1 }}</th>
            <td>{{ item.product_id.name }}</td>
            <td> Rp. {{ new Intl.NumberFormat({ style: "currency" }).format(item.product_id.price)}}</td>
            <td>{{ item.qty }}</td>
            <td>Rp. {{ new Intl.NumberFormat({ style: "currency" }).format(item.product_id.price * item.qty)}}</td>
            <td>{{ item.product_id.seller_id.name }}</td>
            <td>
              <b-button
                size="sm"
                variant="success"
                style="width:100%"
                @click.prevent="showModal(item)"
              >pay</b-button>
            </td>
            <td>
              <b-button
                size="sm"
                variant="outline-secondary"
                style="width:100%"
                @click.prevent="deleteCart(item._id)"
              >
                <i class="far fa-trash-alt"></i>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import axios from "@/database/axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      item: {
        _id: null
      },
      isBusy: false,
      courier: null,
      optionsCourier: ["jne", "pos", "tiki"],
      optionsService: [],
      service: 0,
      shippingDetails: null
    };
  },
  computed: {
    displayCostShipping() {
      return (
        "Rp." +
        new Intl.NumberFormat({ style: "currency" }).format(this.service)
      );
    },
    totalPayment() {
      if (this.item.product_id) {
        return (
          "Rp." +
          new Intl.NumberFormat({ style: "currency" }).format(
            this.item.product_id.price * this.item.qty + this.service
          )
        );
      }
    },
    ...mapState(["cartList"])
  },
  mounted() {
    this.$store.dispatch("getCartData");
  },
  watch: {
    courier(val) {
      if (val) {
        this.service = 0;
        this.getShippingCost();
      }
    },
    cartList(val) {
      if (val.length != 0) {
        this.toggleBusy();
      }
    }
  },
  methods: {
    getShippingCost() {
      axios
        .get("/shipping/cost", {
          params: {
            origin: this.item.product_id.seller_id.address.city,
            destination: this.item.user_id.address.city,
            weight: this.item.weight || 1000,
            courier: this.courier
          }
        })
        .then(({ data }) => {
          this.optionsService = data.service;
          this.shippingDetails = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    showModal(item) {
      this.item = item;
      this.$refs["my-modal"].show();
    },
    emptyVal() {
      this.courier = null;
      (this.optionsService = []),
        (this.service = 0),
        (this.shippingDetails = null);
    },
    hideModal() {
      this.emptyVal();
      this.$refs["my-modal"].hide();
    },
    deleteCart(id) {
      axios
        .delete(`/carts/${id}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.$store.commit("DeleteCart", data._id);
          this.toggleBusy();
        })
        .catch(err => {
          this.$swal(":(", `${err.response.message.data}`, "error");
        });
    },
    payItem(item) {
      let service = null;
      this.optionsService.map((el, i) => {
        if (el.value == this.service) {
          service = i;
        }
      });

      let newQty = this.item.product_id.stock - this.item.qty;

      axios
        .patch(
          `/products/${this.item.product_id._id}`,
          { stock: newQty },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.$store.commit("updateProduct", data);
          this.item.product_id.stock = newQty;
          this.deleteCart(this.item._id);

          return axios.post(
            "/transactions",
            {
              product_id: this.item.product_id._id,
              seller_id: this.item.product_id.seller_id,
              status: "pay",
              qty: this.item.qty,
              shipping: {
                courier: this.courier,
                cost: this.service,
                service: this.optionsService[service]
              },
              resi: null,
              total: this.item.product_id.price * this.item.qty + this.service
            },
            { headers: { token: localStorage.getItem("token") } }
          );
        })
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
          this.$swal(":(", `${err.response.data.message}`, "info");
        });
    },
    toggleBusy() {
      this.isBusy = !this.isBusy;
    }
  }
};
</script>

