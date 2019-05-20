<template>
    <div>
    <navbar/>
    <div class="jumbotron" style="background : none ; height: 810px;">
        <div class="row">
        <div
        id="product-photos"
        class="fill card col-3"
        style="height : 300px; border-radius: 25px;">
            <!-- <h1>hello world</h1> -->
            <img :src="product.image">
        </div>
        <b-card class="col-7 ml-5" style="border-radius: 30px">
            <h2>{{product.title}}</h2>
            <hr> 
            <p >{{product.description}}</p>
            <hr>
            <div class="row justify-content-between">
                <div><h4>Rp.{{price}}</h4></div>
                <div><h4>{{product.location}}</h4></div>
            </div>
            <div class="row"><h4>stock: {{product.stock}}</h4></div>
            <br>
            <div class="row justify-content-start">
                <button class="btn btn-primary mr-3"><i class="fas fa-cash-register mr-2"></i>Buy Now</button>
                <button @click="addToCart" class="btn btn-primary" ><i class="fas fa-cart-arrow-down mr-2"></i>Add to Cart</button>
            </div>
        </b-card>
        </div>
    </div>
    </div>
</template>

<script>
import navbar from '../components/navbar'
import swal from 'sweetalert2'
import Swal from 'sweetalert2';
export default {
    data(){
        return{
            product : '',
            price: ''
        }
    },
    components : {
        navbar
    },
    methods : {
        addToCart(){
            // console.log(this.product._id)
            if(localStorage.token){
                axios({
                    method : 'post',
                    url : `http://localhost:3000/carts/${this.$route.params.id}/${localStorage.userId}`
                })
                .then(({data}) =>{
                    console.log('cart dapet',data);
                    Swal.fire('product successfully added to cart!', '', 'success')
                })
                .catch(err =>{
                    console.log(err)
                })
            }else{
                Swal.fire('please Login first before shopping', '', 'error')
            }
        }
    },
    mounted(){
        let id = this.$route.params.id
        axios({
            method : 'get',
            url : `http://localhost:3000/products/${id}`,
            headers: {
                token : localStorage.token
            }
        })
        .then(({data}) =>{
            // console.log('di product detail',data);
            this.product = data
            let price = (data.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
            this.price = price
        })
        .catch(err =>{
            console.log(err);
        })
    }
    ,
    created(){

    }
}
</script>
<style>
    .fill {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden
}
.fill img {
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%
}

p{
    text-align: justify
}
</style>
