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
            <p>New to Us?</p>
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
            <p>Have an account?</p>
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
      showregister: true
    }
  },
  mounted () {},
  methods: {
    login () {
      this.$axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
          email: this.emaillogin,
          password: this.passwordlogin
        }
      })
        .then(({ data }) => {
          this.emaillogin = ''
          this.passwordlogin = ''
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', data._id)
          localStorage.setItem('email', data.email)
          this.$emit('login', { isLogin: true, userId: data._id, cart: data.cart })
          this.$router.push('/')
        })
        .catch(err => {
          this.$swal('Error', err.response.data.message, 'error')
          console.log(err.response)
        })
    },
    register () {
      console.log('register')
      let re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (this.emailregister.length >= 8 &&
      re.test(this.emailregister.toLowerCase()) === true &&
      this.emailregister !== '') {
        this.$axios({
          method: 'post',
          url: 'http://localhost:3000/register',
          data: {
            email: this.emailregister,
            password: this.passwordregister,
            cart: []
          }
        })
          .then(({ data }) => {
            this.$swal('Account Created', `Successfully created account ${this.emailregister}`, 'success')
            this.emaillogin = this.emailregister
            this.emailregister = ''
            this.passwordregister = ''
            this.showregister = false
          })
          .catch(err => {
            this.$swal('Error', err.response.data.message, 'error')
          })
      } else {
        let evalid = true
        let pvalid = true
        if (this.passwordregister.length < 8) {
          pvalid = false
        }
        if (re.test(this.emailregister.toLowerCase()) === false) {
          evalid = false
        }
        let message = 'Error : '
        if (pvalid === false) {
          message += '\n\n   **password must be 8 character or more** '
        }
        if (evalid === false) {
          message += '\n\n   **please input a valid email address** '
        }
        this.$swal('Error', message, 'error')
      }
    }
  }
}
</script>
