<template>
  <div class="container d-flex justify-content-center">
    <div class="col-md-5 login-form-1" style="margin-top:100px">
      <h2>tumbass</h2>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Your Email *" value="" required/>
        </div>
        <div class="form-group">
          <input  type="password" class="form-control" placeholder="Your Password *" value="" required/>
        </div>
        <div class="form-group d-flex justify-content-center">
          <input type="submit" class="btnSubmit" value="Login" />
        </div>
        <div class="form-group" style="text-align:center">
          <label>Not registered yet ?</label>
          <br>
          <router-link to="/register" style="color:black"><h6>Register</h6></router-link>
        </div>
    </div>
  </div>
</template>