<template>
<div class="card col-2 offset-5" style="height : 250px;">
    <h5>your shopping summaries</h5>
    <div class="card">
    <ul v-for="(product,index) in products" :key="index">
        <li>{{product.title}}</li>
    </ul>
    <button @click="getTotal" class="button btn-success">get total amount</button>
    <h1>Rp.{{total}}</h1>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            products : [],
            total : 0
        }
    },
    methods : {
        getTotal(){
            let total = 0
            this.products.forEach(product => {
                total += product.price                
            });
            this.total = total
        }
    },
    mounted(){

    },
    created(){
        // console.log(this.products);
        axios({
            method : 'get',
            url : `http://localhost:3000/carts/${localStorage.userId}`,
        })
        .then(({data})=>{
            console.log('ini data',data);
            this.products = data.products
            console.log('setelah proses',this.products);
        })
        .catch(err =>{
            console.log(err);
        })
    }
}
</script>
