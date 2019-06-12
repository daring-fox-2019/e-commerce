<template>
  <div class="container is-fluid">
    <div class="columns is-variable is-2">
      <div
        class="column is-one-fifth"
        v-for="item in items"
        :key="item._id"
        @click="onClickItem(item._id)"
      >
        <div class="has-background-white">
          <figure class="image is-5by4">
            <img :src="item.imageUrl.replace('https', 'http')"/>
          </figure>
          <p class="has-text-weight-bold is-size-5">{{item.name}}</p>
          <p class="has-text-danger">Rp {{item.price}}</p>
          <p class="has-text-grey">{{item.seller.email}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemTiles',
  props: {
    items: Array
  },
  methods: {
    onClickItem: function (itemId) {
      this.$router.push(`/item/${itemId}`)
    }
  }
}
</script>

<style scoped>
.has-background-white {
  border: 1px solid #efefef;
  padding: 8px;
}
.has-background-white:hover {
  box-shadow: 0 2px 4px 0 #dbdbdb, 0 4px 8px 0 #dbdbdb;
  cursor: pointer
}
.container {
  margin-top: 32px;
}
</style>
