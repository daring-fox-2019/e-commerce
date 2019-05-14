<template>
  <v-app dark>
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <v-list-tile @click>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Products</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app dense>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link to="/" class="navtitle">CHEAPSHOP</router-link>
        </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items v-if="!isLogin">
        <v-btn flat to="register">Register</v-btn>
        <v-btn flat to="login">Login</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn flat @click="logout">Logout</v-btn>
      </v-toolbar-items>
      
    </v-toolbar>
    <v-content>
      <router-view @success="onSuccessLogin" />
    </v-content>
    <v-footer app inset>
      <span class="white--text">&copy; 2019 - Andre Suchitra</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      isLogin: false,
      user: null,
    };
  },
  methods: {
    onSuccessLogin() {
      this.isLogin = true;
    },
  }
};
</script>

<style scoped>
.navtitle {
  color: white;
}
.navtitle:link {
  text-decoration: none;
}
.navtitle:visited {
  text-decoration: none;
}
</style>
