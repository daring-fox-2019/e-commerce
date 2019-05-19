<template>
  <div>
    <div v-if="items.length === 0">
        Stock is Empty
        {{isAdmin}}
    </div>
    <div v-if="items.length = 0">
        Stock is Ready
    </div>
  </div>
</template>

<script>
export default {
  name: 'listitems',
  props: ['isAdmin', 'items'],
  data: function () {
    return {

    }
  },
  mounted () {

  }
}
</script>
