<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">Detail Transaction</div>
      <div class="card-body">
        <div class="row justify-content-end mx-4">
          <p
            v-if="userCart[0] && userCart[0].UserId.gender == 'male'"
          >Mr. {{userCart[0].UserId.firstName}} {{userCart[0].UserId.lastName}}</p>
          <p
            v-if="userCart[0] && userCart[0].UserId.gender == 'female'"
          >Ms. {{userCart[0].UserId.firstName}} {{userCart[0].UserId.lastName}}</p>
        </div>
        <div class="row mx-4">
          <div class="col-5">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, index) in userCart" :key="index">
                  <th scope="row">{{index + 1}}</th>
                  <td>{{product.ProductId.productName}}</td>
                  <td>$ {{product.ProductId.price}}</td>
                  <td>$ {{product.amount * product.ProductId.price}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-7">
            <div class="row mx-2">
              <div class="col-6">
                <p>Select Province :</p>
                <div class="input-group-sm mb-3">
                  <select class="custom-select" v-model="delivery.province">
                    <option
                      :value="province.province_id"
                      v-for="(province, index) in provinces"
                      :key="index"
                    >{{province.province}}</option>
                  </select>
                </div>
              </div>
              <div class="col-6">
                <p>Select City :</p>
                <div class="input-group-sm mb-3">
                  <select class="custom-select" v-model="delivery.city">
                    <option
                      :value="city.city_id"
                      v-for="(city, index) in cities"
                      :key="index"
                    >{{city.city_name}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row mx-2">
              <div class="col-6">
                <p>Select Courier :</p>
                <div class="input-group-sm mb-3">
                  <select class="custom-select" v-model="delivery.courier" v-on:change="getTotal">
                    <option
                      :value="courier"
                      v-for="(courier, index) in couriers"
                      :key="index"
                    >{{courier}}</option>
                  </select>
                </div>
              </div>
              <div class="col-6">
                <h6 class="py-2">Estimated Delivery Price :</h6>
                <div class>
                  <input
                    v-model="cost"
                    class="form-control form-control-sm ml-2"
                    disabled
                    type="text"
                    :placeholder="cost"
                  >
                </div>
              </div>
            </div>
            <div class="row mx-4">
              <p>Address :</p>
            </div>
            <div class="row mx-2">
              <div class="col-12">
                <input
                  v-model="delivery.address"
                  class="form-control form-control-sm ml-2"
                  type="text"
                  placeholder="input address"
                >
              </div>
            </div>
            <div class="row mx-5 mt-4 justify-content-center">
              <h5 class="mx-3" v-if="userCart[0]">Total</h5>
              <h5 class="mx-3" v-if="userCart[0]">$ {{total}}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-4 justify-content-center">
      <a @click.prevent="checkoutTransaction" type="button" class="btn btn-light btn-lg">Checkout</a>
      <a @click.prevent="cancelTransaction" type="button" class="btn mx-4 cancel btn-light btn-lg">Cancel</a>
    </div>
  </div>
</template>

<script>
import rajaOngkir from "../api/rajaOngkir.js";
import axios from "../api/localhost";
import "dotenv";

export default {
  name: "CartPreview",
  props: ["userCart"],
  data() {
    return {
      provinces: [],
      cities: [],
      couriers: ["jne", "pos", "tiki"],
      delivery: {
        province: "",
        city: "",
        courier: "",
        weight: "",
        address: ""
      },
      cost: "",
      totalCost: ""
    };
  },
  computed: {
    total() {
      let result = 0;
      this.userCart.forEach(el => {
        result += el.ProductId.price * el.amount;
      });
      this.totalCost = result + +this.cost;
      return result + +this.cost;
    }
  },
  methods: {
    weight() {
      let result = 0;
      this.userCart.forEach(el => {
        result += el.amount;
      });

      this.delivery.weight = result * 100
    },
    fetchCarts() {
      this.$emit("fetch-cart");
    },
    getTotal() {
      axios
        .post(
          `/carts/rajaongkir/cost`,
          {
            origin: 153,
            destination: this.delivery.city,
            weight: this.delivery.weight,
            courier: this.delivery.courier
          },
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(({ data }) => {
          this.cost = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkoutTransaction() {
      axios
        .post(
          `/transactions`,
          {
            userId: localStorage.getItem("id"),
            carts: this.userCart,
            address: this.delivery.address,
            total: this.totalCost,
            deliverPrice: this.cost
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          console.log(data);
          this.$swal(data.msg);
          this.$router.push('/home')
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelTransaction() {
      axios
        .patch(`carts/${this.$route.params.id}`,{
          headers : { token : localStorage.getItem('token')}
        })
        .then(({ data })=> {
          console.log(data);
          this.$swal(data.msg)
          this.$router.push('/home')
        })
        .catch((err)=> {
          console.log(err);
        })
    }
  },
  mounted() {
    this.fetchCarts();
  },
  watch: {
    provinces() {
      this.weight()
    }
  },
  created() {
  
    axios
      .get("/carts/rajaongkir/province", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        console.log(data);
        this.provinces = data;
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`/carts/rajaongkir/city`, {
        headers: { token: localStorage.getItem("token") }
      })
      .then(({ data }) => {
        console.log(data);
        this.cities = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.btn {
  background: none;
  font-weight: 400;
  transition: 0.3s;
  border: black 2px solid;
  letter-spacing: -0.2px;
}
.btn:hover {
  background: #083232;
  color: white !important ;
  border: black 1px solid;
}

.cancel {
  background-color: white
}

.cancel:hover {
  background-color: #e41749
}
</style>
