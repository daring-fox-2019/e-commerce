<template>
  <div>
    <div class="img-wrapper d-flex align-items-center justify-content-center mx-1">
      <a @click.prevent="deleteCart(product._id)" class="close float-left" href="#">
        <i class="fas fa-times"></i>
      </a>
      <img :src="product.ProductId.image" alt srcset>
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <button
          type="button"
          class="btn"
          style="width:100px;"
          @click.prevent="update(product._id, 'substract')"
          v-if="product.amount > 1"
        >
          <i class="fas fa-angle-down"></i>
        </button>
         <button
          type="button"
          class="btn"
          style="width:100px;"
          v-else disabled
        >
          <i class="fas fa-angle-down"></i>
        </button>
      </div>
      <input
        type="text"
        class="form-control text-center"
        aria-label="Text input with segmented dropdown button"
        :placeholder="product.amount"
        disabled
      >
      <div class="input-group-prepend dropup">
        <button
          type="button"
          class="btn"
          style="width:100px;"
          @click.prevent="update(product._id, 'add')"
        >
          <i class="fas fa-angle-up"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  methods: {
    update(id, value) {
      this.$emit("update", id, value);
    },
    deleteCart(id) {
      this.$emit("delete-cart", id);
    }
  }
};
</script>

<style scoped>
.img-wrapper {
  background-color: #f5f5f5;
  border-radius: 10px;
}

.container img {
  background-color: #f5f5f5;
  width: 230px;
  height: 217px;
}

.close {
  color: red;
}

.form-control {
  border: none;
  background-color: white;
}
</style>
