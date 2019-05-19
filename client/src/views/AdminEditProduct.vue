<template>
    <div>
        <div class="text-center mb-3 mt-5">
            <h3>Edit Product</h3>
            <router-link :to="{'name': 'admin-list-product'}">
                List Product
            </router-link>
        </div>
        <form 
            @submit.prevent="editFormProduct" 
            enctype="multipart/form-data"
        >
            <div class="form-group">
                <label for="product-name">Name</label>
                <input
                    id="product-name"
                    type="text" 
                    class="form-control"
                    v-model="productForm.name"
                    aria-describedby="emailHelp" 
                    placeholder="Product Name"
                    required
                >
            </div>

            <div class="form-group">
                <label for="product-price">Price</label>
                <input
                    id="product-price"
                    type="number" 
                    class="form-control" 
                    v-model="productForm.price"
                    aria-describedby="emailHelp" 
                    placeholder="Price"
                    required
                >
            </div>

            <div class="form-group">
                <label for="product-stock">Stock</label>
                <input 
                    id="product-stock"
                    type="number" 
                    class="form-control" 
                    v-model="productForm.stock"
                    aria-describedby="emailHelp" 
                    placeholder="Stock"
                    required
                >
            </div>

            <div class="form-group">
                <label for="product-category">Category</label>
                <select class="form-control" v-model="productForm.category" id="product-category" required>
                    <option value="" disabled>Choose Category</option>
                    <option value="cereal">Cereals</option>
                    <option value="shirt">Shirt</option>
                    <option value="aqiqah">Aqiqah</option>
                    <option value="birthday">Birthday</option>
                </select>
            </div>

            <div class="form-group">
                <label for="product-category">Description</label>
                <input class="form-control" type="text" v-model="productForm.description" id="" required>
            </div>

            <div style="float: right;">
                <button 
                    type="submit" 
                    class="btn btn-primary push-right"
                >Edit</button>
            </div>
        </form>
    </div>
</template>

<script>
import api from '@/api/localapi'

export default {
    data() {
        return {
            productForm: {
                _id: '',
                name: '',
                price: '',
                stock: '',
                category: '',
                description: '',
                picture: ''
            }
        }
    },
    methods: {
        submitFormProduct() {
            this.$emit('submit-product', this.productForm)
        },
        handleFileUpload(event) {
            this.productForm.picture = event.target.files[0]
        },
        findProduct() {
            api.defaults.headers.common['token'] = localStorage.token

            api
            .get(`products/${this.$route.params.id}`)
            .then(({data}) => {
                this.productForm._id=data._id
                this.productForm.name=data.name
                this.productForm.price=data.price
                this.productForm.stock=data.stock
                this.productForm.category=data.category
                this.productForm.description=data.description
                this.productForm.picture=data.picture
            })
            .catch(err => {
                console.log(err);
            })
        },
        editFormProduct() {
            this.$emit('edit-product', this.productForm)
        }
    },
    mounted() {
        this.findProduct()
    },
}
</script>

<style>

</style>
