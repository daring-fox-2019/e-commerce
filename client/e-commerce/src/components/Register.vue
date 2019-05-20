<template>
  <div>
    <div class="pt-3 container">
        <div class="row">
        <div class="col d-flex justify-content-center">
            
      <form method="post" @submit.prevent="redirect">
          <h2>REGISTER PAGE</h2>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            v-model="signup.name"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
          >
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            v-model="signup.email"
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
          <input v-model="signup.password" type="password" class="form-control" placeholder="Password">
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">Phone</label>
          <input v-model="signup.phone" type="text" class="form-control" placeholder="Phone">
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
    name: 'register-page',
    props: ['signup'],
    methods: {
        redirect(){
            this.$emit('createuser')
        }
    }
}
</script>

