<template>
  <div>
    <div class="container" v-if="isLogin">
      <div class="row">
        <div class="col-sm-12 col-md-10 col-md-offset-1">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th class="text-center">Price</th>
                <th class="text-center">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <ProductCart 
              @methodDariCart="removeItem"
              v-for="keranjang in keranjangBelanja" :keranjang="keranjang" />
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <h5>Subtotal</h5>
                </td>
                <td class="text-right">
                  <h5>
                    <strong>{{ subTotal }}</strong>
                  </h5>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <h5>Estimated shipping</h5>
                </td>
                <td class="text-right">
                  <h5>
                    <strong>Free Shipping</strong>
                  </h5>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <h3>Total</h3>
                </td>
                <td class="text-right">
                  <h3>
                    <strong>{{ convertRupiah(subTotal) }}</strong>
                  </h3>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button type="button" class="btn btn-default">
                    <router-link ><span class="glyphicon glyphicon-shopping-cart"></span> Continue Shopping</router-link>
                    
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-success">
                    Checkout
                    <span class="glyphicon glyphicon-play"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import ServerApi from '@/api/serverapi';
import ProductCart from '@/components/ProductCart.vue'
import FormatRupiah from '../helper/formatRupiah'
import { mapState } from 'vuex'

export default {
     computed : {
      ...mapState([
        'authors',
        'isLogin',
        'cart',
      ])
    },
    components: {
      ProductCart: ProductCart
    },
    data() {
      return {
        cartUser: [],
        keranjangBelanja: '',
        subTotal: 0,
      };
    },
    methods: {
      removeItem(id) {
        ServerApi
          .delete(`/carts/${id}`,{
           headers: {
              token:localStorage.getItem('token')
            }
          })
          .then((deleted)=>{
            this.keranjangBelanja = this.keranjangBelanja.filter(el =>{
              if(el._id !== deleted.data._id){
                return el
              } 
            })
            this.subTotal = 0
            this.listKeranjang()
          })
          .catch((err)=>{
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: `${err.response}`,
            });
          })
      },
      convertRupiah(input){
        FormatRupiah(input)
      },
      showCart() {
        this.cartUser = this.$store.state.cart
      },
      listKeranjang() {
        ServerApi
          .get(`/carts/${localStorage.getItem('id')}`, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((keranjang)=>{
            this.keranjangBelanja = keranjang.data
            this.keranjangBelanja.forEach(element => {
                this.subTotal += element.items[0].price
            });
          })
          .catch((err)=>{
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: `${err.response}`,
          });
          })
      },
    },
    created() {
      this.listKeranjang()
    }
}
</script>
