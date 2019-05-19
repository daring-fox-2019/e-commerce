<template>
    <div>
        <h3>Add Product</h3>

        <form @submit.prevent="submitFormProduct">
            <div class="form-group">
                <label for="exampleInputEmail1">Product Name</label>
                <input 
                    type="text" 
                    class="form-control"
                    v-model="product.name"
                    aria-describedby="emailHelp" 
                    placeholder="Product Name"
                >
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">Product Price</label>
                <input 
                    type="number" 
                    class="form-control" 
                    v-model="product.price"
                    aria-describedby="emailHelp" 
                    placeholder="Product Price"
                >
            </div>

            <button 
                type="submit" 
                class="btn btn-primary"
            >Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            product: {
                name: '',
                price: ''
            }
        }
    },
    methods: {
        submitFormProduct() {
            this.$emit('submit-product', this.product)
        }
    },
}
</script>

<style>

</style>
