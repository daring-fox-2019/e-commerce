<template>
  <div class="cart">
    <div>
      <b-container>
        <b-row v-for="(cart,index) in cartlist.data" :key="index">
          <b-row style="width:100%; margin-bottom: 15px;margin-left:5px">
            <b-col cols="12"><strong>{{ cart.name }}</strong></b-col>
          </b-row>
          <b-row>
            <ul v-for="(product,index) in cart.products" :key="index">
              <li>
                <div>
                  <h5>Product: {{ product.item }}</h5>
                  <h5>Price: Rp {{ product.price.toLocaleString() }}</h5>
                </div>
              </li>
            </ul>
          </b-row>
          <b-col cols="12" style="margin-top:20px; margin-bottom:20px"><strong> Total price : Rp
              {{ totalbill.toLocaleString() }}</strong></b-col>
          <button style="padding: 10px;margin-left:20px; margin-bottom: 40px; margin-right:20px"
            class="btn btn-outline-success" @click="checkout">Checkout</button>
          <button style="padding: 10px;margin-bottom: 40px" class="btn btn-outline-danger"
            @click="deleteCart">Delete</button>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';
import Swal from 'sweetalert2';
import {
  mapActions,
} from 'vuex';

export default {
  name: 'Cart',
  data() {
    return {
      cartlist: {},
      totalbill: null,
    };
  },
  methods: {
    ...mapActions([
      'deleteCartTrue',
    ]),
    deleteCart() {
      Swal.fire({
        type: 'warning',
        text: 'Are you sure?',
        showCancelButton: true,
      })
        .then((result) => {
          if (result.value) {
            return axios
              .delete(`carts/delete/${localStorage.cartId}`, {
                userId: localStorage.id,
                headers: {
                  jwtoken: localStorage.jwtoken,
                },
              })
              .then((data) => {
                localStorage.removeItem('cartId');
                Swal.fire({
                  type: 'success',
                  text: 'Your cart has succesfully deleted!',
                }),
                localStorage.removeItem('cartId');
                this.onstart();
                this.$store.dispatch('deleteCartTrue');
                this.$router.push({
                  name: 'home',
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkout() {
      Swal.fire({
        title: 'Are you sure?',
        text: `
            You're about to buy these items in this cart!
            total item: ${this.cartlist.data[0].products.length} pc(s),
            total price: Rp ${this.totalbill.toLocaleString()} 
          `,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, check it out!',
      }).then((result) => {
        if (result.value) {
          return axios
            .patch(`carts/update/${localStorage.cartId}`, {
              userId: localStorage.id,
            }, {
              headers: {
                jwtoken: localStorage.jwtoken,
              },
            })
            .then((data) => {
              localStorage.removeItem('cartId');
              Swal.fire(
                'Checkout Success!',
                'You have succesfully checkout your cart. Further information will be informed via email! Thanks!',
                'success',
              );
              localStorage.removeItem('cartId');
              this.onstart();
              this.$router.push({
                name: 'home',
              });
            });
        }
      })
        .catch((err) => {
          console.log(err);
        });
    },
    onstart() {
      axios
        .get('carts', {
          userId: localStorage.id,
          headers: {
            jwtoken: localStorage.jwtoken,
          },
        })
        .then((cartInfo) => {
          if (cartInfo.data[0]) {
            localStorage.setItem('cartId', cartInfo.data[0]._id);
            this.cartlist = cartInfo;
            let bill = 0;
            for (let i = 0; i < cartInfo.data[0].products.length; i++) {
              bill += cartInfo.data[0].products[i].price;
            }
            this.totalbill = bill;
          } else {
            this.cartlist = cartInfo.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeMount() {
    this.onstart();
  },
  watch: {
    cartlist() {
      this.onstart();
    },
  },
};

</script>

<style>
  .cart {
    font-size: 18px;
    text-align: left;
    position: absolute;
    right: 0;
    background-color: rgba(32, 0, 0, 0.877);
    height: 80%;
    overflow: auto;
    width: 25%;
    border-right: 5px solid #880017;
    z-index: 10;
  }

  .listNavbar {
    color: azure;
    margin-top: 15px;
    margin-left: 15px;
  }

</style>
