<template>
  <div>
    <div class="container">
        <div class="row">
      <div class="col-sm-12 col-md-4">
        <DescBlock v-bind:category="category" id="hehe">
        </DescBlock>
    </div>
      <div v-for="(product, index) in category.products" :key="index" class="col-sm-12 col-md-4">
        <ProductBlock
     
      v-bind:product="product"
      v-on:getsinglepage="getsinglepage"
      ></ProductBlock></div>
        </div>
    </div>
  </div>
</template>

<script>
import ProductBlock from "@/components/ProductBlock";
import DescBlock from "@/components/DescBlock";

export default {
  props : ['category'],
  data() {
    return {
    };
  },
  methods: {
    getsinglepage(id) {
      this.$emit('getsinglepage', id)
    }
  },
  components: {
    ProductBlock,
    DescBlock,
  }
};
</script>

<style>
#hehe {
    height: 100%;
}
</style>
