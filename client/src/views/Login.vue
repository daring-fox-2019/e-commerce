<template>
  <div class="container my-4" v-if="!isLogin">
    <div class="card bg-light">
      <article class="card-body mx-auto" style="max-width: 400px;">
        <h4 class="card-title mt-3 text-center">LOGIN</h4>
        <p>
          <a class="btn btn-block btn-google">
            <i class="fab fa-google"></i> Login via Google
          </a>
          <a class="btn btn-block btn-facebook">
            <i class="fab fa-facebook-f"></i> Login via facebook
          </a>
        </p>
        <p class="divider-text">
          <span class="bg-light">OR</span>
        </p>

        <form @submit.prevent="loginManual">
          <!-- form-group// -->
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-envelope"></i>
              </span>
            <input v-model="email" class="form-control" placeholder="Email address" type="email">
            </div>
          </div>
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-lock"></i>
              </span>
            <input v-model="password" class="form-control" placeholder="password" type="password">

            </div>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Login</button>
          </div>
          <!-- form-group// -->
          <p>
            Don't have an Account!
            <router-link :to="'/register'">Sign Up Here</router-link>
          </p>
        </form>
      </article>
    </div>
    <!-- card.// -->
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import ServerApi from '@/api/serverapi';
import { mapState } from 'vuex'
 
export default {
   computed : {
      ...mapState([
        'authors',
        'isLogin',
        'cart',
      ])
    },
  data() {
    return {
      password: '',
      email: '',
    };
  },
  methods: {
    loginManual() {
      ServerApi
        .post('/users/login', {
          email: this.email,
          password: this.password,
        })
        .then((user) => {
          localStorage.setItem('token', user.data.token)
          localStorage.setItem('id', user.data.id)
          localStorage.setItem('name', user.data.name)
          localStorage.setItem('email', user.data.email)
          this.$store.commit('userLogin')
          this.$router.push('/')
          Swal.fire({
            position: 'center',
            type: 'success',
            title: `welcome ${user.data.name}`,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'username/password wrong!',
            footer: '<a href>forget username/password?</a>',
          });
        });
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
.btn-google {
  background-color: #C94131;
  color: #fff;
}
</style>
