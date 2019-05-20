<template>
    <div>

    <h3> Update Product </h3>
    <form method='post' @submit.prevent="ubah(edit.id)">

        <div class="form-group">
            <label for="exampleInputEmail1">Name Product</label>
            <input v-model="edit.name" required  type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product">
        </div>
        
          <div class="form-group">
            <label for="exampleInputEmail1">Price</label>
            <input v-model="edit.price" required  type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Price">
        </div>

        <div class="form-group">
            <label for="exampleInputPassword1">Stock</label>
            <input v-model="edit.stock" required type="number" class="form-control" id="exampleInputPassword1" placeholder="Enter Stock">
        </div>

        <div class="form-group">
            <label>Description</label>
           <textarea v-model="edit.description" required class="form-control" placeholder="Enter Desc.."></textarea>
        </div>

        <div class="mb-3">Choose Image: {{ file ? file.name : '' }}
            <b-form-file v-model="edit.file" :state="Boolean(file)" placeholder="Choose a file..." drop-placeholder="Drop file here..."></b-form-file>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <router-link to="/admin/list">
            Back to list
        </router-link>
    </form>
    </div>
</template>

<script>
export default {
    props: ['edit'],
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
        ubah(id){
            this.$emit('ganti', id)

        }
    }
    
}
</script>
