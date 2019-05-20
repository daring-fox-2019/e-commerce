<template>
  <div>
    <div class="img-wrapper d-flex align-items-center justify-content-center mx-1">
      <img :src="product.image" alt srcset>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsCard",
  props: ["product"]
};
</script>

<style scoped>
.img-wrapper {
  background-color: #f5f5f5;
  width: 350px;
  height: 291px;
  border-radius: 10px;
}

.container img {
  background-color: #f5f5f5;
  min-width: 219px;
  max-height: 217px;
}
</style>
