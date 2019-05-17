<template>
  <div
    class="modal fade"
    id="modalregister"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Sign Up</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container" style="background: url('./assets/coba.jpg'); padding:30px;">
            <div class="row">
              <div class="col-12">
                <form @submit.prevent="register">
                  <div class="form-group">
                    <label for="registerUsername">Name</label>
                    <input
                      v-model="registerName"
                      type="text"
                      class="form-control"
                      id="registerUsername"
                      aria-describedby="usernameHelp"
                      placeholder="Enter username"
                    >
                  </div>
                  <div class="form-group">
                    <label for="registerEmail">Email address</label>
                    <input
                      v-model="registerEmail"
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    >
                  </div>
                  <div class="form-group">
                    <label for="registerPassword">Password</label>
                    <input
                      v-model="registerPassword"
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    >
                  </div>
                  <div class="modal-footer">
                    <button type="submit" class="mt-2 btn btn-light">Submit</button>
                    <button data-dismiss="modal" type="submit" class="mt-2 btn btn-light">Close</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-header">
          <center>
            <h5 class="modal-title" id>Sign In</h5>
          </center>
        </div>
        <div class="modal-body">
          <button
            data-toggle="modal"
            data-target="#loginmodal"
            class="btn btncard"
            data-dismiss="modal"
          >Already Have an Account</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalRegister",
  data() {
    return {
      registerName: "",
      registerEmail: "",
      registerPassword: ""
    };
  },
  methods: {
    register() {
      console.log("ketrigger");

      this.axios
        .post(`/users`, {
          name: this.registerName,
          email: this.registerEmail,
          password: this.registerPassword
        })
        .then(({ data }) => {
          this.swal.fire("Registered", "You may login now", "success");

             $('#button').submit(function(e) {
                e.preventDefault();
                $('#modalregister').modal('hide');
                $('#logimodal').modal('toggle'); 
                return false;
            });

          this.$emit("successregister");
        })
        .catch(err => {
          this.swal.fire("Error", "Cannot register", "error");
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
