<template>
  <div class="order">
    <div>
      <b-container>
        <b-row v-for="(order,index) in orderlist" :key="index">
          <b-row style="width:100%; margin-bottom: 15px;margin-left:5px">
            <b-col cols="12"><strong>{{ order.name }}</strong></b-col>
          </b-row>
          <b-col cols="12" style="margin-bottom:20px"><strong> Total price : Rp
              {{ order.totalprice.toLocaleString() }} </strong></b-col>
          <button style="padding: 10px;margin-left:20px; margin-bottom: 40px; margin-right:20px"
            class="btn btn-outline-success" @click="delivered(order._id)">Ordered items has
            arrive!</button>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';
import Swal from 'sweetalert2';

export default {
  name: 'Order',
  data() {
    return {
      orderlist: {},
      totalbill: null,
    };
  },
  methods: {
    onstart() {
      axios
        .get('carts/delivery', {
          userId: localStorage.id,
          headers: {
            jwtoken: localStorage.jwtoken,
          },
        })
        .then((orderInfo) => {
          this.orderlist = orderInfo.data;
          this.orderlist.map((el) => {
            let totalprice = 0;
            for (let i = 0; i < el.products.length; i++) {
              totalprice += el.products[i].price;
            }
            el.totalprice = totalprice;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delivered(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are going to confirm that your order has been arrive.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, confirm!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          axios
            .patch(`carts/delivery/${id}`, {

            }, {
              headers: {
                jwtoken: localStorage.jwtoken,
              },
            })
            .then(({
              data,
            }) => {
              console.log(data);
              this.onstart();
              Swal.fire(
                'Thank You!',
                'Thanks for using Jualeun!',
                'success',
              );
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
  created() {
    this.onstart();
  },
  watch: {
    orderlist() {
      this.onstart();
    },
  },
};

</script>

<style>
  .order {
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
