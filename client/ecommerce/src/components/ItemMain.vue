<template>
    <div>
    <div class="col-6" >
        <img
          v-bind:src="item.image"
          style="width:600px; height:600px"
          class="img-fluid"
          alt
        >
        </div>
        <div class="col-6">
          <div class="container">
            <h1 class="display-4">{{ item.title }}</h1>
            <p class="lead">
              {{ item.description }}  
            </p>
            <footer class="blockquote-footer"><h3>Rp. {{ item.price }}</h3></footer>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'item-main',
    props : ['item'],
}
</script>

<style>

</style>
