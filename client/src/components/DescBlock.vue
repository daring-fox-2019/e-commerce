<template>
  <div class="px-3 py-3  card">
  <div class="card-body">
    <h5 class="card-title">{{category.name}}</h5>
    <span class="card-text d-flex align-self-end">{{category.description}}</span>
    
  </div>
</div>
</template>

<script>
import Chips from "@/components/Chips"

export default {
    name : 'DescBlock',
    props : ['category'],
    components : {
        Chips
    }, data() {
      return {
        
      }
    },
}
</script>

<style>

</style>
