<template>
    <div class="top-navbar">
    <nav id="nav" class="navbar navbar-light d-flex justify-content-between">
      <router-link to="/" style="text-decoration : none; color : green"><b><h5 style="font-family: 'Fugaz One',serif">JajanMas</h5></b></router-link>
      <!-- <b-nav-form>
      <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
      <b-button variant="outline-danger" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form> -->
      <div class="d-flex">
      <!-- <a href="" class="mr-3"></a> -->
      <!-- <a href="" class="mr-3">Account</a> -->
      <b-button variant="success" @click="addProduct" class="mr-5">jual Barangmu!</b-button>
      <router-link to="/login"><b-button v-show="!isLogin" variant="success" class="mr-5">Login</b-button></router-link> 
      <a href="" class="mr-3">{{fullName}}</a>
      <router-link to="/cart"><i class="fas fa-shopping-cart mr-3 fa-lg"></i></router-link>
      <a v-show="isLogin" @click="signOut" class="mr-3"><i class="fas fa-sign-out-alt fa-lg"></i></a>
      </div>
    </nav>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  data(){
    return{
      fullName : localStorage.fullName,
      isLogin : false
    }
  },
  methods : {
    addProduct(){
      if(localStorage.token){
        this.$router.push('/addProduct')
      }else{
        Swal.fire('Please Login First', '', 'error')
      }
    },
    signOut(){
      console.log('masuk signout');
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('fullName')
      this.$router.push('/login')
    }
  },
  created(){
    // console.log(localStorage);
    
    if(localStorage.token){
      // console.log('ada localstorage');
      this.isLogin = true
    }
  }
}
</script>
