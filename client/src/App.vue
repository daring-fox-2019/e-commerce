<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div class="container border">
      <b-row>
        <b-col>
          <b-nav>
            <b-nav-item active><router-link to="/">Home</router-link></b-nav-item>
            <b-nav-item active><router-link to="/about">About</router-link></b-nav-item>
            <b-nav-item><router-link to="/products">Product</router-link></b-nav-item>
            <b-nav-item><router-link to="/carts">Cart</router-link></b-nav-item>
            <b-nav-item><router-link to="/admin">Admin</router-link></b-nav-item>
            <b-nav-item disabled>Disabled</b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
    </div>

    <!-- main container -->
    <b-container class="border">
      <b-row>
        <b-col>
          <router-view/>
        </b-col>
      </b-row>
    </b-container>

    <!-- footer -->
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.flex-center {
  display:flex;
  justify-content: center;
  align-items: center;
}
</style>
