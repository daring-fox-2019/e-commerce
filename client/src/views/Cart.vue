<template>
    <div class="row">
        <div class="col-md-8">
            <div 
                class="card mb-3" 
                v-for="(cart, index) in carts"
                :key="index"
            >
                <div class="row no-gutters">
                    <div class="col-md-3">
                    <img :src="cart.product.picture ? cart.product.picture : 'https://via.placeholder.com/50x50'" class="card-img" alt="...">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h5 class="card-title">{{cart.product.name}}</h5>
                            <p class="card-text">{{cart.product.description}}</p>
                            <p class="card-text">{{convertToRupiah(cart.product.price)}} x {{cart.quantity}} = <span style="color: orangered;">{{convertToRupiah(cart.total)}}</span></p>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card-body">
                            <div 
                                class="cart--delete"
                                @click="deleteCart(cart._id)"
                            >
                                <i class="far fa-trash-alt"></i> Delete
                            </div>
                        </div>
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
                <button class="btn btn-danger" @click="createCheckout">Checkout Order</button>
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
        this.fetchCart()
    },
    computed: {
        
    },
    methods: { 
        convertToRupiah,
        fetchCart() {
            api.defaults.headers.common['token'] = localStorage.token

            api
            .get('/carts')
            .then(({data}) => {
                this.carts = data

                data.forEach(element => {
                    this.totalPayment += element.total
                });

            })
            .catch(err=> {
                console.log(err);
            })
        },
        deleteCart(id) {
            api.defaults.headers.common['token'] = localStorage.token

            api
            .delete(`/carts/${id}`)
            .then(({data}) => {
                this.totalPayment=0

                this.carts = this.carts.filter(el => {
                    if(el._id !== data._id) {
                        this.totalPayment+=el.product.price
                        return el
                    }
                })
            })
            .catch(err=> {
                console.log(err);
            })
        },
        createCheckout() {
            api.defaults.headers.common['token'] = localStorage.token

            api
            .get('/carts')
            .then(({data}) => {
                this.carts = data
                let cartToAdd = []
                data.forEach(e => {
                    cartToAdd.push(e._id)
                })
                
                console.log(cartToAdd);
                return api
                .post(`/transactions`, {
                    userId: data[0].buyer._id,
                    carts: cartToAdd,
                    totalPayment: this.totalPayment
                })
            })
            .then(({data}) => {
                this.$router.push('/checkout')
            })
            .catch(err=> {
                console.log(err);
            })
            .catch(err=> {
                console.log(err);
            })
        }
    },
}
</script>

<style scope>
    .cart--delete {
        color: #dc3545;
        cursor: pointer;
    }
</style>
