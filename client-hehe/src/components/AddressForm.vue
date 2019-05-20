<template>
  <div
    style="text-align: center;
background-color: rgb(231, 230, 234);
border: solid;
border-radius: 15px;
padding: 25px;
width: -moz-fit-content;
margin: 0px auto;
border-color: #130831;
margin-top:50px;
"
  >
    <h2>Please fill in the following information</h2>
    <br>
    <form @submit.prevent="confirmOrder">
      Address:
      <input v-model="address" type="text" placeholder="Your address" class="form-control">
      Recipient:
      <input
        v-model="name"
        type="text"
        placeholder="Recipient's name"
        class="form-control"
      >
      <br>
      <button type="submit" class="btn btn-warning">Confirm order</button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      address: '',
      name: '',
    };
  },
  methods: {
    confirmOrder() {
      console.log(this.address);
      console.log(this.name);
      Swal.fire(`Order confirmed!', 'A package will shortly be sent to the following address: ${this.address}', 'success`,);
      this.$store.dispatch('confirmOrder')
    },
  },
};
</script>
