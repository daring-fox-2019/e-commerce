<template>
  <b-container fluid>
    <br><br>
    <form @submit.prevent="register">
      <b-row class="my-3">
        <b-col sm="3" lg="4">
        </b-col>
        <b-col sm="2" lg="1" class="label">
          <label for="input-none">Name :</label>
        </b-col>
        <b-col sm="4" lg="3">
          <b-form-input id="nameReg" v-model="name" :state=null placeholder="your name here..">
          </b-form-input>
        </b-col>
        <b-col sm="3" lg="4">
        </b-col>
      </b-row>

      <b-row class="my-3">
        <b-col sm="3" lg="4">
        </b-col>
        <b-col class="label" sm="2" lg="1">
          <label for="input-valid">Email :</label>
        </b-col>
        <b-col sm="4" lg="3">
          <b-form-input id="emailReg" v-model="email" placeholder="your email here..">
          </b-form-input>
        </b-col>
        <b-col sm="3" lg="4">
        </b-col>
      </b-row>

      <b-row class="my-3">
        <b-col sm="3" lg="4">
        </b-col>
        <b-col class="label" sm="2" lg="1">
          <label for="input-valid">Password :</label>
        </b-col>
        <b-col sm="4" lg="3">
          <b-form-input type="password" id="passwordReg" v-model="password"
            placeholder="your password here..">
          </b-form-input>
        </b-col>
        <b-col sm="3" lg="4">
        </b-col>
      </b-row>

      <b-row class="my-3">
        <b-col sm="3" lg="4">
        </b-col>
        <b-col class="label" sm="2" lg="1">
          <label for="input-valid">Address :</label>
        </b-col>
        <b-col sm="4" lg="3">
          <b-form-input id="addressReg" v-model="address" placeholder="your address here..">
          </b-form-input>
        </b-col>
        <b-col sm="3" lg="4">
        </b-col>
      </b-row>


      <b-row class="my-3">
        <b-col sm="3" lg="4">
        </b-col>
        <b-col class="label" sm="2" lg="1">
          <label for="input-valid">Phone Number :</label>
        </b-col>
        <b-col sm="4" lg="3">
          <b-form-input id="phoneNumberReg" v-model="phoneNumber"
            placeholder="your phone number here..">
          </b-form-input>
        </b-col>
        <b-col sm="3" lg="4">
        </b-col>
      </b-row>

      <b-row class="my-3">
        <b-col sm="3" lg="4">
        </b-col>
        <b-col class="label" sm="2" lg="1">
          <label for="input-valid">Profile :</label>
        </b-col>
        <b-col sm="3" lg="2">
          <b-form-file id="ppReg" v-model="pp" accept=".jpg, .png, .gif"></b-form-file>
        </b-col>
        <b-col sm="3" lg="4">
        </b-col>
      </b-row>

      <b-row class="my-5">
        <button class="btn btn-dark" type="submit" id="register-btn">Register</button>
      </b-row>
    </form>
  </b-container>
</template>

<style>
  .label {
    text-align: left;
    color: black;
  }

  #register-btn {
    position: absolute;
    left: 48%
  }

</style>

<script>
import axios from '@/api/axios';
import Swal from 'sweetalert2';

export default {
  name: 'register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      address: '',
      phoneNumber: '',
      pp: {},
    };
  },
  methods: {
    register() {
      if (this.pp && this.pp.name) {
        const file = this.pp;
        const extension = file.name.split('.')[1];
        const validExtensions = ['png', 'jpg', 'jpeg'];
        if (validExtensions.indexOf(extension) === -1) {
          Swal.fire({
            type: 'error',
            text: 'Valid extensions: .png, .jpeg, or .jpg',
          });
        } else {
          getBase64(file)
            .then(image => axios
              .post('/users/register', {
                name: this.name,
                email: this.email,
                password: this.password,
                address: this.address,
                phoneNumber: this.phoneNumber,
                img: image,
                extension,
                pp: this.pp,
              })
              .then(data => axios
                .post('users/login', {
                  email: this.email,
                  password: this.password,
                })
                .then((data) => {
                  localStorage.setItem('jwtoken', data.data.jwtoken);
                  localStorage.setItem('id', data.data.id);
                  localStorage.setItem('username', data.data.name);
                  localStorage.setItem('pp', data.data.pp);
                  localStorage.setItem('watchTags', data.data.watchTags);
                  localStorage.setItem('role', data.data.role);
                  this.$emit('login');
                  this.$router.push({
                    path: '/',
                  });
                })))
            .catch((err) => {
              Swal.fire({
                type: 'error',
                title: 'Error!',
                text: err.message,
              });
            });
        }
      } else {
        axios
          .post('/users/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            address: this.address,
            phoneNumber: this.phoneNumber,
          })
          .then((data) => {
            console.log(data);
            Swal.fire({
              type: 'success',
              text: 'You have successfully registered!',
            });
            return axios
              .post('users/login', {
                email: this.email,
                password: this.password,
              })
              .then((data) => {
                localStorage.setItem('jwtoken', data.data.jwtoken);
                localStorage.setItem('id', data.data.id);
                localStorage.setItem('username', data.data.name);
                localStorage.setItem('pp', data.data.pp);
                localStorage.setItem('watchTags', data.data.watchTags);
                localStorage.setItem('role', data.data.role);
                Swal.fire({
                  type: 'success',
                  text: 'you have successfully logged in!',
                });
                this.$emit('login');
                this.$router.push({
                  path: '/',
                });
              });
          })
          .catch((err) => {
            Swal.fire({
              type: 'error',
              title: 'Error!',
              text: `${err.message}, please check your input!`,
            });
          });
      }
    },
  },
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = error => reject(error);
  });
}

</script>
