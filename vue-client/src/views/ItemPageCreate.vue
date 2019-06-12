<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column">
          <ItemFormCreate :token="token"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemFormCreate from '../components/ItemFormCreate.vue'

export default {
  name: 'ItemPageCreate',
  props: {
    token: String
  },
  components: {
    ItemFormCreate
  }
}
</script>

<style>

</style>
