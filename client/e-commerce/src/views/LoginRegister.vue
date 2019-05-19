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
        <b-col class="col" v-if="showregister" style="border:lightgrey medium solid; padding:10px;">
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
            v-model="emailregister"
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
            v-model="passwordregister"
              type="password"
              class="form-control"
              id="passwordregister"
              placeholder="Password"
            >
          </div>
          <div>
            <br>
            <button type="button" @click="register" class="btn btn-outline-secondary btn-md btn-block">Register</button>
          </div>
          <br>
        </b-col>
        <b-col class="col-1" v-if="showregister"></b-col>
<!-- Batas Kolom -->
        <b-col class="col" style="border:grey medium solid; padding:10px;">
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
              v-model="emaillogin"
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
              v-model="passwordlogin"
              type="password"
              class="form-control"
              id="passwordlogin"
              placeholder="Enter password"
            >
          </div>
          <div>
            <br>
            <button type="button" @click="login" class="btn btn-primary btn-md btn-block">Login</button>
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
      passwordregister: '',
      showregister : true
    }
  },
  mounted () {},
  methods: {
    login () {
      this.$emit('login', { isLogin: true, userId: 'aloha' })
      this.$router.push('/')
    },
    register () {
      this.$swal('Account Created', `Successfully created account ${this.emailregister}`, 'success')
      this.emaillogin = this.emailregister
      this.emailregister = ''
      this.passwordregister = ''
      this.showregister = false;
    }
  }
}
</script>
