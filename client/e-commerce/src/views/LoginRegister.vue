<template>
  <div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <b-container>
      <b-row class="row" style="justify-content: space-between;">
        <b-col class="col-5" style="border:lightgrey medium solid; padding:10px;">
          <br>
          <br>
          <center>
            <h3>Register</h3>
          </center>
          <br>
          <br>
          <div class="form-group">
            <label for="emailregister">Email address</label>
            <input
              type="email"
              class="form-control"
              id="emailregister"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            >
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>
          <br>
          <br>
          <div class="form-group">
            <label for="passwordregister">Password</label>
            <input
              type="password"
              class="form-control"
              id="passwordregister"
              placeholder="Password"
            >
          </div>
          <div>
            <br>
            <button type="button" class="btn btn-outline-secondary btn-md btn-block">Register</button>
          </div>
          <br>
        </b-col>

        <b-col class="col-5" style="border:grey medium solid; padding:10px;">
          <br>
          <br>
          <center>
            <h3>Login</h3>
          </center>
          <br>
          <br>
          <div class="form-group">
            <label for="emaillogin">Email address</label>
            <input
              type="email"
              class="form-control"
              id="emaillogin"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            >
          </div>
          <br>
          <br>
          <br>
          <div class="form-group">
            <label for="passwordlogin">Password</label>
            <input
              type="password"
              class="form-control"
              id="passwordlogin"
              placeholder="Enter password"
            >
          </div>
          <div>
            <br>
            <button type="button" class="btn btn-primary btn-md btn-block">Login</button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'LoginRegister',
  props: ['isLogin', 'userId'],
  data: function () {
    return {
      emaillogin: '',
      passwordlogin: '',
      emailregister: '',
      passwordregister: ''
    }
  },
  mounted () {},
  watch: {}
}
</script>
