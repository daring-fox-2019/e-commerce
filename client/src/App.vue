<template>
  <div>
    <Navbar 
    v-if="islogin"
    v-on:userLogout="islogin = false"
    v-bind:iscustomer="iscustomer"
    />
    <router-view 
    v-bind:islogin="islogin"
    v-on:userLogin="userLogin" 
    v-bind:page="page" 
    @add-product="addProduct"
    :listproduct="listproduct"
    />
    
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar
  },
  data() {``
    return {
      islogin : false,
      iscustomer : false,
      page: "login",

      username: "",
      email: "",
      password: "",

      titleAdd: "",
      descriptionAdd: "",
      stockAdd: "",
      priceAdd: "",
      imageAdd: "",

      listproduct : ""
    };
  },
  created() {
    if(localStorage.token){
      this.islogin = true
    }
    this.getListProduct()
  },
  methods: {
    userLogin(data) {
      axios({
        method: "post",
        url: "http://localhost:3000/users/signin",
        data: {
          email: data.email,
          password: data.password
        }
        
      })
        .then(({ data }) => {
          this.islogin = true
          console.log(data);
          localStorage.setItem("token", data.dataUser.token);
          localStorage.setItem("role", data.dataUser.role);
          localStorage.setItem("email", data.dataUser.email);
          localStorage.setItem("id", data.dataUser.id);
          this.$router.push({path:'/listProduct'}) // programtik routing

          if(data.dataUser.role === 'customer'){
            this.iscustomer = true
          }
        })
        .catch(error => {});
    },
    async addProduct(fd) {
      axios
        .post("http://localhost:3000/products", fd,
          {headers : {token : localStorage.getItem('token')}})
        .then(data => {
          console.log(data, "data baru");
        })
        .catch(err => {
          console.log("masukas");
          console.log(err.response);
        });
    },
    getListProduct() {
      axios({
        method: "get",
        url: "http://localhost:3000/products",
        headers : {token : localStorage.getItem('token')}
      }).then(({data}) => {
        this.listproduct = data
        console.log(this.listproduct)
        // console.log(this.listProduct);
      })
      .catch(err=>{

      })
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  /* padding: 30px; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
