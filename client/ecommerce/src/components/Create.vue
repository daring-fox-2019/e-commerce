<template>
    <div class="container mt-5">
        <h2 style="text-align:center">Add New Item</h2>
        <form v-on:submit.prevent="addItem" class="mt-5 mb-5" enctype="multipart/form-data">
            <div class="form-group">
                <label for="exampleInputEmail1">Title</label>
                <input v-model="newItem.title" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title">
            </div>
           <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea v-model="newItem.description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
             <div class="form-group">
                <label for="exampleFormControlSelect1">Kategori</label>
                <select v-model="newItem.kategori" class="form-control" id="exampleFormControlSelect1">
                <option>Tops</option>
                <option>Pants</option>
                <option>Bags</option>
                <option>Boots</option>
                <option>Shoes</option>
                </select>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Price</label>
                <input v-model="newItem.price" style="width:200px" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Rp.">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Stock</label>
                <input v-model="newItem.stock"  style="width:100px" type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="1" >
            </div>
            <div class="form-group form-check">
                <input v-model="newItem.mainPage" type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Use this item to main page</label>
            </div>
             <div class="form-group">
                <label for="exampleInputEmail1">Upload image</label>
                <br>
                <input type="file" ref="file" v-on:change="handleFileUpload">
            </div>
            <div v-show="alert"  class="alert alert-success" role="alert">
                Add new item Successfully
            </div>
            <button v-show="!alert" type="submit" class="btn btn-primary">Add item</button>
        </form>
    </div>
</template>

<script>
import axios from '../api/server.js'
export default {
    name : 'create',
    data () {
        return {
            newItem : {
                title : null,
                description : null,
                kategori : null,
                mainPage : false,
                price : null,
                stock : null,
                image : ''
            },
            alert : null
        }
    },
    methods : {
        addItem() {
            const formData = new FormData()
            formData.append('title',this.newItem.title)
            formData.append('description',this.newItem.description)
            formData.append('kategori',this.newItem.kategori)
            formData.append('mainPage',this.newItem.mainPage)
            formData.append('price',this.newItem.price)
            formData.append('stock',this.newItem.stock)
            formData.append('image',this.newItem.image)
            axios.post('/items', formData)
            .then( data =>{
                this.alert = true
                this.newItem.title = null
                this.newItem.description = null
                this.newItem.kategori = null
                this.newItem.mainPage = false
                this.newItem.price = null
                this.newItem.stock = null
                this.newItem.image = ''
                setTimeout( () => {
                    this.alert = false
                },2000)
            })
            .catch(err =>{
                console.log(err.message)
            })
        },
        handleFileUpload () {
            this.newItem.image = this.$refs.file.files[0]
        }
    }
}
</script>

<style>

</style>
