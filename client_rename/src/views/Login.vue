<template>
    <div id="login" class="container mt-3">
        <div class="row" style="justify-content:center">
            <div class="col-md-4">
                <h3>Login</h3>
                <form v-on:submit.prevent="login">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                    </div>
                    <div id="localsign">
                        <button type="submit" class="btn btn-dark btn-sm">login</button>
                    </div>
                    <br>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    login() {
      const { email, password } = this;
      this.$axios
        .post(`http://localhost:3000/users/signIn`, {
          email,
          password
        })
        .then(({ data }) => {
          const { token, details } = data;
          const { email, id, role } = details;
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          localStorage.setItem("UserId", id);
          localStorage.setItem("role", role);
          this.$emit("success-login", role);
          this.$swal(data.message, "Welcome back!", "success");
          if (role == "admin") this.$router.push("/admin");
          else this.$router.push("/store");
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$swal("Error!", message, "error");
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>