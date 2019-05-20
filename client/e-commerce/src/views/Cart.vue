<template>
  <div>
    <a href @click.prevent="backToHome">back shoping?</a>

    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Image</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Sub Total</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart, index) in carts" :cart="cart" :key="index">
            <th scope="row">{{index + 1}}</th>
            <td>{{cart.productId.name}}</td>
            <td>
              <img :src="cart.productId.image" alt="product photo" width="40" height="60">
            </td>
            <td>{{cart.quantity}}</td>
            <td>{{cart.productId.price}}</td>
            <td>{{cart.quantity * cart.productId.price}}</td>
            <td>
              <button @click.prevent="hapuscart(cart._id)" class="pa-2 btn btn-primary">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
        <h2>Total:Rp {{total}}</h2>
        <button v-if="carts.length > 0"  @click.prevent="checkout(iDUser)" type="button" class="btn btn-primary btn-lg btn-block">Check Out</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["carts", "iDUser"],
  components: {},
  data() {
    return {
        total: 0
        
    };
  },
  created(){
      this.getTotal()

  },
  methods: {
    backToHome() {
      this.$emit("backhome");
    },
    hapuscart(id) {
      this.$emit("hapuscart", id);
    },
    checkout(id){
         this.$emit("checkoutcart", id);
    },
    getTotal(){
        console.log(this.carts);
        
        for (const data of this.carts) {
            let subtotal = data.productId.price * data.quantity
            this.total += subtotal
        }
    }


  }
};
</script>

