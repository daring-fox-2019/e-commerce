<template>
  <div>
    <div class="container">
    <p class="admintitletbltxt">Product search result by name : </p>
        <div v-if="searchResult" class="row">
      <div v-for="(product, index) in searchResult" :key="index" class="col-sm-12 col-md-4">
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

export default {
  props : ['searchResult'],
  created() {
    console.log('hehe search');
    console.log(this.searchResult);
    
    
  },
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
   }
};
</script>

<style>
#hehe {
    height: 100%;
}

.admintitletbltxt {
  height: 2rem;
    font-weight: 600;
    font-family: "Lato", sans-serif;
    font-size: 15px;
    letter-spacing: 0.17em;
    text-transform: capitalize

}
</style>
