<template>
  <div id="container">
    <h3>My Cart</h3>
    <v-container>
      <v-layout>
        <v-flex>
          <v-layout
            align-center
            justify-center
            v-for="product in this.$store.state.cartCustomer"
            :key="product._id"
          >
            <v-flex xs3>
              <v-img :src="product.productId.image" aspect-ratio="4"></v-img>
            </v-flex>
            <v-flex>
              <h2>{{ product.productId.name }}</h2>
              <h3>Price : {{ product.productId.price }}</h3>
            </v-flex>
            <v-flex xs2>
              <h3>Quantity : {{ product.quantity }}</h3>
            </v-flex>
            <v-flex xs1>
              <v-icon class="mr-2" @click="remove(product._id)">delete</v-icon>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs3>
          <div id="boxResume">
            <h2>Total Harga</h2>
            <h3>Rp. {{ this.$store.state.totalPrice }}</h3>
            <v-btn color="success" to="/checkout">Checkout</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      totalPrice: null,
    };
  },
  created() {
    this.$store.dispatch('loadCartCustomer');
  },
  methods: {
    remove(id) {
      swal({
        title: 'Are you sure to delete this item?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(`http://35.198.240.251/cart/${id}`, {
              headers: {
                token: localStorage.token,
              },
            })
            .then(({ data }) => {
              this.$store.dispatch('loadCartCustomer');
              swal('Delete Cart Success', 'success');
            })
            .catch((err) => {
              console.log(err);
            });
        }
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
#right {
  display: flex;
  flex-direction: row;
  align-items: center;
}
#right1 {
  width: 80%;
}
#right2 {
  display: flex;
  align-items: center;
}
</style>
