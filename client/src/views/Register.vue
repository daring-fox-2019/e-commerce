<template>
  <div class="container my-4">
    <div class="card bg-light">
      <article class="card-body mx-auto" style="max-width: 400px;">
        <h4 class="card-title mt-3 text-center">Create Account</h4>
        <p class="text-center">Get started with your free account</p>
        <form method="post" @submit.prevent="register">
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-user"></i>
              </span>
            <input
            v-model="name"
            class="form-control"
            placeholder="Full name"
            type="text"
            required>
            </div>
          </div>
          <!-- form-group// -->
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-envelope"></i>
              </span>
            <input
            v-model="email"
            class="form-control"
            placeholder="Email address"
            type="email"
            required>

            </div>
          </div>
          <!-- form-group// -->
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-phone"></i>
              </span>
            <input
            v-model="phone"
            class="form-control"
            placeholder="Phone number"
            type="text"
            required>
            </div>
          </div>
          <!-- form-group// -->
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-building"></i>
              </span>
              <textarea
              v-model="address"
              cols="30"
              rows="3"
              class="form-control"
              placeholder="Address"
              required></textarea>
            </div>
          </div>
          <!-- form-group end.// -->
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-lock"></i>
              </span>
            <input
            v-model="password"
            class="form-control"
            placeholder="Create password"
            type="password"
            required>
            </div>
          </div>
          <!-- form-group// -->
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-lock"></i>
              </span>
            <input
            v-model="confirmpassword"
            class="form-control"
            placeholder="Repeat password"
            type="password"
            required>
            </div>
          </div>
          <!-- form-group// -->
          <div class="form-group">
            <button
            type="submit"
            class="btn btn-primary btn-block"
            >Create Account</button>
          </div>
          <!-- form-group// -->
          <p class="text-center">
            Have an account?
            <router-link :to="'/login'">Log In</router-link>
          </p>
        </form>
      </article>
    </div>
    <!-- card.// -->
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import ServerApi from '../api/serverapi';

export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmpassword: '',
    };
  },
  methods: {
    register() {
      if (this.password === this.confirmpassword){
      ServerApi
        .post('users/signup', {
          name: this.name,
          email: this.email,
          phone: this.phone,
          address: this.address,
          password: this.password,
        })
        .then((newUser) => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your Account has active, Please login',
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push('/login')
          console.log(newUser);
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
          });
          // console.log(err.response);
        });
      }else{
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Your password and confirmation password do not match',
          });
      }
    },
  },
};
</script>

<style>
.divider-text {
  position: relative;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
.divider-text span {
  padding: 7px;
  font-size: 12px;
  position: relative;
  z-index: 2;
}
.divider-text:after {
  content: "";
  position: absolute;
  width: 100%;
  border-bottom: 1px solid #ddd;
  top: 55%;
  left: 0;
  z-index: 1;
}

.btn-facebook {
  background-color: #405d9d;
  color: #fff;
}
.btn-twitter {
  background-color: #42aeec;
  color: #fff;
}
</style>
