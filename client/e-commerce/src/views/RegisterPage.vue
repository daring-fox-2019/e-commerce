<template>
  <div>
    <router-link to="/">
      <button class="btn btn-danger">Back to Home</button>
    </router-link>
    <Register v-on:createuser="register" v-bind:signup="signup"/>
  </div>
</template>

<script>
import ecommerce from "@/api/e-commerceApi";
import Register from "@/components/Register.vue";
import Swal from "sweetalert2";
export default {
  components: {
    Register
  },
  data() {
    return {
      signup: {
        name: "",
        email: "",
        password: "",
        phone: ""
      }
    };
  },
  methods: {
    register() {
      const { name, email, password, phone } = this.signup;
      console.log(this.signup);

      ecommerce
        .post("/signup", {
          name,
          email,
          password,
          phone
        })
        .then(({ data }) => {
            Swal.fire({
            title: `Register Success`,
            text: `WELCOME ${data.name}`,
            type: "success",
            confirmButtonText: "Please Login"
          });
          this.$router.push('/login')
          
        })
        .catch(error => {
          Swal.fire({
            title: "Error!",
            text: `${error.response.data.message}`,
            type: "error",
            confirmButtonText: "Cool"
          });
          
        });
    }
  }
};
</script>

