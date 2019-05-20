<template>
  <div class="box">
    <p>Summary</p>
    <p class="level">
      <span class="level-left">Total</span>
      <span class="level-right has-text-weight-bold">Rp {{total}}</span>
    </p>
    <button class="button is-danger is-fullwidth">Checkout ({{quantity}})</button>
  </div>
</template>

<script>
export default {
  name: 'CartSummary',
  props: {
    total: Number,
    quantity: Number
  }
}
</script>

<style scoped>
.level {
  margin: 12px 0 !important;
  padding: 8px 0;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
}
</style>
