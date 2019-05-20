<template>
    <div class="jumbotron" style="background : none;">
        <div class="card col-10 offset-1">
            <h1 class="card-header">Your Cart</h1>
            <div class="row justify-content-center">
                <div v-for="(product,index) in products" :key="index">
                    <b-card
                    v-show="product.showStatus === true"
                    :img-src="product.image"
                    img-alt="Image"
                    img-top
                    id="product-card"
                    tag="article"
                    style="max-width: 12rem; min-width: 12rem;"
                    class="mt-2 mb-4 mr-2 ml-2 imageCard"
                    >
                        <!-- <h5 slot="header" style="text-align: left;"> header </h5> -->
                        <b-card-text >
                        <!-- <img src="product.image"> -->
                        <div style="text-align : left">
                        <h6>{{product.title}}</h6>
                        <!-- <hr/>
                        <span class="product-desc">
                        Some quick example text lorem ipsum dolor sit amet.
                        </span> -->
                        </div>
                        <hr/>
                        <div style=" text-align: right ">
                        <b><span class="price">
                        Rp.{{product.price}}
                        </span></b>
                        <div>
                        <span>{{product.location}}</span>
                        </div>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        </div>
                        </b-card-text>
                        <b-button href="#" @click.prevent="removeItem(product._id); product.showStatus = false" variant="danger">remove</b-button>
                    </b-card>
                </div>
            </div>
        </div>
        <br>
        <b-button @click.prevent="removeAllItem" class="mb-2" href="#" variant="danger">remove all product</b-button>
        
        <div>
        <router-link to="/cart/total" v-bind:products="products"><button class="button btn-success mr-2">get shopping summaries</button></router-link>        
        <router-view/>
        <router-link to="/"><button class="button btn-success mt-5">back to Homepage</button></router-link>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            products : [],
            cartId : ''
        }
    },
    methods : {
        removeAllItem(){
            axios({
            method : 'patch',
            url : `http://localhost:3000/carts/${this.cartId}`,
            })
            .then(({data})=>{
                console.log(data);
                this.products = []
            })
            .catch(err =>{
                console.log(err);
            })
        },

        removeItem(id){
            console.log(id);
            axios({
                method: 'patch',
                url: `http://localhost:3000/carts/${this.cartId}/${id}`
            })
            .then(({data})=>{
                console.log('data dari remove item',data);
                // this.products = data.products
                let temp = []
                this.products.forEach(product => {
                    if(product._id !== id){
                        temp.push(product)
                    }
                });
                this.product = temp
            })
            .catch(err =>{
                console.log(err);
            })
        }
    },
    created(){
        axios({
            method : 'get',
            url : `http://localhost:3000/carts/${localStorage.userId}`,
        })
        .then(({data})=>{
            console.log(data);
            data.products.forEach(product =>{
                product.showStatus = true
                this.products.push(product)
            })
            // this.products = data.products
            this.cartId = data._id
        })
        .catch(err =>{
            console.log(err);
            
        })
    }
}
</script>

<style>
.footer {
  /* flex-shrink: 0; */
  background-color: #42b983;
  font-size: 18px;
  /* position:fixed; */
  bottom:0;
  left:0;
  width: 100%
}
</style>
