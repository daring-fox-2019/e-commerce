<template>
    <div class="container-fluid">
        <b-row>
            <b-col class="px-0">
                <img
                style="width: 100%;"
                :src="product.image ||'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'"
                alt="">
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                {{product.name}}}
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                Price: {{product.price}}}
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                Available stock: {{product.stock}}
            </b-col>
        </b-row>
        <b-row class="d-flex">
            <b-col class="px-0 flex-grow-1">
                <b-form-group id="input-group-4" label-for="quantity">
                    <b-form-input
                        type="number"
                        min="1"
                        id="quantity"
                        required
                        v-model="quantity"
                        placeholder="Input Item Quantity"></b-form-input>
                </b-form-group>

            </b-col>
            <b-col class="px-0" cols=4 >
                <b-button
                    variant="outline-primary"
                    class="ml-2 px-2"
                    :disabled="!isLogin"
                    @click="addToCart">Add To <i class="fas fa-shopping-cart"></i></b-button>
                </b-col>
        </b-row>
        <b-row>

        </b-row>
    </div>
</template>

<script>
export default {
  name: 'product-detail',
  data() {
    return {
      quantity: '',
    };
  },
  created() {
    // console.log(this.$route.params.id)
    this.fetchProductDetail();
  },
  watch: {
    $route() {
      // console.log(this.$route.params.id)
      this.fetchProductDetail();
    },
  },
  methods: {
    fetchProductDetail() {
      this.$store.dispatch('fetchProductDetail', this.$route.params.id);
    },
    addToCart() {
      // console.log(this.$route.params.id)
      const cart_obj = {
        product: this.$route.params.id,
        quantity: this.quantity,
      };
      // console.log(cart_obj)
      this.$store.dispatch('addToCart', cart_obj);
    },
  },
  computed: {
    product() {
      return this.$store.state.singleProductDetail;
    },
    isLogin() {
      return this.$store.state.session.isLogin
    }
  },
};
</script>
<style>

</style>
