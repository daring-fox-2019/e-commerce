<template>
  <div class="home">
    <div class="mb-5">
    <NavBar/>
    </div>
    <div class="mt-5 mb-5 d-flex justify-content-center">
      <div class="col-10 mt-5">
        <Carrousel/>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <div class="col-8 border">
        <ItemList/>
      </div>
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'
import Carrousel from '@/components/Carrousel.vue'
import ItemList from '@/containers/ItemList.vue'

export default {
  name: 'home',
  components: {
    NavBar,
    Carrousel,
    ItemList,
    // HelloWorld
  }
}
</script>
