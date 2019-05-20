<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div class="container border px-0">
      <!-- <b-row>
        <b-col>
          <b-nav>
            <b-nav-item active><router-link to="/">Home</router-link></b-nav-item>
            <b-nav-item active><router-link to="/about">About</router-link></b-nav-item>
            <b-nav-item><router-link to="/products">Product</router-link></b-nav-item>
            <b-nav-item><router-link to="/carts">Cart</router-link></b-nav-item>
            <b-nav-item><router-link to="/admin">Admin</router-link></b-nav-item>
            <LoginModal />
            <RegisterModal />
          </b-nav>
        </b-col>
      </b-row> -->
      <!-- nav start here -->
      <div>
        <b-navbar toggleable="lg" type="light" variant="light">
          <b-navbar-brand to="/">Greens</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <!-- <b-nav-item active><router-link to="/">Home</router-link></b-nav-item> -->
              <b-nav-item><router-link to="/products">Product</router-link></b-nav-item>
              <b-nav-item><router-link to="/carts">My Cart</router-link></b-nav-item>
              <b-nav-item><router-link to="/admin">Admin</router-link></b-nav-item>
              <b-nav-item><router-link to="/about">About</router-link></b-nav-item>

            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
              </b-nav-form>

              <b-navbar-nav v-if="!isLogin">
                <LoginModal/>
                <RegisterModal />
              </b-navbar-nav>

              <b-nav-item-dropdown right v-if="isLogin">
                <!-- Using 'button-content' slot -->
                <template slot="button-content"><em>User Menu</em></template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item @click.prevent="signOut">Sign out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>

    <!-- main container -->
    <b-container class="border">
      <b-row>
        <b-col>
          <router-view/>
        </b-col>
      </b-row>
    </b-container>

    <!-- footer -->
  </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';

export default {
  components: {
    LoginModal,
    RegisterModal,
  },
  created() {
    if(localStorage.token) {
      this.$store.commit('userIsLoggedIn')
    }
  },
  methods: {
    signOut() {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          this.$store.commit('signOut');
        }
      });
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.session.isLogin
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.flex-center {
  display:flex;
  justify-content: center;
  align-items: center;
}
</style>
