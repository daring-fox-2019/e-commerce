<template>
    <div>

    <h3> Create Product </h3>
    <form method='post' @submit.prevent="build">

        <div class="form-group">
            <label for="exampleInputEmail1">Name Product</label>
            <input v-model="product.name" required  type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product">
        </div>
        
          <div class="form-group">
            <label for="exampleInputEmail1">Price</label>
            <input v-model="product.price" required  type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Price">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Stock</label>
            <input v-model="product.stock" required type="number" class="form-control" id="exampleInputPassword1" placeholder="Enter Stock">
        </div>

        <div class="form-group">
            <label>Description</label>
           <textarea v-model="product.description" required class="form-control" placeholder="Enter Desc.."></textarea>
        </div>

        <div class="mb-3">Choose Image: {{ file ? file.name : '' }}
            <b-form-file v-model="product.file" required :state="Boolean(file)" placeholder="Choose a file..." drop-placeholder="Drop file here..."></b-form-file>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            file: null,
             product: {
                file: null,
                name: '',
                price: '',
                stock: '',
                description: ''
            }
        }
    },
    methods: {
        build(){
            this.$emit('buat', this.product)
            this.product = {
                file: null,
                name: '',
                price: '',
                stock: '',
                description: ''

            }

        }
    }
    
}
</script>
