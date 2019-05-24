<template>
  <div id="navbar-1">
    <b-navbar toggleable="sm" type="dark" style="padding-bottom: 0;">
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/">Buy</router-link>
          </b-nav-item>
          <b-nav-item>|</b-nav-item>
          <b-nav-item>
            <router-link to="/add">Sell</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="!isLoggedIn">
          <b-nav-item>
            <router-link to="/login">Login</router-link>
          </b-nav-item>

          <b-nav-item>|</b-nav-item>
          <b-nav-item>
            <router-link to="/register">Register</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content"><i class="fas fa-user"></i> {{ fullName }}</template>
            <router-link to="/profile">
              <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            </router-link>

            <b-dropdown-item href="#" @click.prevent="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      fullName: localStorage.fullName,
    }
  },
  created() {
    if (localStorage.token) {
      this.$store.dispatch("login");
    } else {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    ...mapState(["isLoggedIn"])
  },
  methods: {
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>

<style>
#navbar-1,
#navbar-2 {
  background-color: rgb(0, 64, 107);
  font-weight: 700;
}

a.nav-link,
.nav-link a {
  color: rgb(233, 246, 255) !important;
}

a.nav-link:hover,
a.nav-link:focus {
  color: rgb(153, 221, 218) !important;
}

.nav-link a:hover {
  color: rgb(153, 221, 218) !important;
  text-decoration: none;
}
.modal-backdrop.show {
  opacity: 0.1;
}

.modal-footer {
  border-top: 0;
}
</style>
