<template>
    <b-col
        class="mt-1"
        cols=3
        >
        <router-link :to="'/products/'+product._id">
            <b-row class="p-1">
            <div class="border d-flex flex-column w-100">
                <div class="border"
                    style="overflow:hidden;">
                    <img :src="product.image"
                        style="
                        height: 198px;"
                        alt="">
                </div>
                <div>
                    {{product.name}}
                </div>
                <div>
                    Available stock: {{product.stock}}
                </div>
                <div>
                    Price : {{product.price}}
                </div>
                <div>

                </div>
            </div>
        </b-row> </router-link>
    </b-col>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
};
</script>

<style>

</style>
