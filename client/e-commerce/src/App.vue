<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
      integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
      crossorigin="anonymous"
    >
    <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">

    <div>
      <Header></Header>
    </div>
    <router-view/>
  </div>
</template>

<style>
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

export default {
  components: {
    Header
  }
};
</script>




