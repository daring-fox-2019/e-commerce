<template>
  <div>
    Home<br>
    Login Status : {{isLogin}}<br>
    User Login : {{userId}}
    <div>
      <img style="max-width: 100%; height: aut0;" src="http://4.bp.blogspot.com/-fi7yRHc_Dy8/UUnAikYjIMI/AAAAAAAAADY/IcjlPdSMv3U/s1600/Jewelry+Store.jpg.jpg" alt="">
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
