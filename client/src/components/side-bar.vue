<template>
  <v-navigation-drawer class="dark-default-1" fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer"
  >
    <v-list dense >
      <template v-for="item in items" >
        <v-layout row v-if="item.heading" align-center :key="item.heading">
          <v-flex xs6>
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
        <v-list-tile v-else :key="item.text">
          <!-- @click -->
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'side-bar',
  props: [
    'drawer',
    'items',
  ],
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style>
/* .dark-default {
  background-color: #263238 !important;
} */
</style>
