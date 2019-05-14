<template>
  <div>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>Application</v-toolbar-title>
      <router-link to="/signin">Signin</router-link>
      <router-link to="/signup">Signup</router-link>
      <v-spacer></v-spacer>
      <v-text-field  label="Search" prepend-icon="search"></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <div class="ml-2">
        <v-menu :nudge-width="100">
          <template v-slot:activator="{ on }">
            <v-toolbar-title v-on="on">
              <v-icon class="mr-2">account_circle</v-icon>
              <span>Hai</span>
              <v-icon dark>arrow_drop_down</v-icon>
            </v-toolbar-title>
          </template>

          <v-list>
            <v-list-tile>
              <v-list-tile-title>Signout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
  </div>
</template>
