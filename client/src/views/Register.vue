<template>
  <div id="register" class="container mt-3">
    <div class="row" style="justify-content:center">
      <div class="col-md-4">
        <h3>Register</h3>
        <form v-on:submit.prevent="register">
          <div class="form-group">
            <label for="exampleInputEmail">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model="email"
            >
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword2"
              placeholder="Password"
              v-model="password"
            >
          </div>
          <button type="submit" class="btn btn-dark btn-sm">Register</button>
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
    register() {
      const { email, password } = this;
      this.$axios
        .post(`http://localhost:3000/users/signUp`, {
          email,
          password
        })
        .then(({ data }) => {
          console.log('disini')
          this.$swal(data.msg,"Welcome aboard!", "success");
          this.email = "";
          this.password = "";
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err)
          const { errors } = err.response.data;
          let errorMessages = [];
          for (let key in errors) errorMessages.push(errors[key].message);
          errorMessages = errorMessages.join("\n");
          this.$swal("Oops... Bad Credentials Try Again", errorMessages, "error");
          this.email = "";
          this.password = "";
        });
    }
  }
}
</script>