<template>
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
        <a href="#" class="btn far fa-heart fa-3x m-2 position-absolute"></a>
      <a href="#">
        <img class="card-img-top" :src="product.image_url" alt>
      </a>
      <div class="card-body">
        <h4 class="card-title">
          <router-link :to="'/products/'+product._id">{{ product.name }}</router-link>
        </h4>
        <h5>Rp. {{ product.price }}</h5>
        <p class="card-text">Qty : {{ product.stock }}</p>
      </div>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary">Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ['product'],
  mounted() {
    console.log(this);
  },
};
</script>
