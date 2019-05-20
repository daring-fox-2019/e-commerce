<template>
  <div class="px-3 py-3  card">
  <div class="card-body">
    <h5 class="titlesingle card-title">{{category.name}}</h5>
    <span class="titlesingle2 card-text d-flex align-self-end">{{category.description}}</span>
    
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
.titlesingle {
  height: 7rem;
  font-family: "Vollkorn", serif;
  font-weight: 600;
  font-size: 50px;
}

.titlesingle2 {
  height: 2rem;
  font-family: "Times", serif;
  font-weight: 100;
  font-size: 17px;
  font-variant-ligatures: discretionary-ligatures;
  
}
</style>
