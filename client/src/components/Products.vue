<template>
  <div>
    <div class="card">
      <div
        class="card-body"
        style="background-color: #F1E7FE; text-align: center;border: solid 1px; border-color: #130831;"
      >
        <h2>{{ product.name }}</h2>
        <img :src="product.image" style="max-width: 400px; max-height: 300px;">
        <h2>Rp {{ product.price }},-</h2>
        <h4>Stock: {{ product.stock }}</h4>
        <h4>{{ product.category }}</h4>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
};
</script>
