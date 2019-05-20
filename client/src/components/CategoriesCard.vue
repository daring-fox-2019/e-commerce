<template>
    <div class="row ml-1">
        <div class="px-0" v-for="(products, index) in category" :key="index">
           <ImageCard :products="products"></ImageCard>
        </div>
    </div>
</template>

<script>

import ImageCard from '@/components/ImageCard.vue'

export default {
    props : ['category'],
    components : {
        ImageCard
    }
}
</script>

<style scoped>
 
</style>

