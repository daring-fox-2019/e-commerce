<template>
    <div id="mycart">
     <h1>Shopping Cart</h1>
     <br>
    <Checkout v-for="product in userCart" :product="product"></Checkout>
    <div class="totals" style="margin-left:70%;">
        <div class="totals-item totals-item-total">
            <label>Grand Total</label>
        <div class="totals-value" id="cart-total">${{total}}</div>
        </div>
        <br>
        <button class="btn btn-dark">Checkout</button>
    </div>
    </div>
</template>
 
 <script>
 import Checkout from '@/components/Checkout.vue'
 export default {
     data(){
         return{
             userCart:''
         }
     },
     components:{
         Checkout
     },
     computed:{
         total:function(){
             let totalShop = 0
             for(let i=0 ; i < this.userCart.length ;i++){
                 totalShop += this.userCart[i].ProductId.price
             }
             return totalShop
         }
     },
     methods:{
         getUserCart() {
            let token = localStorage.getItem("token");
            this.$axios
                .get("http://localhost:3000/cart", { headers: { token } })
                .then(({ data }) => {
                const { products } = data;
                this.userCart = products;
            })
            .catch(err => {
            console.log(err);
        });
    }   ,
     },
     created(){
         this.getUserCart()
     }
 }
 </script>

<style>
    #mycart{
        margin-left: 10%;
        margin-right: 10%;
    }
</style>

 
 