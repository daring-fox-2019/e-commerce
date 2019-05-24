<template>
    <b-row class="d-flex justify-content-between align-items-center">
        <b-col cols=1 class="border px-1 justify-content-end d-flex py-1">
            {{index+1}}
        </b-col>
        <b-col cols=4 class="border py-1">
            {{product.name}}
        </b-col>
        <b-col cols=3 class="border py-1">
            {{product.stock}}
        </b-col>
        <b-col cols=2 class="border py-1">
            <b-row>
              <b-col cols=2 class="px-1">
                Rp
              </b-col>
              <b-col class="px-1 text-right">
                  {{product.price}}
              </b-col>
            </b-row>
        </b-col>
        <b-col cols=2 class="border">
            <b-row class="py-0 px-2 d-flex justify-content-end">
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
        confirmButtonText: 'Yes, delete it!',
      })
        .then((result) => {
          if (result.value) {
            this.$store.dispatch('deleteProductInformation', id);
          }
        });
    },
  },

  computed: {

  }
};
</script>

<style>
</style>
