<template>
  <v-navigation-drawer
    class="dark-default-1"
    fixed
    :clipped="$vuetify.breakpoint.mdAndUp"
    app
    v-model="drawer"
  >
    <v-list dense>
      <template v-for="item in items">
        <v-list-tile
          :key="item.text"
          style="cursor: pointer;"
          @click.prevent="switchPage(item.route)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <v-list-tile
        style="cursor: pointer;"
        @click.prevent="switchPage('/allHistory')"
        v-show="role == 'admin'"
      >
        <v-list-tile-action>
          <v-icon>history</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>All Users Purchase History</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "side-bar",
  props: ["drawer", "items", "isLoggedIn"],
  data() {
    return {
      role: ""
    };
  },
  methods: {
    switchPage(route) {
      this.$router.push(route);
    }
  },
  created() {
    if (localStorage) {
      this.role = localStorage.role;
    } else {
      this.role = "";
    }
  },
  watch: {
    isLoggedIn() {
      if (this.isLoggedIn) {
        this.role = localStorage.role;
      } else {
        this.role = "";
      }
    },
    drawer() {
      // this.$emit('toggle')
    }
  }
};
</script>

<style>
</style>
