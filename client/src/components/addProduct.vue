<template>
  <div class="container p-3">
    <h1 class="text-center">ADD PRODUCT</h1>
    <form enctype='multipart/form-data' >
      <div class="form-group">
        <label>Title:</label>
        <input 
        v-model="title" 
        type="text" 
        class="form-control">
      </div>
      <div class="form-group">
        <label>Descripstion:</label>
        <textarea 
        v-model="description" 
        type="text" 
        class="form-control" ></textarea>
      </div>
      <div class="form-group">
        <label>Stock:</label>
        <input 
        v-model="stock" 
        type="number" 
        class="form-control">
      </div>
      <div class="form-group">
        <label>Price:</label>
        <input
        v-model="price"  
        type="number" 
        class="form-control">
      </div>
      <div class="custom-file p-4">
        <input
        v-on:change="getImage" 
        ref="image"
        type="file" 
        class="custom-file-input" 
        lang="in">
        <label class="custom-file-label" for="customFileLang">Image</label>
      </div>
      <button 
      v-on:click.prevent="addProduct"
      type="submit" 
      class="btn btn-primary">Simpan</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
export default {


  data () {
    return {
      valid: true,
      title: '',
      description: '',
      stock: '',
      price: '',
      image: ''
    }
  },
  methods: {
    reset () {
      this.$refs.form.reset()
    },
    getImage () {
      this.image = this.$refs.image.files[0]
    },
    addProduct () {
      let fd = new FormData()
      fd.append('title', this.title)
      fd.append('description', this.description)
      fd.append('price', this.price)
      fd.append('stock', this.stock)
      fd.append('image', this.image)

      this.$emit('add-product', fd)
      this.$router.push({ path: `/listProduct` });
      
    }
  }
}
</script>

<style>
</style>
