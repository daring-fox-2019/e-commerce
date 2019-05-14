<template>
  <v-app dark>
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <v-list-tile @click>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Products</v-list-tile-title>
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
        <v-btn flat to="login" color="yellow lighten-3">Login</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn flat to="/user" class="navtitle">
          <v-avatar>
            <img :src="userPic" :alt="user.firstname" >
          </v-avatar>
          &nbsp;{{userDisplayName}}
        </v-btn>
        <v-btn flat @click="signOut">Logout</v-btn>
      </v-toolbar-items>
      
    </v-toolbar>
    <v-content>
      <router-view :user="user" @success="onSuccessLogin" />
    </v-content>
    <v-footer app inset>
      <span class="white--text">&copy; 2019 - Andre Suchitra</span>
    </v-footer>
  </v-app>
</template>

<script>
import api from './api/backend.js'

export default {
  name: "App",
  data() {
    return {
      drawer: false,
      isLogin: false,
      user: null,
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
    }
  },
  mounted() {
    //load Google Logout client
    if(gapi) {
      gapi.load('auth2', function() {
          gapi.auth2.init();
      });
    }

    if(localStorage.getItem('ecomm_token')) {
      this.getUserData()
    }
    else {
      this.$router.push('/login')
    }
  },
  methods: {
    getUserData() {
      api.get('/auth/user/', {headers: {'Authorization': localStorage.getItem('ecomm_token')}})
        .then(({data}) => {
          this.user = data
          this.isLogin = true
        })
        .catch(({response}) => {
          swal.fire('Error', response.data, 'error')
        })
    },
    onSuccessLogin(user) {
      this.isLogin = true;
      this.user = user
    },
    processSignOut() {
      localStorage.removeItem('ecomm_token');
      this.user = null;
      this.isLogin = false;
      this.$router.push('/');
      console.log('User signed out.');
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
