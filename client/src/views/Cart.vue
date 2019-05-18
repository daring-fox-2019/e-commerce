<template>
  <div id="container">
    <h3>My Cart</h3>
    <b-row class="list" v-for="product in products" :key="product._id">
      <b-col></b-col>
      <b-col cols="8">
        <b-row id="card">
          <b-col id="left">
            <!-- {{ product.image }} -->
            <b-img :src="product.productId.image" style="width:100px; height:100px;"></b-img>
          </b-col>
          <b-col cols="6" id="center">
            <h3>{{ product.productId.name }}</h3>
            <h6>Rp. {{ product.productId.price }}</h6>
          </b-col>
          <b-col id="right">
            <h4>Quantity :  {{ product.quantity }}</h4>
          </b-col>
          <b-col id="right" >
            <div id="right1">
              <h3>Total</h3>
              <h6>Rp.{{ product.productId.price*product.quantity }}</h6>
            </div>
            <div id="right2">
              <i class="fas fa-trash-alt" @click="remove(product._id)"></i>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col></b-col>
    </b-row>
    <div id="resume">
      <!-- <div style="border: 1px solid black; width: 150px;"> -->
      <div id="boxResume">
        <h4>Total Harga</h4>
        <h5>Rp. {{ this.totalPrice }}</h5>
        <b-button size="sm" class="my-2 my-sm-0" variant="success">Checkout</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      totalPrice: null,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      console.log(localStorage.token);
      axios
        .get('http://localhost:3000/cart', {
          headers: {
            auth: localStorage.token,
          },
        })
        .then(({ data }) => {
          this.products = data;
          console.log(data);
          data.forEach((element) => {
            console.log(element);
            this.totalPrice += Number(element.productId.price) * Number(element.quantity);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    remove(id) {
      axios
        .delete(`http://localhost:3000/cart/${id}`, {
          headers: {
            auth: localStorage.token,
          },
        })
        .then(({ data }) => {
          this.loadData();
          swal('Delete Cart Success', '', 'success');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>


<style scoped>
#resume {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
#boxResume {
  padding: 20px;
  border: 1px solid black;
  width: 300px;
}
#container {
  padding: 20px;
}
#card {
  padding: 10px;
  display: flex;
  flex-direction: row;
  border-inline-end: 3px;
}
#center {
  text-align: left;
}
#row {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  right: 0;
  padding: 10px;
  margin-left: 10px;
  justify-items: center;
}
#card:hover {
  box-shadow: 1px 1px 1px 1px;
}
#right{
  display: flex;
  flex-direction: row;
  align-items: center

}
#right1{
  width: 80%;
}
#right2{
  display: flex;
  align-items: center
}
</style>
