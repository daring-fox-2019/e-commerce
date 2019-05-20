<template>
    <b-row class="border d-flex justify-content-between align-items-center">
        <b-col cols=1 class="border px-1 justify-content-end d-flex">
            {{index+1}}
        </b-col>
        <b-col cols=4 class="border">
            {{product.name}}
        </b-col>
        <b-col cols=3 class="border">
            {{product.stock}}
        </b-col>
        <b-col cols=2 class="border">
            {{product.price}}
        </b-col>
        <b-col cols=2 class="border">
            <b-row>
                <div class="m-1" @click="editProductInformation(product._id)"><a href="#"><i class="far fa-edit"></i></a></div>
                <div class="m-1" @click="deleteProductInformation(product._id)"><a href="#"><i class="far fa-trash-alt"></i></a></div>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
export default {
  name: 'product-list-card',
  props: ['product', 'index'],
  methods: {
      deleteProductInformation(id) {
        this.$swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.value) {
            this.$store.dispatch('deleteProductInformation', id)
            }
        })

      }
  }
};
</script>

<style>
</style>
