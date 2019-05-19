<template>
  <b-container fluid>
    <br>
    <br>
    <form @submit.prevent="generatecart">
      <b-row style="margin-top:100px" class="my-3">
        <b-col sm="3" lg="4">
        </b-col>
        <b-col class="label" sm="2" lg="2">
          <label for="input-valid">Cart Name :</label>
        </b-col>
        <b-col sm="4" lg="2">
          <b-form-input id="phoneNumberReg" v-model="name"
            placeholder="your cart name here (optional)..">
          </b-form-input>
        </b-col>
        <b-col sm="3" lg="4">
        </b-col>
      </b-row>
      <b-row class="my-5">
        <button class="btn btn-dark" type="submit" id="register-btn">Create New
          Cart</button>
      </b-row>
    </form>
  </b-container>
</template>

<script>
import axios from '@/api/axios';
import Swal from 'sweetalert2';

export default {
  name: 'addnewcart',
  data() {
    return {
      name: null,
      id: localStorage.id,
    };
  },
  methods: {
    generatecart() {
      if (!this.name) {
        this.name = new Date().toLocaleString();
      }
      axios
        .post('carts/add', {
          name: this.name,
          owner: this.id,
        }, {
          headers: {
            jwtoken: localStorage.jwtoken,
          },
        })
        .then((cartCreated) => {
          Swal.fire({
            type: 'success',
            title: 'Success',
            text: 'New cart has successfully created!',
          });
          localStorage.setItem('cartId', cartCreated.data._id);
          this.$router.push({
            name: 'home',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};

</script>

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
