<template>
  <div>
    <v-toolbar app fixed clipped-left>
      <v-spacer></v-spacer>

      <v-flex xs1>
        <router-link to="/" style="text-decoration: none;">
          <v-img src="/logo.png" alt="logo" height="50"></v-img>
        </router-link>
      </v-flex>
      <v-spacer></v-spacer>
      <v-btn icon to="/cart" v-if="this.$store.state.islogin && !this.$store.state.isAdmin">
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <div class="ml-2" v-if="!this.$store.state.islogin">
        <router-link to="/signin">Signin</router-link>
      </div>
      <div class="ml-2" v-if="this.$store.state.islogin">
        <v-menu :nudge-width="100">
          <template v-slot:activator="{ on }">
            <v-toolbar-title v-on="on" style="cursor: pointer">
              <v-icon class="mr-2">account_circle</v-icon>
              <span>{{name}}</span>
              <v-icon>arrow_drop_down</v-icon>
            </v-toolbar-title>
          </template>

          <v-list>
            <v-list-tile to="/admin" v-if="this.$store.state.islogin && this.$store.state.isAdmin">
              <v-list-tile-title>Admin</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              to="/transaction"
              v-if="this.$store.state.islogin && !this.$store.state.isAdmin"
            >
              <v-list-tile-title>Transaction</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="signout">
              <v-list-tile-title>Signout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
  </div>
</template>


<script>
export default {
  data() {
    return {
      name: localStorage.name,
    };
  },
  methods: {
    signout() {
      this.$store.commit('setLogin', false);
      this.$store.commit('setAdmin', false);
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      swal('Logout Success!', '', 'success');
      this.$router.push('/');
    },
  },
};
</script>
