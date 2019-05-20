<template>
  <div id="loginModal" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- dialog body -->
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h5 class="mt-5">LOGIN</h5>
          <small class="text-muted">You can use your account to log in and purchase our products</small>
        </div>
        <!-- dialog buttons -->
        <div class="modal-body">
          <div class="form-group row">
            <div class="col-sm-12">
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="email"
                placeholder="Email"
              >
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-12">
              <input
                v-model="password"
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
              >
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button
            data-dismiss="modal"
            type="button"
            class="btn btn-success mt-4"
            @click.prevent="login"
          >Submit</button>
        </div>
        <h6 class="text-center pt-3">
          Don't have an account yet?
          <a
            href
            data-toggle="modal"
            data-target="#registerModal"
            data-dismiss="modal"
          >
            <b>Register</b>
          </a>
        </h6>
        <label class="container text-center"> I am Admin 
          <input type="checkbox" checked="checked">
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/localhost.js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password
      };

      axios
        .post(`/users/signIn`, user)
        .then(({ data }) => {
          console.log(data);
          this.$swal(
            'Login Success!',
            'Welcome!',
            'success'
          );
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.details.email);
          localStorage.setItem("id", data.details.id);
          localStorage.setItem("role", data.details.role);
          console.log(data,'=');
          
          this.$router.push("/home");
          this.$emit("success-login");
          this.clearState();
        })
        .catch(err => {
          console.log(err.message);
          this.$swal('Oops','Username/password is incorrect', 'warning')
        });
    },
    clearState() {
      (this.email = ""), (this.password = "");
    }
  }
};
</script>

<style scoped>
.btn {
  width: 200px;
}

h5 {
  font-weight: 700;
  font-family: "Paytone One", sans-serif;
}
</style>
