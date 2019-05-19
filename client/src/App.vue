<template>
  <v-app dark>
    <v-navigation-drawer fixed temporary v-model="drawer" app class="navDrawer">
      <v-list class="pa-1" v-if="isLogin">
        <v-list-tile to="/user" avatar tag="div">
          <v-list-tile-avatar>
            <img :src="userPic">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{user.firstname + ' ' + user.lastname}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile to="/">
          <!-- Home -->
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- Public Products Page -->
        <v-list-tile v-if="!isLogin" to="/shop">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Explore Products</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- Products -->
        <v-list-group
          prepend-icon="assignment"
          v-if="isLogin"
          value="true">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Products</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile v-if="$store.state.user" class="ml-4" to="/products">
            <v-list-tile-action>
              <v-icon>assignment</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Products List</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="$store.state.user && $store.state.user.role ==='admin'" class="ml-4" to="/addproduct">
            <v-list-tile-action>
              <v-icon>add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Add Product</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <!-- Products -->
        <v-list-tile to="/cart" v-if="isLogin">
          <v-list-tile-action>
            <v-icon>shopping_cart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Cart</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar fixed app dense class="topNav">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" class="navtitle">BUKUBERKAH | &nbsp;</router-link>
      </v-toolbar-title>
      <span class="text-truncate">Pusat Buku Islam</span>
      <v-spacer/>
      <v-text-field class="mr-2"
        clearable
        placeholder="Cari Buku"
        solo
        prepend-inner-icon="search"
      ></v-text-field>
      <v-toolbar-items v-if="!isLogin">
        <v-btn flat to="/register">Register</v-btn>
        <v-btn light to="/login" color="yellow">Login</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn flat to="/user" class="navtitle">
          <v-avatar>
            <img :src="userPic" :alt="user.firstname">
          </v-avatar>
          &nbsp;{{userDisplayName}}
        </v-btn>
        <v-btn to="/cart" v-if="itemsInCart > 0">
          <v-badge right overlap class="black--text" color="red">
          <template v-slot:badge>
            <span>{{ itemsInCart }}</span>
          </template>
          <v-icon color="grey lighten-1">shopping_cart</v-icon>
        </v-badge>
        </v-btn>
        <v-btn color="yellow" light @click="signOut">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view :user="user"/>
    </v-content>
    <v-footer app inset>
      <span class="white--text">&copy; 2019 - Andre Suchitra</span>
    </v-footer>
  </v-app>
</template>

<script>
import api from "./api/backend.js";
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    itemsInCart() {
      if(this.isLogin) {
        if(this.cart && this.cart.items.length > 0) {
          return this.cart.items.length
        }
        else {
          return 0
        }
      }
      else {
        return 0
      }
    },
    userPic() {
      if (this.user && this.user.image) {
        return this.user.image;
      } else {
        return require("./assets/logo.png");
      }
    },
    userDisplayName() {
      if (this.user.firstname) {
        return this.user.firstname;
      } else if (this.user.lastname) {
        return this.user.lastname;
      } else {
        return "default_user";
      }
    },
    ...mapState(["isLogin", "user", "cart"])
  },
  mounted() {
    const token = localStorage.getItem("ecomm_token");
    this.getUserData();
    //load Google Logout client
    if (typeof(gapi) !== undefined) {
      gapi.load("auth2", () => {
        console.log('gapi load...');
        gapi.auth2.init();
      });
    }
  },
  methods: {
    getUserData() {
      api
        .get("/auth/user/", {
          headers: { Authorization: localStorage.getItem("ecomm_token") }
        })
        .then(({ data }) => {
          this.$store.commit("setIsLogin", true);
          this.$store.commit("setUser", data);
          this.$store.dispatch('getCurrentCart');
        })
        .catch(({ response }) => {
          swal.fire("Error", response.data, "error");
        });
    },
    processSignOut() {
      localStorage.removeItem("ecomm_token");
      this.$store.commit("setIsLogin", false);
      this.$store.commit("setUser", null);
      this.$router.push("/");
      swal.fire("Success", "Bye!", "success");
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      const self = this;

      auth2.signOut().then(function() {
        self.processSignOut();
      });
    }
  }
};
</script>

<style scoped>
.newanchor {
  color: #fff000;
}
.navtitle {
  color: white;
}
.navtitle:link {
  text-decoration: none;
}
.navtitle:visited {
  text-decoration: none;
}

.navSearch {
  font-size: 1em;
}

.topNav {
  z-index: 8;
}
.navDrawer {
  z-index: 10;
}
</style>
