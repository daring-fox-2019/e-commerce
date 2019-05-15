<template>
  <div class="container border p-5" style="margin-top:100px;width:30%;padding-bottom:100px">
    <b-form @submit.prevent="register">
      <div class="row">
        <div class="col">
          <b-form-group id="input-group-1" label="First Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              type="text"
              required
              placeholder="Enter First Name"
              v-model="first_name"
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="col">
          <b-form-group id="input-group-2" label="Last Name:" label-for="input-2">
            <b-form-input
              id="input-2"
              type="text"
              required
              placeholder="Enter Last Name"
              v-model="last_name"
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
      <b-form-group
        id="form-email"
        label="Email address:"
        label-for="email"
        description="We'll never share your email with anyone else."
      >
        <b-form-input id="email" type="email" required placeholder="Enter email" v-model="email"></b-form-input>
      </b-form-group>

      <b-form-group id="form-passoword" label="Password:" label-for="password">
        <b-form-input
          id="password"
          required
          type="password"
          placeholder="Enter password"
          v-model="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success" block>
        <i class="fas fa-user-plus"></i> Sign Up
      </b-button>
    </b-form>
    <hr>
    <p>have an account ?</p>
    <b-button type="submit" variant="outline-success" block size="sm">
      <i class="fas fa-torii-gate"></i> Login
    </b-button>
  </div>
</template>

<script>
import axios from '@/database/axios.js';

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      address: {
        city: ""
      }
    };
  },
  created(){
      //this.getAllProvince()
  },
  methods: {
    getAllProvince(){
        axios.get('/shipping/province')
        .then( ({ data }) => {
            console.log(data)
        })
        .catch( err => {
            console.log(err,'======================')
        })
    },
    register() {
      axios
        .post("/users/register", {
          name: `${this.first_name} ${this.last_name}`,
          password: this.password,
          email: this.email
        })
        .then(({ data }) => {
          this.$router.push("/login");
          this.$swal("Good ;D", "Register Success", "success");
        })
        .catch(err => {
          this.$swal(`Oppps...`, `${err.response.data.message}`, "error");
        });
    }
  }
};
</script>
