<template>
    <div>
        <Login v-bind:signin="signin" v-on:loginuser="login"/>
        <router-link to="/register">
            Don't Have Any Account? Register here
         </router-link>
         <router-view/>
    </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Swal from "sweetalert2";
import ecommerce from "@/api/e-commerceApi";
export default {
    components: {
        Login
    },
    data() {
    return {
      signin: {
        email: "",
        password: ""
      },
    };
  },
  methods: {
      login(){
          const { email, password } = this.signin;
      ecommerce
        .post("/login", {
          email,
          password
        })
        .then(({ data }) => {
           localStorage.setItem(`token`, data.token)
           this.$emit('ubahlogin', true)
           this.$router.push('/')
           Swal.fire({
            title: `login Success`,
            text: `WELCOME again bro`,
            type: "success",
            confirmButtonText: "Cool"
          });
        })
        .catch(error => {
        console.log(err);
        
          
        });
      }
  }
    
}
</script>

