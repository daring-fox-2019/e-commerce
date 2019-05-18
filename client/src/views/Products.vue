<template>
    <b-row class="px-0">
        <b-col cols=3 class="p-2">
            <NavigationAccordion />
        </b-col>
        <b-col>
            <b-row>
                <ProductCard
                    v-for="(x,index) in 20"
                    :key="index"/>
            </b-row>
        </b-col>
    </b-row>
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
};
</script>

<style>
</style>
