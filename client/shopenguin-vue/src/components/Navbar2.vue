<template>
  <div id="navbar-2">
    <b-navbar toggleable="lg" type="dark" class="flex-between" style="padding-top: 0;">
      <b-navbar-brand href="#" class="flex-center" style="padding-left: 8px; padding-right: 8px;" to="/">
        <img
          src="@/assets/website-logo.png"
          style="width: 50px; height: 50px; border-radius: 50%;"
          class="d-inline-block align-top mr-2"
          alt="Kitten"
        >
        Shopenguin
      </b-navbar-brand>

      <b-navbar-nav style="width: 70%;">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text" style="background-color: white;">
              <i class="fas fa-search"></i>
            </span>
          </b-input-group-prepend>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Search for products, brands, and shops"
          ></b-form-input>
        </b-input-group>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item>
          <router-link to="/cart">
            <i class="fas fa-shopping-cart"></i>
          </router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
