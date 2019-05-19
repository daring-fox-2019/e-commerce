<template>
  <div>
    <div style="position:relative;width: 100%; height: 100%;">
      <img style="max-width: 100%; height:auto;" src="https://media.timeout.com/images/101828539/image.jpg" alt="">
      <div style="position: absolute;top: 30%;left: 50%;transform: translate(-50%, -50%);">
        <b-jumbotron style="background-color: rgba(255, 255, 255, 0.6)" header="Lux Jewelries">
        <h1><router-link to="/products">Shop Now</router-link></h1>
        </b-jumbotron>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  props: ['isLogin', 'userId'],
  data: function () {
    return {

    }
  }
}
</script>
