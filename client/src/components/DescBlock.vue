<template>
    <!-- <div class="card p-3">
    <blockquote class="blockquote mb-0 card-body">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
      <footer class="blockquote-footer">
        <small class="text-muted">
          Someone famous in <cite title="Source Title">Source Title</cite>
        </small>
      </footer>
    </blockquote>
  </div> -->

  <div class="px-3 py-3  card" style="display : flex; flex-direction:column; justify-content:between">
  <div class="card-body">
    <h5 class="card-title">{{category.name}}</h5>
    <span class="card-text d-flex align-self-end">{{category.description}}</span>
    <Chips></Chips>
    <Chips></Chips>
    <Chips></Chips>
    
    <span class="d-flex align-self-end"> Shop All *Category Name*</span>
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
