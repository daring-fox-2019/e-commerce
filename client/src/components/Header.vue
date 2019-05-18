<template>
  <div>
    <v-toolbar app fixed clipped-left>
      <v-flex>
        <!-- <v-img src="/logo.png" alt="tess"></v-img> -->
      </v-flex>
      <v-toolbar-title><router-link to="/" style="text-decoration: none;">Application</router-link></v-toolbar-title>
      <router-link to="/signin">Signin</router-link>
      <router-link to="/signup">Signup</router-link>
      <v-spacer></v-spacer>
      <v-btn icon to="/cart">
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <div class="ml-2">
        <v-menu :nudge-width="100">
          <template v-slot:activator="{ on }">
            <v-toolbar-title v-on="on" style="cursor: pointer">
              <v-icon class="mr-2">account_circle</v-icon>
              <span>Hai</span>
              <v-icon>arrow_drop_down</v-icon>
            </v-toolbar-title>
          </template>

          <v-list >
            <v-list-tile to="/admin">
              <v-list-tile-title>Admin</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/signin">
              <v-list-tile-title>Signout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
  </div>
</template>
