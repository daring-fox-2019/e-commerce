<template>
  <div>
    <div
      class="d-flex justify-content-center"
      style="width: 1000px; margin: 0 auto; padding-top: 100px;"
    >
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
        style="min-width: 1000px;"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <a href="#" @click="goToProduct(allProducts[1]._id)">
              <img
                :src="allProducts[1].image"
                class="d-block"
                height="400px;"
                style="width: 1000px;"
              >
            </a>
          </div>
          <div class="carousel-item">
            <a href="#" @click="goToProduct(allProducts[4]._id)">
              <img
                :src="allProducts[4].image"
                class="d-block"
                alt="#"
                height="400px;"
                style="width: 1000px;"
              >
            </a>
          </div>
          <div class="carousel-item">
            <a href="#" @click="goToProduct(allProducts[8]._id)">
              <img
                :src="allProducts[8].image"
                class="d-block"
                alt="#"
                height="400px;"
                style="width: 1000px;"
              >
            </a>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['allProducts']),
  },
  methods: {
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>
