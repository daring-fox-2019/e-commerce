<template>
<div id="page" >
<div class="top-navbar">
    <nav id="nav" class="navbar navbar-light d-flex justify-content-between">
      <b><h5 style="font-family: 'Fugaz One',serif">JajanMas</h5></b>
      <!-- <b-nav-form>
      <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
      <b-button variant="outline-danger" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form> -->
      <div class="d-flex">
      <!-- <a href="" class="mr-3"></a> -->
      <!-- <a href="" class="mr-3">Account</a> -->
      <!-- <b-button variant="success" @click="addProduct" class="mr-5">jual Barangmu!</b-button> -->
      <a href="" class="mr-3">Account</a>
      <a href=""><i class="fas fa-shopping-cart mr-3"></i></a>
      <router-link to="/login" class="mr-3"><i class="fas fa-sign-out-alt"></i></router-link>
      </div>
    </nav>
</div>
    <div class="jumbotron" style="background: none">
        <h1>Product Upload</h1>
        <b-card class="col-6 offset-3" style="text-align : left">
             <form @submit.prevent="createProduct">
                <div class="form-group">
                    <label for="title">Title:</label>
                    <input v-model="title" type="text" class="form-control" id="title">
                </div>
                <div class="form-group">
                    <label for="location">Location:</label>
                    <input v-model="location" type="text" class="form-control" id="location">
                </div>
                <div class="form-group">
                    <label for="desc">Description:</label>
                    <textarea v-model="description" class="form-control" id="description"></textarea>
                </div>
                <div class="form-group">
                    <label for="file">Image: </label>
                    <input type="file" @change="onFileChange" id="image">
                </div>
                <div class="form-group">
                    <label for="file">price: </label>
                    <input v-model="price" type="number" step="100" id="price">
                </div>
                <div class="form-group">
                    <label for="file">stock: </label>
                    <input v-model="stock" type="number" step="1" id="stock">
                </div>
                <div id="preview">
                    <img v-if="url" :src="url">
                </div>
                <!-- <div class="checkbox">
                    <label><input type="checkbox"> Remember me</label>
                </div> -->
                <button type="submit" class="btn btn-success">Submit</button>
            </form> 
        </b-card>
    </div>
</div>
</template>

<script>
import navbar from '@/components/navbar.vue'
import swal from 'sweetalert2'

export default {
    name: 'addProduct',
    data(){
        return {
            url : null,
            title: '',
            location: '',
            description: '',
            image: '',
            price: 0,
            stock: 0
        }
    },
    components : {
        navbar
    },
    methods : {
        onFileChange(e){
            const file = e.target.files[0]
            this.image = file
            this.url =  URL.createObjectURL(file)
            // console.log(this.image);
            
            // console.log('file',file);
            // console.log('URL',this.url);
        },
        createProduct(){
            let formData = new FormData()
            formData.append('image',this.image)
            formData.append('title',this.title)
            formData.append('description',this.description)
            formData.append('location',this.location)            
            formData.append('price',this.price)
            formData.append('stock',this.stock)
            // console.log('mau create',this.image);

            axios({
                method : 'post',
                url : "http://localhost:3000/products",
                data : formData,
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data);
                this.title = ''
                this.description = '',
                this.location = '',
                this.price = 0,
                this.stock = 0
                this.image = ''
                Swal.fire('product succesfully posted!','','success')
                this.$router.push('/') 
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }
}
</script>


<style>

    #preview {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #preview img {
        max-width: 50%;
        max-height: 500px;
    }
</style>
