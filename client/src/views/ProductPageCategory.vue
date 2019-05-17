<template>
  <div>
    <CategoryBlock 
    v-for="(category, index) in categoryList" :key="index"
    v-bind:category="category"
    v-on:getsinglepage="getsinglepage"
    >
    </CategoryBlock>
  </div>
</template>

<script>
import CategoryBlock from "@/components/CategoryBlock.vue";
export default {
  name: "ProductPage",
  props: ["categoryList"],
  components: {
    CategoryBlock
  },
  methods: {
    getsinglepage(id) {
        this.$emit('getsinglepage', id)
    }
  },
};
</script>

<style>
</style>
