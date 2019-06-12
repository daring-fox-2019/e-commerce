<template>
  <div class="container is-fluid">
    <div class="section columns is-centered">
      <div class="box">
        <div class="columns is-variable is-6">
          <div class="column">
            <figure class="image">
              <img :src="imageUrl.replace('https', 'http')" v-if="imageUrl"/>
            </figure>
          </div>
          <div class="column">
            <p class="title">{{name}}</p>
            <p class="has-text-danger is-size-4 has-text-weight-bold mbl">Rp {{price}}</p>
            <p class="has-text-grey mbl">in stock &middot; {{stock}}</p>
            <p class="mbs">Amount</p>
            <div class="level">
              <div class="level-left">
                <button
                  class="button is-small"
                  @click="amount--"
                  :disabled="amount <= 1"
                >
                  <i class="fas fa-minus"></i>
                </button>
                  <p class="is-size-5 mhm">{{amount}}</p>
                <button
                  class="button is-small"
                  @click="amount++"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <div class="buttons mtl">
              <template v-if="userId === seller._id">
                <button
                  class="button is-outlined is-danger"
                  @click="onClickDelete"
                >Delete</button>
                <button
                  class="button is-danger"
                  @click="onClickEdit"
                >Edit</button>
              </template>
              <template v-else>
                <button
                  class="button is-outlined is-danger"
                  @click="onClickBuy"
                >Buy</button>
                <button
                  class="button is-danger"
                  @click="onClickAdd"
                >Add to cart</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

import api from '../api.js'

export default {
  name: 'ItemPageDetail',
  props: {
    token: String,
    userId: String
  },
  data: function () {
    return {
      id: '',
      imageUrl: '',
      name: '',
      price: 0,
      amount: 1,
      stock: 0,
      seller: {}
    }
  },
  created: function () {
    api
      .fetchItem(this.$route.params.itemId)
      .then(({ data }) => {
        this.id = data.item._id
        this.imageUrl = data.item.imageUrl
        this.name = data.item.name
        this.price = data.item.price
        this.stock = data.item.stock
        this.seller = data.item.seller
      })
      .catch(err => console.log(err))
  },
  methods: {
    onClickAdd: function () {
      api
        .addItem(this.id, this.token)
        .then(() => {
          this.$alertify
            .success('Successfully adding item into your cart')
            .delay(2)
        })
        .catch(err => console.log(err.response))
    },
    onClickBuy: function () {
      api
        .clearCart(this.token)
        .then(() => {
          return Promise.all(
            Array.from(
              Array(this.amount),
              el => api.addItem(this.id, this.token)
            )
          )
        })
        .then(() => {
          this.$router.push('/cart')
        })
        .catch(err => console.log(err))
    },
    onClickDelete: function () {
      this.$alertify
        .confirmWithTitle(
          'Are you sure?',
          'This action can\'t be reverted',
          () => {
            api
              .deleteItem(this.id, this.token)
              .then(({ data }) => {
                this.$alertify.success('Item successfully deleted', data.item._id)
                this.$router.push('/')
              })
              .catch(err => console.log(err))
          }
        )
    },
    onClickEdit: function () {
      this.$router.push(`/item/edit/${this.id}`)
    }
  }
}
</script>

<style scoped>
img {
  border: 1px solid #dbdbdb;
}
.box {
  padding: 32px;
  max-width: 960px;
}
</style>
