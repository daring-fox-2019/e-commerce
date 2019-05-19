<template>
  <v-toolbar>
    <router-link to="/">
      <v-toolbar-title class="teal--text">+plusOne</v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn color="teal" flat>
        LOGIN
      </v-btn>
      <v-btn color="teal" flat>
        REGISTER
      </v-btn>
    </v-toolbar-items>


    <v-text-field
      color="teal"
      hide-details
      prepend-icon="search"
      single-line
    ></v-text-field>

    <v-btn color="teal" icon flat>
      <v-icon>shopping_basket</v-icon>
    </v-btn>

    <v-btn icon flat>
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<style scoped>
  a {
    text-decoration: none;
  }
</style>

<script>
export default {
  name: 'headBar',
};
</script>
