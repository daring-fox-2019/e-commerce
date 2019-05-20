<template>
    <div>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Stock</th>
      <th scope="col">Price</th>
      <th scope=col>Description</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(gundam, index) in gundams" :gundam="gundam" :key="index">
      <th scope="row">{{index + 1}}</th>
      <td><img :src="gundam.image" alt="product photo" width="40" height="60"></td>
      <td>{{gundam.name}}</td>
      <td>{{gundam.stock}}</td>
      <td>{{gundam.price}}</td>
      <td>{{gundam.description}}</td>
      <td>
          
          <button @click.prevent="ubah(gundam._id)" class="pa-2 btn btn-primary">update</button>
          <button @click.prevent="hapus(gundam._id)" class="pa-2 btn btn-primary">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
    </div>
</template>

<script>
export default {
    props : ['gundams'],
    methods: {
        hapus(id){
            this.$emit('hapus', id)

        },
        ubah(id){
            this.$emit('ubah', id)
            this.$router.push('/admin/update')

        }
    }
}
</script>

