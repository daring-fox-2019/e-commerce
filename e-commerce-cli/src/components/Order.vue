<template>
  <div class="order" @contextmenu.prevent="$emit('closeorder')">
    <div>
      <b-container>
        <h6 style="text-align:center;color:red"><small> <i>use right click to close</i> </small>
        </h6>
        <h3 class="my-4"><strong>Order List</strong> </h3>
        <table style="width:100%">
          <thead>
            <tr>
              <td style="border: 1px white solid; font-size:15px; font-weight:700">Order Time</td>
              <td style="border: 1px white solid; font-size:15px; font-weight:700">Total Price</td>
              <td style="border: 1px white solid; font-size:15px; font-weight:700">Action</td>
            </tr>
          </thead>
          <tr v-for="(order,index) in orderlist" :key="index">
            <td style="border: 1px white solid; font-size:15px">{{ order.name }}</td>
            <td style="border: 1px white solid; font-size:15px">Rp
              {{ order.totalprice.toLocaleString() }}</td>
            <td style="border: 1px white solid; font-size:10px" justify-content="around">
              <button style="font-size:14px;padding:1px; margin-left:15px"
                class=" btn btn-success my-1" @click="delivered(order._id)">Confirm</button>
              <button style="font-size:14px;margin-left:11px; auto;padding:1px"
                class=" btn btn-danger my-1" @click="delivered(order._id)">Complain</button>
            </td>
          </tr>
        </table>
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
    overflow-x: hidden;
    overflow-y: auto;
    width: 40%;
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
