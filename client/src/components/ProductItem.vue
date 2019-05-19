<template>
    <div >
      <div class="col">
        <!-- BEGIN PRODUCTS -->
        <div class="col-md-12 col-sm-12">
          <span class="thumbnail">
            <img :src="product.image_url" alt="pic">
            <h4>{{ product.name }}</h4>
            <div class="ratings">
              <span class="glyphicon glyphicon-star"></span>
              <span class="glyphicon glyphicon-star"></span>
              <span class="glyphicon glyphicon-star"></span>
              <span class="glyphicon glyphicon-star"></span>
              <span class="glyphicon glyphicon-star-empty"></span>
            </div>
            <hr class="line">
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <p class="price">Rp. {{ product.price }}</p>
              </div>
              <div class="col-md-6 col-sm-12">
                <router-link :to="'/product/' + product._id" class="btn btn-success right">Detail</router-link>
              </div>
            </div>
          </span>
        </div>
        <!-- BEGIN PRODUCTS -->
      </div>
    </div>

</template>

<script>
export default {
    props: ['product'],
};
</script>