<template>
  <div>
    <div class="container">
      <div v-if="!isLogin" class="row">
        <div class="col-4 text-center"></div>
        <div class="py-5 px-5 col-4 text-center">
          <h3>Your Cart</h3>
          <button class="btn btncard">Continue Shopping</button>
        </div>
        <div class="col-4 text-center"></div>
      </div>
      <div v-else class="row">
        <div class="py-3 px-3 col-12">
          <h3 class="yc">Your Cart</h3>
          <table class="table table-hover">
            <tbody>
              <tr v-for="(cart, index) in cartItems" :key="index">
                <th scope="row">{{index + 1}}</th>
                <td>
                  <img style="max-width:10vh;" :src="cart.productId.image[0]">
                </td>
                <td>{{cart.productId.name}}</td>
                <td>
                  <button
                    :disabled="isMoreThanStock(cart.amount, cart.productId.stock)"
                    v-on:click="addQty(cart._id)"
                    class="btn updown"
                  >
                    <i class="fas fa-angle-up"></i>
                  </button>
                  {{cart.amount}}
                  <button
                    :disabled="isDisable(cart.amount)"
                    v-on:click="subsQty(cart._id)"
                    class="btn updown"
                  >
                    <i class="fas fa-angle-down"></i>
                  </button>
                </td>
                <td>IDR {{subtotal(cart.amount, cart.productId.price)}}</td>
                <td>
                  <small>Items will be dispatched in {{random}} days</small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- <div class="summ col-4 border text-center">
          <div style="background-color: rgb(233, 233, 233)" class="px-2 pt-2 mb-2 row">
            <p class="yc">ORDER SUMMARY</p>
          </div>
          <div class="row mb-3">
            <div class="col-6 text-left">Total Items</div>
            <div class="col-6 text-right">{{this.totalProductsInCart}}</div>
          </div>
          <div class="row mb-3">
            <div class="col-6 text-left">Estimated Sales Tax (Included)</div>
            <div class="col-6 text-right">IDR 27500</div>
          </div>
          <div class="row mb-3">
            <div class="col-6 text-left">Total Price</div>
            <div class="col-6 text-right">IDR {{getTotalCart}}</div>
          </div>
          <br>
          <br>
          <br>
          <br>
          <button class="btn atc btn-dark">Proceed To Checkout</button>
        </div>-->
      </div>
    </div>


    <div class="container">
      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="yc text-muted">Order Summary</span>
            <span class="badge badge-secondary badge-pill">{{this.totalProductsInCart}}</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Estimated Sales Tax (Included)</h6>
                <small class="text-muted">Packing and product-care</small>
              </div>
              <span class="text-muted">IDR 27,500</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Subtotal (IDR)</span>
              <strong>{{getTotalCart.toLocaleString()}}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between bg-light">
              <div class="text-success">
                <h6 class="my-0">Delivery Price</h6>
                <small style="text-transform:uppercase;">{{chosenKurir}}</small>
              </div>
              <span class="text-success">IDR {{deliverPrice.toLocaleString()}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total (IDR)</span>
              <strong>{{calcTotal(getTotalCart, deliverPrice)}}</strong>
            </li>
          </ul>
        </div>

        <!-- BAGIAN BAWAH CHECKOUT2 AN -->
        <div class="col-md-8 order-md-1">
          <h4 class="yc mb-3">Billing Details</h4>
          <form v-on:submit.prevent="proceedToCheckout" class="needs-validation" novalidate>
            <div class="row">
              <div class="col-md-12 mb-3">
                <label for="firstName">Recipient's name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="recipientName"
                  placeholder
                  value
                  required
                >
                <div class="invalid-feedback">Valid recipient's name is required.</div>
              </div>
            </div>

            <div class="mb-3">
              <label for="address">Address</label>
              <input
                type="text"
                class="form-control"
                id="address"
                v-model="address"
                placeholder="Jl. Bunga, No. 12 / Apt. Permata-03 Lt.2"
                required
              >
              <div class="invalid-feedback">Please enter your shipping address.</div>
            </div>

            <div class="row">
              <div class="col-md-4 mb-3">
                <label for="country">City (Kota)</label>
                <select
                v-on:change="pushDeliveryState('city')"
                  v-model="chosenCity"
                  v-bind:cities="cities"
                  class="custom-select d-block w-100"
                  id="country"
                  required
                >
                  <option value>Choose...</option>
                  <option
                    v-for="(city, index) in cities"
                    :value="city.id"
                    :key="index"
                  >{{city.name}}</option>
                </select>
                <div class="invalid-feedback">Please select a valid country.</div>
              </div>
              <div class="col-md-4 mb-3">
                <label for="state">Province (Provinsi)</label>
                <select
                  v-model="chosenProvince"
                  v-on:change="pushDeliveryState('prov')"
                  v-bind:provinces="provinces"
                  class="custom-select d-block w-100"
                  id="state"
                  required
                >
                  <option value>Choose...</option>
                  <option
                    v-for="(prov, index) in provinces"
                    :value="prov.id"
                    :key="index"
                  >{{prov.name}}</option>
                </select>
                <div class="invalid-feedback">Please provide a valid state.</div>
              </div>
              <div class="col-md-4 mb-3">
                <label for="state">Courier (Kurir)</label>
                <select
                  v-model="chosenKurir"
                  v-on:change="pushDeliveryState('courier')"
                  class="custom-select d-block w-100"
                  id="state"
                  required
                >
                  <option value>Choose...</option>
                  <option v-for="(kur, index) in kurir" :value="kur" :key="index">{{kur.toUpperCase()}}</option>
                </select>
                <div class="invalid-feedback">Please provide a valid state.</div>
              </div>
            </div>

            <hr class="mb-4">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="same-address">
              <label
                class="custom-control-label"
                for="same-address"
              >Shipping address is the same as my billing address</label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="save-info">
              <label
                class="custom-control-label"
                for="save-info"
              >Save this information for next time</label>
            </div>
            <hr class="mb-4">

            <h4 class="mb-3">Payment</h4>

            <div class="d-block my-3">
              <div class="custom-control custom-radio">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  class="custom-control-input"
                  checked
                  required
                >
                <label class="custom-control-label" for="credit">Credit card</label>
              </div>
              <div class="custom-control custom-radio">
                <input
                  id="debit"
                  name="paymentMethod"
                  type="radio"
                  class="custom-control-input"
                  required
                >
                <label class="custom-control-label" for="debit">Debit card</label>
              </div>
              <div class="custom-control custom-radio">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  class="custom-control-input"
                  required
                >
                <label class="custom-control-label" for="paypal">Paypal</label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="cc-name">Name on card</label>
                <input type="text" class="form-control" id="cc-name" placeholder required>
                <small class="text-muted">Full name as displayed on card</small>
                <div class="invalid-feedback">Name on card is required</div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="cc-number">Credit card number</label>
                <input type="text" class="form-control" id="cc-number" placeholder required>
                <div class="invalid-feedback">Credit card number is required</div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 mb-3">
                <label for="cc-expiration">Expiration</label>
                <input type="text" class="form-control" id="cc-expiration" placeholder required>
                <div class="invalid-feedback">Expiration date required</div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="cc-expiration">CVV</label>
                <input type="text" class="form-control" id="cc-cvv" placeholder required>
                <div class="invalid-feedback">Security code required</div>
              </div>
            </div>
            <hr class="mb-4">
            <button class="btn btncard btn-secondary btn-lg btn-block" type="submit">Continue to checkout</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isLogin"],
  name: "Carts",
  mounted() {
      window.addEventListener(
        "load",
        function() {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName("needs-validation");

          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener(
              "submit",
              function(event) {
                if (form.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                form.classList.add("was-validated");
              },
              false
            );
          });
        },
        false
      );
  },
  data() {
    return {
      cartItems: [],
      totalProductsInCart: 0,
      sumPrice: 0, //ini itu totalnya!!
      random: 0,
      cities : [],
      provinces : [],
      kurir : ['pos', 'tiki', 'jne'],
      chosenCity : '',
      chosenProvince : '',
      chosenKurir : "",
      cartItems : [],
      totalProductsInCart : "",
      deliverPrice : 0,
      recipientName : "",
      address : "",
      deliveryState : []

    };
  },
  computed: {
    getTotalCart() {
      let total = 0;
      this.cartItems.forEach(
        item => (total += item.amount * item.productId.price)
      );
      this.sumPrice = total;
      return total;
    }
  },
  watch: {
    deliveryState(ov) {
      if (this.deliveryState.length >= 3) {
        this.calculatePrice()
      }
    }
  },
  methods: {
    calcTotal(a,b) {
      return (+a + +b).toLocaleString()
    },
    pushDeliveryState(val) {
      if (this.deliverPrice.length >= 3) {
          this.deliveryState.pop()
          this.deliveryState.push(val)
        } else {
          this.deliveryState.push(val)
        }
    },
    randomhehe() {
      return Math.floor(Math.random() * 4);
    },
    subtotal(amt, prc) {
      let res = amt * prc;
      return res.toLocaleString();
    },
    isDisable(amt) {
      if (amt == 0) {
        return true;
      } else return false;
    },
    isMoreThanStock(amt, stock) {
      if (amt >= stock) {
        return true;
      } else return false;
    },
    addQty(idCart) {
      this.axios
        .patch(
          `carts/${idCart}`,
          { type: "inc" },
          { headers: { token: localStorage.getItem("token"), cartid: idCart } }
        )
        .then(({ data }) => {
          this.fetchCartData();
        })
        .catch(err => {
          this.swal.fire(
            "Something is wrong",
            "Please reload the page",
            "warning"
          );
        });
    },
    subsQty(idCart) {
      this.axios
        .patch(
          `carts/${idCart}`,
          { type: "dec" },
          { headers: { token: localStorage.getItem("token"), cartid: idCart } }
        )
        .then(({ data }) => {
          this.fetchCartData();
        })
        .catch(err => {
          console.log(err);

          this.swal.fire(
            "Something is wrong",
            "Please reload the page",
            "warning"
          );
        });
    },
    fetchCartData() {
      this.axios
        .get("/carts", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.cartItems = data;
          this.totalProductsInCart = 0;
          data.forEach(cart => {
            this.totalProductsInCart += +cart.amount;
          });
        })
        .catch(err => {
          console.log(err.response);
          this.swal.fire(
            "Something is wrong",
            "Please reload the page",
            "warning"
          );
        });
    },
    getSelectedDeliveryDetails() {
        this.axios.get(`/transactions/shipping`, 
        {headers : {'token' : localStorage.getItem('token')}})
          .then(({data}) => {
             this.category = event.target.value;
            this.cities = data.dataOngkir.city
            this.provinces = data.dataOngkir.province
            console.log(data.dataOngkir)
          })
          .catch(err => console.log(err))
      },
      async calculatePrice() {
        try {
          let {data} = await this.axios.post(`/transactions/shipping`, {
              origin : 153,
              destination : this.chosenCity,
              courier : this.chosenKurir,
              weight : this.totalProductsInCart
            }, {
              headers : {'token' : localStorage.getItem('token')}
            })
          
          this.deliverPrice = data.info[0].costs[0].cost[0].value
          
        } catch (error) {
          console.log(error);
            
        }   
      },
      proceedToCheckout() {
        this.axios.post(`/carts/checkout`, {
          recipientName : this.recipientName,
          address : this.address,
          total : this.getTotalCart + +this.deliverPrice,
          deliverPrice : this.deliverPrice
        },
        {headers : {'token' : localStorage.getItem('token')}}
        )
        .then(({data}) => {
          console.log(data, 'GIMANA ATUH');
          
        })
        .catch(error => {
          console.log(error);
          
          this.swal.fire(
            "Something is wrong",
            "Please reload the page",
            "warning"
          );
        })
      }
  },
  created() {
    this.chosenCity = ''
    this.chosenProvince = ''
    this.chosenKurir = ""
    this.deliveryState = []
    this.fetchCartData();
    this.getSelectedDeliveryDetails()
    this.random = this.randomhehe();
  },

};
</script>

<style>
.yc {
  font-size: 16.5px;
  letter-spacing: 0.1em;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Lato", serif;
}

.atc {
  border-radius: 0px;
  color: white;
  font-size: 12.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.updown {
}

.summ {
  font-family: "Lato", serif;
  font-size: 15px;
  letter-spacing: 0.11em;
}
.btncard {
  background-color: transparent;
  font-size: 12px;
  color: black;
  border-style: 1px solid rgb(233, 233, 233) !important;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.btncard:hover {
  background-color: rgb(230, 230, 230);
}
</style>
