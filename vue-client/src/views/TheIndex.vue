<template>
  <div class="container is-fluid">
    <ItemTiles
      :items="items"
      v-if="items.length"
    />
    <div
      class="level"
      v-else
    >
      <div class="message is-warning mtl">
        <p class="message-body">
          No item to display yet, please comeback later.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api.js'

import ItemTiles from '../components/ItemTiles'

export default {
  name: 'TheIndex',
  components: {
    ItemTiles
  },
  data: function () {
    return {
      items: []
    }
  },
  created: function () {
    api
      .fetchItems()
      .then(({ data }) => {
        this.items = data.items
      })
      .catch(err => console.log(err))
  }
}
</script>

<style>

</style>
