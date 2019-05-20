<template>
  <div class="box">
    <div
      class="media"
      v-for="item in items"
      :key="item._id"
    >
      <figure class="media-left image is-128x128">
        <img :src="baseUrl + item.imageUrl"/>
      </figure>
      <div class="media-content has-text-weight-bold is-size-5">
        <p>{{item.name}}</p>
        <p class="has-text-danger">Rp {{item.price}}</p>
      </div>
      <div class="media-right">
        <div class="buttons">
          <button
            class="button is-text is-medium has-text-grey-light"
            @click="onClickRemoveAll(item)"
          >
            <i class="fas fa-trash"></i>
          </button>
          <div class="level mls">
            <div class="level-left">
              <button
                class="button"
                :disabled="item.count <= 1"
                @click="onClickRemove(item._id)"
              ><i class="fas fa-minus"></i></button>
              <span class="mhm is-size-5">{{item.count}}</span>
              <button
                class="button"
                :disables="item.count >= item.stock"
                @click="onClickAdd(item._id)"
              ><i class="fas fa-plus"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api.js'

export default {
  name: 'ItemList',
  props: {
    items: Array,
    token: String
  },
  data: function () {
    return {
      baseUrl: 'http://localhost:3000/'
    }
  },
  methods: {
    onClickRemove: function (itemId) {
      api
        .removeItem(itemId, this.token)
        .then(({ data }) => {
          this.$emit('update-cart', data.cart)
        })
        .catch(err => console.log(err))
    },
    onClickAdd: function (itemId) {
      api
        .addItem(itemId, this.token)
        .then(({ data }) => {
          this.$emit('update-cart', data.cart)
        })
        .catch(err => console.log(err))
    },
    onClickRemoveAll: function (item) {
      this.$alertify
        .confirmWithTitle(
          'are you sure?',
          'This action can\'t be reverted',
          () => {
            Array.from(Array(item.count))
              .reduce(
                (chain, curr) => chain
                  .then(
                    () => api.removeItem(item._id, this.token)
                  ),
                  Promise.resolve()
              )
              .then(() => {
                this.$emit('remove-all', item._id)
              })
              .catch(err => console.log(err))
          }
        )
    }
  }
}
</script>

<style scoped>
img {
  border: 1px solid #dbdbdb;
}
.level-left .button {
  margin: 0 !important;
}
</style>
