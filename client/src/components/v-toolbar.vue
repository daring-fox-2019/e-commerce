<template>
  <div v-if="isLoggedIn">
    <v-toolbar color="black" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="toggle"></v-toolbar-side-icon>
        <router-link to="/">
          <span class="hidden-sm-and-down">ST-R-EAM</span>
        </router-link>
      </v-toolbar-title>
      <router-link to="/about">
        <v-btn>
          <v-icon>apps</v-icon> Browse games
        </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'toolbar',
  props: ['isLoggedIn'],
  data() {
    return {};
  },
  methods: {
    toggle() {
      this.$emit('toggle');
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: white;
}
</style>
