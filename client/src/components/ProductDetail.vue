<template>
  <v-layout column>
    <v-layout>
      <div class="productImagePreview">
        <img :src="shopProduct.image" :alt="shopProduct.title">
      </div>
      <v-flex>
        <v-layout column>
          <v-layout
            wrap
            class="headline product-title font-weight-bold"
          >{{ shopProduct.name }}</v-layout>
          <h1 class="headline yellow--text font-weight-bold py-3">Rp. {{formatPrice}}</h1>
          <v-layout row align-center>
            <span class="title mr-3">Quantity:</span>
            <Quantity class="py-2" :quantity="shopProduct.stock" @updatequantity="onChangeQuantity"></Quantity>
          </v-layout>
          <v-flex>
            <v-btn class="btn mt-4" color="yellow black--text" @click="addToCart">Add to Cart</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout mt-3>
      <!-- Description tags, reviews, etc -->
      <v-tabs class="description-tabs" dark slider-color="yellow">
        <v-tab class="font-weight-bold" ripple>Description</v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
                {{ productDesc }}
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-layout>
  </v-layout>
</template>
<script>
import Quantity from "@/components/Quantity.vue";
import commaFormat from "@/helpers/priceFormat.js";
import api from "@/api/backend.js";

export default {
  props: ["mode"],
  components: {
    Quantity
  },
  data() {
    return {
      internalProduct: null,
      shopProduct: null
    };
  },
  computed: {
    productDesc() {
        if(this.shopProduct.description && this.shopProduct.description.length > 0) {
            return this.shopProduct.description;
        }
        else {
            return 'There is no product information yet';
        }
    },
    formatPrice() {
      return commaFormat(this.internalProduct.price);
    }
  },
  watch: {
    $route: "fetchData"
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    addToCart() {
        let item = {
          _id: this.internalProduct._id, 
          quantity: this.internalProduct.quantity, 
          price: (this.internalProduct.quantity * this.internalProduct.price)
        }
        this.$store
            .dispatch('addCartItem', item)
            .then(({ data }) => {
                console.log(data);
                this.$store.dispatch('getCurrentCart');
            })
            .catch((err) => {
              let msg  = err.response.data
              if(msg.includes('dup')) {
                msg = 'Product existing in the cart!'
              }
              swal.fire('AddItem Error', msg , 'error');
            });
    },
    fetchData() {
      api
        .get("/products/" + this.$route.params.id, {
          headers: { Authorization: localStorage.ecomm_token }
        })
        .then(({ data }) => {
          this.internalProduct = data;
          this.shopProduct = data;
          this.shopProduct.stock = 1;
        })
        .catch(err => {
          swal.fire("Error", err.response.data, "error");
        });
    },
    onChangeQuantity(value) {
      this.internalProduct.quantity = value;
    }
  }
};
</script>
<style scoped>
.productImagePreview {
  max-height: 500px;
  margin-right: 30px;
}
.productImagePreview img {
  max-width: 400px;
  max-height: 500px;
}

.product-title {
  min-height: 80px;
}
.description-tabs {
    width: 100%;
    min-height: 200px;
    margin-bottom: 50px;
}

* {
  font-weight: 300;
}
</style>
<style scoped>
.btn {
    margin: 0;
}
</style>
