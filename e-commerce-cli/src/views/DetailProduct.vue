<template>
  <div
    style="z-index:9;background-color:rgba(0,0,0,0.5); position: fixed; height:200%; width:200%; margin-top:-50%; margin-left:-30%;">
    <b-container id='containerDetail'>
      <b-row>
        <b-col style="margin-top:10px; font-size:20px"> <strong>ITEM'S DETAIL</strong> </b-col>
      </b-row><br>
      <b-row>
        <img :src="info.img" style="max-width:70%; max-height:70%; margin: auto">
      </b-row><br>
      <b-container>
        <table class="table table-hover" style="text-align:left">
          <tbody>
            <tr>
              <td>Product Name</td>
              <td>{{ info.item }}</td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>{{ info.stock }}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>Rp {{ info.price.toLocaleString() }}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td> {{ info.description }} </td>
            </tr>
          </tbody>
        </table>
      </b-container>
      <br><br>
      <b-row>
        <button v-if="info.owner == id || info.stock <= 0"
          style="padding: 10px;margin-left:20px; margin-bottom: 40px; margin-right:20px"
          class="btn btn-outline-success" disabled>Add to Cart</button>
        <button v-else-if="info.owner != id"
          style="padding: 20px;margin-left:20px; margin-bottom: 40px; margin-right:20px"
          class="btn btn-outline-success a" @click="addtoCart">Add to Cart</button>
        <button style="padding: 10px;margin-bottom: 40px" class="btn btn-outline-danger"
          v-on:click="closedetail">Close</button>
        <button v-if="info.owner == id"
          style="padding: 10px;margin-left:20px; margin-bottom: 40px; margin-right:20px"
          class="btn btn-outline-danger" @click="deleteProduct">Delete Item</button>
        <router-link to="/updateproduct">
          <button v-if="info.owner == id" @click="update"
            style="padding: 10px;margin-left:20px; margin-bottom: 40px; margin-right:20px"
            class="btn btn-outline-warning">Update Item</button>
        </router-link>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import Swal from 'sweetalert2';
  import axios from '@/api/axios';

  export default {
    name: 'detailproduct',
    props: ['info'],
    data() {
      return {
        id: localStorage.id,
      };
    },
    methods: {
      closedetail() {
        this.$router.go(-1);
      },
      update() {
        this.$emit('updateproduct', this.info);
      },
      deleteProduct() {
        Swal.fire({
            type: 'warning',
            text: 'Are you sure you want to delete this product?',
            showCancelButton: true,
          })
          .then((result) => {
            if (result.value) {
              axios
                .delete(`products/${this.info._id}`, {
                  userId: localStorage.id,
                  headers: {
                    jwtoken: localStorage.jwtoken,
                  },
                })
                .then((result) => {
                  Swal.fire({
                    type: 'success',
                    text: 'Product has been deleted!',
                  });
                  this.$emit('updateStockItem');
                  this.$router.push({
                    name: 'home',
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
      },
      addtoCart() {
        Swal.fire({
            title: 'How many do you want?',
            type: 'question',
            text: `Stock: ${this.info.stock}`,
            input: 'range',
            inputAttributes: {
              min: 1,
              max: this.info.stock,
              step: 1
            },
            inputValue: 1
          })
          // Swal.fire({
          //     type: 'warning',
          //     text: 'Are you sure you want to add this item into your cart?',
          //     showCancelButton: true,
          //   })
          .then((result) => {
            if (result.value) {
              console.log(result.value)
              if (!localStorage.cartId) {
                axios
                  .post('carts/add', {
                    name: new Date(),
                    owner: this.id,
                  }, {
                    headers: {
                      jwtoken: localStorage.jwtoken,
                    },
                  })
                  .then((cartCreated) => {
                    localStorage.setItem('cartId', cartCreated.data._id);
                    return axios
                      .put(`carts/update/${localStorage.cartId}`, {
                        userId: localStorage.id,
                        productId: this.info._id,
                        amount: result.value
                      }, {
                        headers: {
                          jwtoken: localStorage.jwtoken,
                        },
                      })
                      .then((updateInfo) => {
                        return axios
                          .patch(`products/${this.info._id}`, {
                            stock: this.info.stock,
                            userId: localStorage.id,
                            amount: result.value,
                          }, {
                            headers: {
                              jwtoken: localStorage.jwtoken,
                            },
                          })
                          .then((updatedProduct) => {
                            Swal.fire({
                              type: 'success',
                              text: 'new Item has been added into cart!',
                            });
                            this.$emit('updateStockItem');
                            this.$router.push({
                              name: 'home',
                            });
                          });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  });
              } else {
                return axios
                  .put(`carts/update/${localStorage.cartId}`, {
                    userId: localStorage.id,
                    productId: this.info._id,
                    amount: result.value,
                  }, {
                    headers: {
                      jwtoken: localStorage.jwtoken,
                    },
                  })
                  .then((updateInfo) => {
                    console.log(updateInfo);
                    return axios
                      .patch(`products/${this.info._id}`, {
                        stock: this.info.stock,
                        userId: localStorage.id,
                        amount: result.value,
                      }, {
                        headers: {
                          jwtoken: localStorage.jwtoken,
                        },
                      })
                      .then((updatedProduct) => {
                        Swal.fire({
                          type: 'success',
                          text: 'new Item has been added into cart!',
                        });
                        this.$emit('updateStockItem');
                        this.$router.push({
                          name: 'home',
                        });
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
          });
      },
    },
  };

</script>

<style>
  #containerDetail {
    background-color: rgba(255, 255, 255);
    border-radius: 5px;
    height: 70%;
    overflow: auto;
    /* max-width: 600px; */
    width: 40%;
    position: fixed;
    left: 30%;
    bottom: 15%;
    z-index: 100;
  }

</style>
