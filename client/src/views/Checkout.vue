<template>
  <div>
    <h1>Checkout</h1>
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
          </v-layout>
        </v-flex>

        <v-flex xs3>
          <h2>Shipping Address</h2>
          <!-- Province -->
          <v-combobox
            :items="province"
            v-model="selectedProvince"
            item-text="province"
            label="Select Province"
            single-line
            return-object
          ></v-combobox>

          <!-- City -->
          <v-combobox
            :items="city"
            v-model="selectedCity"
            item-text="city_name"
            label="Select City"
            single-line
            return-object
          ></v-combobox>
        </v-flex>
      </v-layout>

      <v-layout align-center justify-center class="border">
        <v-flex xs4 class="border">
          <h2>Purchase Details</h2>
          <table>
            <tbody>
              <tr>
                <td width="100px;" class="text-xs-left">Total Price</td>
                <td width="100px;" class="text-xs-right">Rp. {{this.totalPrice}}</td>
              </tr>
              <tr>
                <td class="text-xs-left">Total Shipping Fee</td>
                <td class="text-xs-right">Rp. {{this.cost}}</td>
              </tr>
              <tr>
                <td class="text-xs-left">
                  <b>Grand Total</b>
                </td>
                <td class="text-xs-right">
                  <b>Rp. {{ this.grandTotal }}</b>
                </td>
              </tr>
            </tbody>
          </table>
          <v-btn color="success" @click="buyin">Buy</v-btn>
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
      products: this.$store.state.cartCustomer,
      totalPrice: this.$store.state.totalPrice,
      province: [],
      selectedProvince: null,
      city: [],
      selectedCity: null,
      cost: 0,
      estimasi: '',
      grandTotal: this.$store.state.totalPrice,
    };
  },
  created() {
    axios
      .get('http://localhost:3000/rajaongkir/province')
      .then(({ data }) => {
        this.province = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {
    selectedProvince(val) {
      axios
        .post('http://localhost:3000/rajaongkir/city', {
          idProvince: val.province_id,
        })
        .then(({ data }) => {
          this.city = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectedCity(val) {
      axios
        .post('http://localhost:3000/rajaongkir/cost', {
          idCity: val.city_id,
        })
        .then(({ data }) => {
          this.cost = data.value * 100;
          console.log(this.cost);
          let ket;
          if (data.etd[2] > 1) {
            ket = ' days';
          } else {
            ket = ' day';
          }
          this.estimasi = data.etd + ket;
          this.grandTotal += this.cost;
          console.log(this.estimasi);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  methods: {
    buyin() {
      axios
        .post(
          'http://localhost:3000/transaction',
          {
            cart: this.products,
            totalPrice: this.grandTotal,
          },
          {
            headers: {
              token: localStorage.token,
            },
          },
        )
        .then(({ data }) => {
          this.$router.push('/transaction');
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
