<template>
  <div
    class="modal fade"
    id="loginmodal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Sign in</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <form >
                  <div class="form-group">
                    <label for="loginEmail">Email address</label>
                    <input
                      v-model="loginEmail"
                      type="email"
                      class="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    >
                  </div>
                  <div class="form-group">
                    <label for="loginPassword">Password</label>
                    <input
                      v-model="loginPassword"
                      type="password"
                      class="form-control"
                      placeholder="Password"
                    >
                  </div>
                  <div class="modal-footer">
                    <button  @click.prevent="login" type="submit" class="mt-2 btn btn-light">Submit</button>
                    <button data-dismiss="modal" type="submit" class="mt-2 btn btn-light">Close</button>
                  </div>
                </form>
              </div>
              <slot></slot>
              <div></div>
            </div>
          </div>
        </div>

        <div class="modal-header">
          <center>
            <h5 class="modal-title" id>Sign Up</h5>
          </center>
        </div>
        <div class="modal-body">
          <button
            data-dismiss="modal"
            data-toggle="modal"
            data-target="#modalregister"
            class="btn btncard"
          >Create An Account</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalRegister from "@/components/ModalRegister";
export default {
  components: { ModalRegister },
  data() {
    return {
      loginEmail: "",
      loginPassword: ""
    };
  },
  created() {
    if (localStorage.getItem('token')) {
        this.isLogin = true
    } 
  },
  methods: {
    login() {
      this.axios
        .post(`/users/login`, {
          email: this.loginEmail,
          password: this.loginPassword
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data._id);
          localStorage.setItem("name", data.name);

          this.swal.fire("Logged in", "Have a nice day", "success");
          this.$emit("loginsuccess");
        })
        .catch(err => {
          this.swal.fire("Error", "Cannot login", "error");
        });
    }
  }
};
</script>

<style>
.btncard {
  background-color: transparent;
  font-size: 12px;
  color: black;
  border-style: 1px solid rgb(233, 233, 233) !important;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.btncard:hover {
  background-color: rgb(230, 230, 230);
}
</style>
