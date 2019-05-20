<template>
  <div id="registerModal" class="modal fade" >
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- dialog body -->
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h5 class="mt-5">REGISTER</h5>
          <small class="text-muted">You can use your account to log in and purchase our products</small>
        </div>
        <!-- dialog buttons -->
        <div class="modal-body">
          <div class="form-group row">
            <div class="col-sm-6">
              <input v-model="firstName" type="text" class="form-control" id="inputFirstname" placeholder="First Name">
            </div>
            <div class="col-sm-6">
              <input v-model="lastName" type="text" class="form-control" id="inputLastname" placeholder="Last Name">
            </div>
          </div>
          <h6> Gender : </h6>
          <div class="input-group">
            <select
              class="custom-select"
              id="inputGroupSelect04"
              aria-label="Example select with button addon"
              v-model="gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <br>
          <div class="form-group row">
            <div class="col-sm-12">
              <input v-model="email" type="email" class="form-control" id="inputEmail" placeholder="Email">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-12">
              <input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Password">
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center my-3">
          <button data-dismiss="modal" @click.prevent="register" type="button" class="btn btn-success">Submit</button>
          <button @click.prevent="clearState" type="button" class="btn btn-success">Clear</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/localhost.js'

export default {
  data() {
    return {
      firstName : '',
      lastName : '',
      gender : '',
      email : '',
      password : '',
      role : 'customer',
    }
  },
  methods: {
    clearState() {
      this.firstName = ''
      this.lastName = ''
      this.gender = ''
      this.email = ''
      this.password = ''
      this.role = 'customer'
    },
    register() {
      let newUSer = {
        firstName : this.firstName,
        lastName :  this.lastName,
        gender : this.gender,
        email : this.email,
        password : this.password,
        role : this.role = 'customer'
      }

      axios
        .post('users/register', newUSer)
        .then(({ data })=> {
          console.log(data);
          this.$swal('Register Complete!')
          this.$router.push('/')
        })
        .catch((err)=> {
          console.log(err);
        })
    }
  },
};
</script>

<style>
.btn {
  width: 200px;
}

h5 {
  font-weight: 700;
  font-family: "Paytone One", sans-serif;
}
</style>
