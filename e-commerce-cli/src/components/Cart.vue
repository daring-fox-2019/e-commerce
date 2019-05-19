<template>
  <div @contextmenu.prevent="$emit('closecart')" class="cart">
    <div>
      <b-container style="border-bottom: 1px solid white">
        <h6 style="text-align:center; color:red"><small> <i>use right click to close</i> </small>
        </h6>
        <h3 class="my-4"><strong>My Cart</strong> </h3>
        <b-row v-for="(cart,index) in cartlist.data" :key="index">
          <b-row style="width:100%; margin-left:5px">
            <b-col cols="12"><strong>{{ cart.name }}</strong></b-col>
          </b-row>
          <b-container class="my-3">
            <table style="width:100%">
              <thead>
                <tr>
                  <td style="border: 1px white solid; font-size:15px; font-weight:700">Product</td>
                  <td style="border: 1px white solid; font-size:15px; font-weight:700">qty</td>
                  <td style="border: 1px white solid; font-size:15px; font-weight:700">Unit Price
                  </td>
                </tr>
              </thead>
              <h1 v-show="false">{{ products = cart.products }}</h1>
              <tr v-for="(product,index) in getUniqueItems" :key="index">
                <td style="border: 1px white solid; font-size:15px">{{ product.item }}</td>
                <td style="border: 1px white solid; font-size:15px">
                  {{ productAmount(cart.products,product._id) }} </td>
                <td style="border: 1px white solid; font-size:15px">Rp
                  {{ product.price.toLocaleString() }}</td>
              </tr>
            </table>
          </b-container>
          <b-col cols="12" style="margin-top:0px; margin-bottom:20px; font-size:16px"><strong> Total
              price : Rp
              {{ totalbill.toLocaleString() }}</strong></b-col>
          <button style="padding: 10px;margin-left:20px; margin-bottom: 20px; margin-right:20px"
            class="btn btn-outline-success" @click="checkout">Checkout</button>
          <button style="padding: 10px;margin-bottom: 20px" class="btn btn-outline-danger"
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
        products: {}
      };
    },
    computed: {
      getUniqueItems() {
        let productz = this.products.map(el => el._id)
        let unique = productz.filter(this.onlyUnique)
        let index = []
        for (let i = 0; i < unique.length; i++) {
          index.push(productz.indexOf(unique[i]))
        }
        // let producty = productz.filter(el => el == productId)
        let output = []
        for (let i = 0; i < index.length; i++) {
          output.push(this.products[index[i]])
        }
        console.log(output)
        return output
      },
    },
    methods: {
      ...mapActions([
        'deleteCartTrue',
      ]),
      productAmount(products, productId) {
        let productz = products.map(el => el._id)
        let producty = productz.filter(el => el == productId)
        return producty.length
      },
      onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      },
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
    overflow-x: hidden;
    overflow-y: auto;
    width: 25%;
    max-width: 300px;
    border-right: 5px solid #880017;
    z-index: 10;
  }

  .listNavbar {
    color: azure;
    margin-top: 15px;
    margin-left: 15px;
  }

</style>
