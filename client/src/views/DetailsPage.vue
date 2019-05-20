<template>
    <div class="container-fluid" v-if="product">
        <div class="row">
            <div class="col-8 mt-5 py-5">
                <img :src="product.image" alt="" srcset="">
            </div>
            <div class="col-4" id="panel" v-if="product.category">
                <h6>Free Vector Styles\{{product.category.name}}\</h6>
                <h5>{{product.productName}}</h5><br>
                <p class="mb-1">{{product.description}}</p>
                <a @click.prevent="addToCart(product._id)" href="#" type="button" class="btn btn-light btn-lg mt-5">Buy for $ {{product.price}}</a>
            </div>
        </div>
    </div>
</template>

<script>

import axios from '../api/localhost.js'

export default {
    data() {
        return {
            product : {}
        }
    },
    created() {
        axios
            .get(`/products/${this.$route.params.id}`,{ headers : { token : localStorage.getItem('token')}})
            .then(({ data })=> {
                console.log(data);
                this.product = data
            })
            .catch((err)=> {
                console.log(err);
            })
    },
    methods: {
        addToCart(id){
            axios
                .post(`/carts`,{
                    ProductId : id,
                    amount : 1
                },{
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then(({ data })=> {
                    console.log(data);
                    this.$router.push(`/carts`)
                })
                .catch((err)=> {
                    console.log(err);
                })
        }
    },
}
</script>

<style scoped>
    .container-fluid {
        height: 100vh
    }

    .btn {
        background: none;
        font-weight: 400;
        transition: 0.3s;
        border: black 2px solid;
        letter-spacing: -0.2px;
    }
    .btn:hover {
        background: #083232;
        color: white;
        border: black 1px solid;;
    }

    #panel {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    img {
        max-width: 700px;
        max-height: 600px
    }

    h5 {
        font-size: 48px;
    }
</style>
