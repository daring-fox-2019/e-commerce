<template>
  <div id="app">
    <v-app dark>
      <Header/>
      <v-content >
        <v-container fill-height id="container">
          <v-layout justify-center>
            <v-flex>
              <router-view/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <Footer/>
    </v-app>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
  },
};
</script>
<style>
#container{
  padding-top:0;
}
#app {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
</style>
