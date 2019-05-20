<template>
<div class="card border-0" style="width: 18rem; ">
  <img :src="pic" class="kotak card-img-top" style="width:34vh" alt="...">
  <div class="card-body ">
    <p class="tls card-text ">{{text}}</p>
  </div>
</div>
</template>

<script>
export default {
  props : ['pic', 'text']
}
</script>

<style scoped>
.kotak {
  -webkit-filter: grayscale(100%);
}

.textkotak {
  visibility: hidden;
}

.kotak:hover {
  -webkit-filter: blur(1px);
  filter: blur(1px);
  -moz-filter: grayscale(100%);
}

.tls {
  height: 7rem;
  font-weight: 600;
  font-family: "Lato", sans-serif;
  font-size: 15px;
  letter-spacing: 0.1em;
  text-transform: uppercase
}

</style>
