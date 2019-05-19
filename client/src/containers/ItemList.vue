<template>
  <div class="d-flex justify-content-center row">
    <div v-for="item in items" :key="item.name">
      <ItemCard :item="item" />
    </div>
  </div>
</template>

<script>
  import ItemCard from '@/components/ItemCard.vue'

  export default {
    name : 'ItemList',
    components : {
      ItemCard
    },
    data () {
      return {
        items: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          },
          {
            id: 4
          },
          {
            id: 5
          },
          {
            id: 6
          },
          {
            id: 7
          },
        ]
      }
    },
    methods: {

    }
  }
</script>