<template>
  <div id="header">
    <b-navbar toggleable="lg" variant="light" class="fixed-top">
      <router-link to="/">
        <b-navbar-brand class="ml-5">E-Commerce</b-navbar-brand>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="search"></b-form-input>
          </b-nav-form>
        </b-navbar-nav>

        <!-- Right aligned nav items -->

        <b-navbar-nav class="ml-auto">
          <div class="d-flex align-items-center mr-2">
            <b-button size="sm" variant="success" @click="back">
              <i class="fas fa-arrow-left"></i>
            </b-button>
          </div>
          <div class="d-flex align-items-center mr-2" v-if="isLogin && role != 'admin'">
            <router-link to="/cart">
              <b-button size="sm" variant="success">
                <i class="fas fa-shopping-cart"></i> |
                <span class="badge badge-light">{{countCart}} items</span>
              </b-button>
            </router-link>
          </div>
          <div class="d-flex align-items-center mr-2" v-if="isLogin">
            <router-link to="/transaction">
              <b-button size="sm" variant="success">
                <i class="fas fa-exchange-alt"></i> Transaction
              </b-button>
            </router-link>
          </div>
          <div class="d-flex" v-if="isLogin && role != 'admin'">
            <b-nav-item-dropdown
              size="sm"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template slot="button-content">
                <b-button size="sm" variant="outline-success">
                  <i class="fas fa-cog"></i>
                </b-button>
              </template>
             
              <b-dropdown-item>
                <router-link to="/my-product">My Product</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <router-link to="/input-product">Sell Product</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
          <div class="d-flex align-items-center">
            <div v-if="!isLogin">
              <router-link to="/login">
                <b-button size="sm" class="mr-2">
                  <i class="fas fa-torii-gate"></i> sign in
                </b-button>
              </router-link>
            </div>
            <div v-if="isLogin">
              <b-button
                size="sm"
                class="4 mr-5"
                variant="outline-secondary"
                @click.prevent="signOut"
              >
                <i class="fas fa-snowboarding"></i> sign out
              </b-button>
            </div>
          </div>
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
     search : ''
    };
  },
  computed: {
    ...mapState(["countCart", "isLogin",'role'])
  },
  watch: {
      search(){
        this.$store.commit('setSearch', this.search)
        this.$store.dispatch('fetchDataItems')
      }
  },
  methods: {
    signOut() {
      localStorage.clear();
      this.$store.commit("resetValue");
      this.$router.push("/");
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>


<style scoped>
#header {
  color: black;
}
</style>
