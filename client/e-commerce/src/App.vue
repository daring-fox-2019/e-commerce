<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
      integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
      crossorigin="anonymous"
    >
    <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css" integrity="sha256-gVCm5mRCmW9kVgsSjQ7/5TLtXqvfCoxhdsjE6O1QLm8=" crossorigin="anonymous" />

    <div>
      <Header></Header>
    </div>
    <router-view/>
    <Footer/>
  </div>
</template>

<style>
  a {
    text-decoration: 'none' !important;
  }
  a:hover {
    text-decoration: 'none';
  }
  body {
    font-family: "Quicksand", sans-serif !important;
  }
  button {
    border-radius: 0px !important;
  }
  .card {
    border-radius: 0px !important;
  }
  input {
    border-radius: 0px !important;
  }
  img {
    border-radius: 0px !important;
  }
</style>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer'
import { mapState } from 'vuex';

export default {
  components: {
    Header,
    Footer
  },
  created() {
    if (localStorage.getItem('token')) {
      this.$store.commit('setIsLogin', true);
      this.$store.commit('setRole')
    }
  },
};
</script>
