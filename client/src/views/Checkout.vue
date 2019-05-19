<template>
    <div>
        <h3 class="mb-3">Checkout</h3>
        <form action="">
            <h6>Shipment Address</h6>
            <h6><small style="color: orangered;">*Our service based on Jakarta</small></h6>

            <div>API rajaongkir bermasalah silahkan isi kota anda</div>

            <div class="d-flex">
                <input 
                    class="form-control" 
                    type="text" 
                    v-model="address"
                    placeholder="input destination city"
                >

                <button class="btn btn-link">
                    Calculate
                </button>

            </div>
        </form>
        <div class="row mt-4 mb-2">
            <h5 class="col-md-12">Your Cart</h5>
        </div>
        <div 
            v-for="(cart, index) in transactions.carts"
            :key="index"
            class="card" 
        >   
            <div class="row">
                <div class="col-md-2">
                    <div>
                        <img :src="cart.product.picture ? cart.product.picture : 'https://via.placeholder.com/150x150'" alt="...">
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <h5 class="card-title">{{cart.product.name}}</h5>
                        <p class="card-text">{{ convertToRupiah(cart.product.price) }} x {{cart.quantity}} = {{convertToRupiah(cart.total)}}</p>
                    </div>
                </div>
                <div class="col-md-3">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/localapi'
import {convertToRupiah} from '@/helpers/convertToRupiah'

export default {
    data() {
        return {
            transactions: [],
            cities: [],
            address: ''
        }
    },
    mounted() {
        this.fetchTransaction()
        this.fetchCities()
    },
    methods: {
        fetchTransaction() {
            api.defaults.headers.common['token'] = localStorage.token

            api
            .get('/transactions')
            .then(({data}) => {
                console.log(data[0]);
                this.transactions = data[0]
            })
            .catch(err => {
                console.log(err);
            })
        },
        convertToRupiah,
        fetchCities() {
            api.defaults.headers.common['key'] = 'dd4927c879c8016e2679a017eda70396'

            api
            .get('https://api.rajaongkir.com/starter/city')
            .then(cities => {
                console.log(cities);
                this.cities = cities.rajaongkir.results
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
}
</script>

<style>

</style>
