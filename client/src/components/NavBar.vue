<template>
  <div class="topnav fixed-top d-flex justify-content-center">
    <div class="col-4 d-flex">
      <router-link to="/" class="active"><span><h3>tumbass</h3></span></router-link> 
    </div>
    <div class="col-4">
      <div style="height:50%; margin-top:20px" class="ml-5 mr-5">
    <input type="text" placeholder=" search items..." style="width:100%">
    </div>
    </div>
    <div class="col-4">
      <router-link to="/login" class="ml-5 mt-2"><i class="fas fa-user"></i> username</router-link>
    <router-link to="/" class="ml-5 mt-2"><i class="fas fa-shopping-cart"> ( 0 items )</i></router-link>
    </div>
  </div>
</template>