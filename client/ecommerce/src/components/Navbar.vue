<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-light d-flex justify-content-center"
      style="background-color:#F8CB77"
    >
      <div class="row">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item mr-5">
                <router-link to='/'>
              <img
                src="https://cdn.shopify.com/s/files/1/1063/4470/t/7/assets/logo.png?1"
                style="height:40px"
              >
                </router-link>
            </li>
            <li class="nav-item mr-5">
              <router-link to="/item/Bags" class="nav-link"> Bags </router-link>
            </li>
            <li class="nav-item mr-5">
              <router-link to="/item/Tops" class="nav-link"> Tops </router-link>
            </li>
            <li class="nav-item mr-5">
              <router-link to="/item/Pants" class="nav-link"> Pants </router-link>
            </li>
            <li class="nav-item mr-5">
              <router-link to="/item/Boots" class="nav-link"> Boots </router-link>
            </li>
            <li class="nav-item mr-5">
              <router-link to="/item/Shoes" class="nav-link"> Shoes </router-link>
            </li>
            <li class="nav-item mr-5">
              <router-link to="/cart" class="nav-link"><i class="fas fa-shopping-cart"></i> </router-link>
            </li>
            <li class="nav-item mr-5">
              <router-link to="/login" class="nav-link"> Login </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style>
</style>
