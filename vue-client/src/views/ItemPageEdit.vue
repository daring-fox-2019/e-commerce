<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column">
          <ItemFormCreate :token="token" :item="item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api.js'

import ItemFormCreate from '../components/ItemFormCreate.vue'

export default {
  name: 'ItemPageEdit',
  props: {
    token: String
  },
  data: function () {
    return {
      item: {}
    }
  },
  created: function () {
    api
      .fetchItem(this.$route.params.itemId)
      .then(({ data }) => {
        this.item = data.item
      })
      .catch(err => console.log(err))
  },
  components: {
    ItemFormCreate
  }
}
</script>

<style>

</style>
