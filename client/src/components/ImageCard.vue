<template>
    <div>
        <div v-if="products">
            <img v-for="(product, index) in products.slice(0,3)" :key="index" :src="product.image" alt="" srcset="">
        </div>
    </div>
</template>

<script>
export default {
    props : ['products']
}
</script>

<style scoped>
   img {
        width: 45px;
        height: 40px;
        background-color: #f5f5f5;
        padding: 2px;
    }
</style>
