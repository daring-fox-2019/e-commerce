<template>
    <div>
        <div>
            <div style="display:flex; justify-content: space-between;">
                <slot></slot>
            </div>
        </div>
        <div class="row">
            <div 
                class="col-md-3"
                v-for="(category, index) in categories"
            >
                <div 
                    class="card" 
                    :key="index"
                >
                    <router-link :to="/product/ + category._id">
                        <div>
                            <img :src="category.picture ? category.picture : 'https://via.placeholder.com/150x150'" class="card-img-top" alt="...">
                        </div>
                        <div class="card-body" style="color: #616161">
                            <h5 class="card-title">{{category.name}}</h5>
                            <p class="card-text">{{category.description}}</p>
                            <p class="card-text"></p>

                            <div class="price">
                                {{convertToRupiah(category.price)}}
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import {convertToRupiah } from '@/helpers/convertToRupiah.js'

export default {
    props:['categories'],
    methods: {
        convertToRupiah
    },
}
</script>

<style>
.price { 
    color: #84ab49;
    font-weight: 600;
    font-size: 16px;
}
</style>
