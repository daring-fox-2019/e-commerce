<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col d-flex justify-content-center">
          <form method="post" @submit.prevent="redirect">
            <h2 class="text-center">LOGIN PAGE</h2>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                v-model="signin.email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              >
              <small
                id="emailHelp"
                class="form-text text-muted"
              >We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input v-model="signin.password" type="password" class="form-control" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-page",
  props: ["signin"],
  methods: {
    redirect() {
      this.$emit("loginuser");
    }
  }
};
</script>



