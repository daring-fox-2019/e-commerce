<template>
  <div class="row">
    <tr>
      <td class="col-sm-8 col-md-6">
        <div class="media">
          <a class="thumbnail pull-left">
            <img
              class="media-object"
              :src="keranjang.items[0].image_url"
              style="width: 72px; height: 72px;"
            >
          </a>
          <div class="media-body">
            <h4 class="media-heading">
              <a >{{ keranjang.items[0].name }}</a>
            </h4>
            <h5 class="media-heading">
              by
              <a >{{  }}</a>
            </h5>
            <span>Status:</span>
            <span class="text-success">
              <strong>In Stock</strong>
            </span>
          </div>
        </div>
      </td>
      <td class="col-sm-1 col-md-1" style="text-align: center">
        <input type="email" class="form-control" id="exampleInputEmail1" value="1">
      </td>
      <td class="col-sm-1 col-md-1 text-center">
        <strong>Rp. {{ keranjang.items[0].price  }}</strong>
      </td>
      <td class="col-sm-1 col-md-1 text-center">
        <strong>{{ }}</strong>
      </td>
      <td class="col-sm-1 col-md-1">
        <button @click.prevent="removeItem(keranjang._id)" type="button" class="btn btn-danger">
          <span class="glyphicon glyphicon-remove"></span> Remove
        </button>
      </td>
    </tr>
  </div>
</template>

<script>
import serverapi from "@/api/serverapi";

export default {
    props: ['keranjang'],
    methods: {
      removeItem(id) {
        this.$emit('methodDariCart', id)
      },
    },
}
</script>
