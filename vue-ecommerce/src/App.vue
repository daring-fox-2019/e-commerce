<template>
  <div id="app" >
    <router-view/>
    <footer class="footer">
      <div>
        <div class="d-flex justify-content-between">
          <div class="ml-3 mt-2"><span> Copyright of rizkyandijani @2019</span></div>
          <div class="mt-2"><i class="fab fa-instagram fa-2x mr-4"></i><i class="fab fa-facebook-square fa-2x mr-4"></i><i class="fab fa-twitter fa-2x mr-5"></i></div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
* {
  margin : 0;
  padding: 0;
}

html {
    min-height: 100%;
    overflow-y: scroll;
}    
body {
     min-height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 10px;
  color: #42b983
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.footer {
  /* flex-shrink: 0; */
  background-color: #42b983;
  font-size: 18px;
  position:fixed;
  bottom:0;
  left:0;
  width: 100%
}


</style>
