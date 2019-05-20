<template>
    <div class="container">
        <div class="mt-5">
            <h1 style="text-align:center">Your cart</h1>
        </div>
        <table class="table mt-3">
            <thead>
                <tr>
                <th scope="col" style="width:60%">Product</th>
                <th scope="col" >Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            <CartItem v-for= "(item,index) in cart" :key = "index" v-bind:cartId = "cart[index]._id" v-bind:item = "item" @newCart = "newCart" @deleteCart = "deleteCart" />
            </tbody> 
        </table>
        <div class="d-flex justify-content-end">
        <button v-on:click.prevent = "checkout" type="button" class="btn btn-danger" style="color:yellow">Checkout</button>
        <div v-show="alert"  class="alert alert-danger" role="alert">
            Deleted cart Successfully
        </div>
        </div>
    </div>
</template>
<script>
import CartItem from '@/components/CartItem.vue'
import axios from "@/api/server.js"
export default {
    name : 'cart',
    data () {
        return {
            cart : [],
            alert : false
        }
    },
    components : {
        CartItem
    },
    methods : {
        fetchCart () {
        let token = localStorage.getItem('token')
        axios.get('/cart',{ headers : { token }})
            .then(({ data }) =>{
               this.cart = data
            })
            .catch(err =>{
               console.log(err)
            })
        },
        newCart (quantity,cartId) {
            let token = localStorage.getItem('token')
            axios.put(`/cart/${cartId}`,{quantity},{ headers : { token } })
            .then(data =>{
                console.log('add quantity success')
            })
            .catch( err=>{
                console.log(err.message)
            })
        },
        deleteCart (cartId) {
            let token = localStorage.getItem('token')
            axios.delete(`/cart/${cartId}`, { headers : { token } })
            .then(data =>{
                this.alert = true
                setTimeout(() => {
                    this.alert = false
                    this.fetchCart()
                }, 1000);
            })
            .catch(err =>{
                console.log(err)
            })
        },
        checkout() {
            let token = localStorage.getItem('token')
           axios.post('/transaction' ,this.cart,{ headers : { token } })
           .then(({ data }) =>{
               Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Checkout Succesfully',
                showConfirmButton: false,
                timer: 1500
                })
                this.cart = []
                this.$router.push('/')
           })
           .catch(err =>{
               console.log(err)
           })

        }
    },
    mounted () {
        this.fetchCart()
    },
    computed : {
        total () {
            
            // return price * quantity
        }
    }
}
</script>

<style>

</style>
