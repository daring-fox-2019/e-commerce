<template>
  <div class="container d-flex justify-content-center">
    <div class="col-md-5 login-form-1" style="margin-top:100px">
      <h2>tumbass</h2>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Your Name *" value="" />
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Your Email *" value="" />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Your Password *" value="" />
        </div>
        <div class="form-group" style="text-align:center">
          <label>Choose your profile picture :</label>
          <input v-on:change="setProfilePic()" ref="myPic" type="file" class="form-control-file input-sm mb-3 border" id="exampleFormControlFile1">
          <!-- <input v-model="newUser.profilePic" type="text" class="form-control" placeholder="Your Profile Picture Url *" value="" /> -->
        </div>
        <div class="form-group d-flex justify-content-center">
          <input v-on:click.prevent="register" type="submit" class="btnSubmit" value="Register" />
        </div>
        <div class="form-group d-flex justify-content-center">
          <router-link to="/login" style="color:black">Back to login screen</router-link>
        </div>
    </div>
  </div>
</template>