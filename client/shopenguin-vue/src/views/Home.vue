<template>
  <div class="home">
    <Navbar1/>
    <Navbar2/>
    <ItemCard/>

    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "@/api/axios";
import Swal from "sweetalert2";

import HelloWorld from "@/components/HelloWorld.vue";
import Navbar1 from "@/components/Navbar1.vue";
import Navbar2 from "@/components/Navbar2.vue";
import ItemCard from "@/components/ItemCard.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Navbar1,
    Navbar2,
    ItemCard
  },
};
</script>
