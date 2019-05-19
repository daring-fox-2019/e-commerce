<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 item-photo">
                <img style="max-width:100%;" src="https://i.ebayimg.com/images/g/9VsAAOSw1NFaOWSC/s-l640.jpg" />
            </div>
            <div class="col-md-5" style="border:0px solid gray">
                <h3>{{product.name}}</h3>
    
                <h3 style="margin-top:0px;">{{convertToRupiah(product.price)}}</h3>
      
                <div 
                    class="section" 
                    style="padding-bottom:20px;"
                >
                    <div>
                        <h6 class="title-attr"><small>Quantity</small></h6>         <div style="display: flex;">
                            <div class="btn-minus"> - </div>
                            <input v-model="quantity" value="1" />
                            <div class="btn-plus"> + </div>
                        </div>    
                    </div>
                </div>                
    
                <!-- Botones de compra -->
                <div class="section" style="padding-bottom:20px;">
                    <button
                        @click="buyItem(product._id)"
                        class="btn btn-success"><i class="fas fa-shopping-cart" style="margin-right:5px;"></i> Buy Now</button>
                    <h6 @click="addToCart(product._id)">Add to cart</h6>
                </div>                                        
            </div>                              
    
            <div class="col-md-9">
                <ul class="menu-items">
                    <li class="active">Detail</li>
                </ul>
                <div style="width:100%;border-top:1px solid silver">
                    <p style="padding:15px;">
                        <small>
                        {{product.description}}
                        </small>
                    </p>
                </div>
            </div>		
        </div>
    </div>  
</template>

<script>
    import api from '@/api/localapi'
    import {convertToRupiah } from '@/helpers/convertToRupiah.js'

    export default {
        props:['id'],
        data() {
            return {
                product : {},
                quantity: 1
            }
        },
        mounted() {
            this.product = {}
            this.fetchDetailProduct()
        },
        methods: {
            fetchDetailProduct() {
                api
                .get(`/products/${this.id}`)
                .then(({data}) => {
                    this.product = data
                })
                .catch(err => {
                    console.log(err);
                })
            },
            convertToRupiah,
            buyItem(productId) {
                api
                .post(`/cart/${productId}`, {
                    name: productId,
                    buyer: '212',
                    quantity: this.quantity
                })
                .then(({data}) => {
                    this.$route.push(`/cart/${productId}`)
                })
            },
            addToCart(productId) {
                api.defaults.headers.common['token'] = localStorage.token

                api
                .post(`/carts/${productId}`, {
                    name: productId,
                    quantity: this.quantity
                })
                .then(({data}) => {
                    this.$route.push(`/cart/${productId}`)
                })
            }
        },
    }
</script>

<style scoped>
ul > li{margin-right:25px;font-weight:lighter;cursor:pointer}
li.active{border-bottom:3px solid silver;}

.item-photo{display:flex;justify-content:center;align-items:center;border-right:1px solid #f6f6f6;}
.menu-items{list-style-type:none;font-size:11px;display:inline-flex;margin-bottom:0;margin-top:20px}
.btn-success{width:100%;border-radius:0;}
.section{width:100%;margin-left:-15px;padding:2px;padding-left:15px;padding-right:15px;background:#f8f9f9}
.title-price{margin-top:30px;margin-bottom:0;color:black}
.title-attr{margin-top:0;margin-bottom:0;color:black;}
.btn-minus{cursor:pointer;font-size:12px;display:flex;align-items:center;padding:5px;padding-left:10px;padding-right:10px;border:1px solid gray;border-radius:2px;border-right:0;}
.btn-plus{cursor:pointer;font-size:12px;display:flex;align-items:center;padding:5px;padding-left:10px;padding-right:10px;border:1px solid gray;border-radius:2px;border-left:0;}
div.section > div {width:100%;display:inline-flex;}
div.section > div > input {margin:0;padding-left:5px;font-size:10px;padding-right:5px;max-width:18%;text-align:center;}
.attr,.attr2{cursor:pointer;margin-right:5px;height:20px;font-size:10px;padding:2px;border:1px solid gray;border-radius:2px;}
.attr.active,.attr2.active{ border:1px solid orange;}
</style>
