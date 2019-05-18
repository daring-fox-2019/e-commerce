<template>
  <div></div>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    axios.get('http://localhost:3000/cart')    
  },
};
</script>