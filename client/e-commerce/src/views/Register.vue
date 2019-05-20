<template>
  <div class="container border p-5 animated fadeIn" style="margin-top:100px;max-width:40%;padding-bottom:100px">
    <b-form @submit.prevent="register" >
      <div class="row" v-if="!cekAddress">
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
        v-if="!cekAddress"
      >
        <b-form-input id="email" type="email" required placeholder="Enter email" v-model="email"></b-form-input>
      </b-form-group>

      <b-form-group id="form-passoword" label="Password:" label-for="password" v-if="!cekAddress">
        <b-form-input
          id="password"
          required
          type="password"
          placeholder="Enter password"
          v-model="password"
        ></b-form-input>
      </b-form-group>

      <div class="row">
        <div class="col">
          <b-form-group label="Province :" label-for="province">
            <b-form-select id="province" v-model="address.province" :options="optionsProvince" required></b-form-select>
          </b-form-group>
        </div>


        <div class="col">
          <b-form-group label="City :" label-for="city" v-if="cekProvince">
            <b-form-select id="city" v-model="address.city" :options="optionsCites" required></b-form-select>
          </b-form-group>
        </div>
      </div>

      <b-form-group label="Address detail:" label-for="adress">
        <b-form-input
          id="address"
          required
          type="text"
          placeholder="Enter address detail"
          v-model="address.detail"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success" block v-if="!cekAddress">
        <i class="fas fa-user-plus"></i> Sign Up
      </b-button>
    </b-form>
    <b-button type="button" @click="editAddress" v-if="cekAddress" block> Add Address </b-button>
    <hr>
    <p v-if="!cekAddress">have an account ?</p>
    <router-link to="/login" v-if="!cekAddress">
      <b-button type="submit" variant="outline-success" block size="sm">
        <i class="fas fa-torii-gate"></i> Login
      </b-button>
    </router-link>
    <router-link to="/">
      <b-button class="mt-2" type="button" variant="outline-secondary" block size="sm" v-if="!cekAddress">
        <i class="fas fa-arrow-left"></i> Back To Main Page
      </b-button>
    </router-link>
  </div>
</template>

<script>
import axios from '@/database/axios.js';

export default {
  data() {
    return {
      cekAddress: this.$route.params.id,
      first_name: '',
      last_name: '',
      password: '',
      email: '',
      address: {
        city: null,
        province: null,
        detail: null,
      },
      optionsProvince: [],
      optionsCites: [],
    };
  },
  computed: {
    cekProvince() {
      if (this.address.province) {
        return true;
      }
      return false;
    },
  },
  watch: {
    'address.province': function () {
      this.getAllCity();
    },
  },
  mounted() {
    this.getAllProvince();
  },
  methods: {
    editAddress(){
      axios.patch(`/users`, { address: this.address }, {headers: {token: localStorage.getItem('token')}})
      .then(({data}) => {
        this.$router.push('/')
        this.$swal('Yay', 'update address successful', 'info')
        this.address = {
          city: null,
          province: null,
          detail: null,
        }
      })
      .catch( err =>{
        this.$swal(':(', `${err.response.data.message}`, 'error')
      })
    },
    getAllProvince() {
      axios
        .get('/shipping/province')
        .then(({ data }) => {
          this.optionsProvince = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllCity() {
      axios
        .get('/shipping/city', { params: { province: this.address.province } })
        .then(({ data }) => {
          this.optionsCites = data;
        })
        .catch((err) => {
          console.log(err );
        });
    },
    register() {
      axios
        .post('/users/register', {
          name: `${this.first_name} ${this.last_name}`,
          password: this.password,
          email: this.email,
          address: this.address,
        })
        .then(({ data }) => {
          this.$router.push('/login');
          this.$swal('Good ;D', 'Register Success', 'success');
        })
        .catch((err) => {
          this.$swal('Oppps...', `${err.response.data.message}`, 'error');
        });
    },
  },
};
</script>
