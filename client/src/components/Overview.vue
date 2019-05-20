<template>
  <div class="container my-2 text-center">
    <h1> Products Overview</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Product Name</th>
          <th scope="col">Description</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <th scope="row">{{index + 1}}</th>
          <td>{{product.productName}}</td>
          <td>{{product.description}}</td>
          <td><a @click="getUpdate(product._id)" href="#"><i class="fas fa-pen"></i></a> |
              <a @click.prevent="getDelete(product._id)" href="#"><i class="fas fa-trash"></i></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    props : ['products'],
    methods: {
        getDelete(id) {
            this.$emit('delete-data', id)
        },
        getUpdate(id) {
          this.$router.push(`/admin/editProduct/${id}`)
        }
    },
    created() {
      this.$emit('fetch-products')
    },
};
</script>

<style>
</style>
