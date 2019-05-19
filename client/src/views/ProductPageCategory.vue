<template>
  <div>
    <CategoryBlock 
    v-for="(category, index) in catList" :key="index"
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
  created() {
    this.fetchCategory()
  },
  data() {
    return {
      catList : []
    }
  },
  methods: {
    getsinglepage(id) {
        this.$emit('getsinglepage', id)
    },
    fetchCategory() {
      this.axios
        .get(`/categories`)
        .then(({ data }) => {
          this.catList = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    categoryList() {
      if (this.$route.name == 'product') {
        this.$emit('fetchCategory')
      }
    }
  },
};
</script>

<style>
</style>
