<template>
    <div>
        <div class="text-center mb-3 mt-5">
            <h3>Product List</h3>
            <router-link :to="{'name': 'admin-create-product'}">
                Create Product
            </router-link>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product._id">
                    <td>{{product.name}}</td>
                    <td>{{product.price}}</td>
                    <td> 
                        <router-link :to="`/admin/edit-product/${product._id}`"><span class="btn-edit" @click="editProduct(product._id)">Edit </span> </router-link>| <span @click="deleteProduct(product._id)" class="color-red cursor-pointer">Delete</span> 
                    </td>
                </tr>
            </tbody>
        </table>
    
    </div>


</template>

<script>
    import api from '@/api/localapi'
    
    export default {
        data() {
            return {
                products : []
            }
        },
        mounted() {
            this.fetchProducts()
        },
        methods: {
            fetchProducts() {
                api
                .get('/products')
                .then(({data}) => {
                    this.products = data
                })
                .catch(err => {
                    console.log(err);
                })
            },
            deleteProduct(id) {
                Swal.fire({
                    title: 'Delete this product?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    api
                    .delete(`/products/${id}`)
                    .then( product => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        this.products = this.products.filter(el => {
                            if(el._id !== product._id) {
                                return el
                            }
                        })
                        this.fetchProducts()
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    
                }
                })
            }
        },
    }
</script>

<style scoped>
.color-red {
  color: #e33012;
}
.cursor-pointer {cursor: pointer;}
.btn-edit {
    color: cornflowerblue;
}
.btn-edit:hover {
    cursor: pointer;
}
</style>

