<template>
  <div>
    Product<br>
    Login Status : {{isLogin}}<br>
    User Login : {{userId}}
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: [ 'isLogin', 'userId'],
  data: function () {
    return {

    }
  }
}
</script>
