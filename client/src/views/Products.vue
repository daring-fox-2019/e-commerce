<template>
  <div>
    <!-- <b-row class="p-2">
            <div class="border col">
                test
            </div>
    </b-row>-->
    <b-row class="px-0">
      <b-col>
        <b-row>
          <ProductCard v-for="product in userProductList" :product="product" :key="product._id"/>
        </b-row>
      </b-col>
      <b-col cols="4" class="pl-5 p-2">
        <router-view/>
        <NavigationAccordion/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import NavigationAccordion from '@/components/NavigationAccordion.vue';

export default {
  name: 'Product',
  components: {
    ProductCard,
    NavigationAccordion,
  },
  created() {
    this.fetchUserProductList();
  },
  methods: {
    fetchUserProductList() {
      this.$store.dispatch('fetchUserProductList');
    },
  },
  computed: {
    userProductList() {
      return this.$store.state.userProductList;
    },
  },
};
</script>

<style>
</style>
