<template>
  <div>
    history<br>
    Login Status : {{isLogin}}<br>
    User Login : {{userId}}
  </div>
</template>

<script>
export default {
  name: 'History',
  props: [ 'isLogin', 'userId'],
  data: function () {
    return {

    }
  },
  mounted () {

  }
}
</script>
