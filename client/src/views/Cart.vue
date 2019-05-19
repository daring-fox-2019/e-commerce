<template>
    <div class="row">
        <div class="col-md-8">
            <div 
                v-for="(cart, index) in carts"
                class="card"
                :key="index" 
            >
                <div class="card-body">
                    <h5 class="card-title">{{cart.product.name}}</h5>
                    <div 
                        style="display: 
                            flex; 
                            display: space-evenly;"
                    >
                        <p class="card-text">{{cart.product.description}}</p>
                        <p>{{convertToRupiah(cart.product.price)}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <h5>Order Detail</h5>
            <div class="card" style="padding: 25px;">
                <div>
                    <h5>Total: {{convertToRupiah(totalPayment)}}</h5>
                </div>
                <router-link class="btn btn-danger" to="/checkout">Checkout Order</router-link>
            </div>
        </div>

    </div>
</template>

<script>
import api from '@/api/localapi'
import {convertToRupiah} from '@/helpers/convertToRupiah.js'

export default {
    data() {
        return {
            carts:[],
            totalPayment: 0
        }
    },
    mounted() {
        api.defaults.headers.common['token'] = localStorage.token

        api
        .get('/carts')
        .then(({data}) => {
            this.carts = data

            data.forEach(element => {
                this.totalPayment += element.product.price
            });

        })
        .catch(err=> {
            console.log(err);
        })
    },
    methods: { convertToRupiah },
}
</script>

<style>

</style>
