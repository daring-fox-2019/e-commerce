<template>
  <v-app dark>
    <v-navigation-drawer fixed temporary v-model="drawer" app>
      <v-list class="pa-1" v-if="isLogin">
        <v-list-tile to="/user" avatar tag="div">
          <v-list-tile-avatar>
            <img :src="user.image ? user.image : 'http://www.clker.com/cliparts/j/h/A/z/H/9/yellow-user-icon-md.png'">
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
        <!-- Products -->
        <v-list-tile to="/products">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Products</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
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
    <v-toolbar fixed app dense>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link to="/" class="navtitle">CHEAPSHOP</router-link>
        </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items v-if="!isLogin">
        <v-btn flat to="register">Register</v-btn>
        <v-btn light to="login" color="yellow">Login</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn flat to="/user" class="navtitle">
          <v-avatar>
            <img :src="userPic" :alt="user.firstname" >
          </v-avatar>
          &nbsp;{{userDisplayName}}
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
import api from './api/backend.js'
import {mapState} from 'vuex'

export default {
  name: "App",
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    userPic() {
      if(this.user && this.user.image) {
        return this.user.image
      }
      else {
        return require('./assets/logo.png')
      }
    },
    userDisplayName() {
      if(this.user.firstname) {
        return this.user.firstname
      }
      else if(this.user.lastname){
        return this.user.lastname
      }
      else {
        return 'default_user'
      }
    },
    ...mapState([
      'isLogin',
      'user',
    ])
  },
  mounted() {
    //load Google Logout client
    if(gapi) {
      gapi.load('auth2', () => {
          gapi.auth2.init();
          if(localStorage.getItem('ecomm_token')) {
            this.getUserData()
          }
      });
    }
    else {
      if(localStorage.getItem('ecomm_token')) {
        this.getUserData()
      }
      else {
        // this.$router.push('/login')
      }
    }

  },
  methods: {
    getUserData() {
      api.get('/auth/user/', {headers: {'Authorization': localStorage.getItem('ecomm_token')}})
        .then(({data}) => {
          this.$store.commit('setIsLogin', true)
          this.$store.commit('setUser', data)
        })
        .catch(({response}) => {
          swal.fire('Error', response.data, 'error')
        })
    },
    processSignOut() {
      localStorage.removeItem('ecomm_token');
      this.$store.commit('setIsLogin', false)
      this.$store.commit('setUser', null)
      this.$router.push('/');
      swal.fire('Success', 'Bye!', 'success')
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      const self = this

      auth2.signOut().then(function () {
        self.processSignOut();
      });
    }
  }
};
</script>

<style scoped>
.newanchor{
  color: #FFF000;
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
</style>
