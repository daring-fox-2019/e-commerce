<template>
  <div class="container my-2">
    <ul class="list-group">
      <li v-for="keranjang in $store.state.user.cart" class="row inline m-1" :key="keranjang._id">
        <img class="my-auto"
          :src="keranjang.product.image_url"
          :alt="keranjang.product.name"
          height="60"
          width="60"
        >
        <p class="ml-4 my-auto">{{ keranjang.product.name }}</p>
        <div class="ml-auto">
          <!-- <p>Total barang : {{ keranjang.totalCount }}</p> -->
          <div class="form-group">
            <label for="exampleFormControlSelect1">Jumlah :</label>
            <select class="form-control" @change="onChange($event,keranjang.totalCount,keranjang.product._id)" id="exampleFormControlSelect1">
              <option v-for="index in keranjang.product.stock" :selected="index===keranjang.totalCount" :key="index">{{ index }}</option>
            </select>
          </div>
          <p>Total harga : {{ keranjang.totalPrice }}</p>
        </div>
      </li>
    </ul>
    <h3>Subtotal : {{ $store.state.user.subTotal }}</h3>
    <h3>Total Produk : {{ $store.state.user.totalProduct }}</h3>
    <button class="btn btn-success">Proceed to checkout</button>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("getCart");
  },
  methods: {
    onChange(event,countBefore,id){
      this.$store.dispatch('changeCount',{
        count: event.target.value - countBefore,
        id
      })
    }
  }
};
</script>
