<template>
  <div>
    <v-toolbar color="black" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="toggle"></v-toolbar-side-icon>
        <router-link to="/">
          <span class="hidden-sm-and-down">ST-R-EAM</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        style="max-width: 300px;"
      ></v-text-field> -->
      <v-btn flat style="width: 10px;" to="/myCart">
        <v-icon>shopping_cart</v-icon>Cart
        <div v-show="userCart.length > 0">({{ userCart.length }})</div>
      </v-btn>
      <v-menu
        transition="slide-x-transition"
        :close-on-content-click="false"
        v-model="menu"
        bottom
        right
      >
        
        <template  v-slot:activator="{ on }">
          <v-btn v-on="on" flat v-show="!isLoggedIn">Login</v-btn>
        </template>
        <v-card width="300">
          <v-card-text>
            <v-form lazy-validation ref="form" @submit.prevent="validate">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Email"
                    required
                    :rules="requiredRule"
                    v-model="loginForm.email"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Password"
                    type="password"
                    required
                    :rules="requiredRule"
                    v-model="loginForm.password"
                    autocomplete="new-password"
                  ></v-text-field>
                </v-flex>
                <!-- <v-flex xs12 style="display: flex; align-items:center; flex-direction: column;">
                  <p>Or login right away with Google</p>
                  <div id="google-signin-btn"></div>
                </v-flex>-->
                <v-flex style="display: flex; justify-content: space-between;">
                  <v-btn color="error" @click="emptyForm">Cancel</v-btn>
                  <v-btn color="primary" @click.prevent="validate">Submit</v-btn>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn color="info" to="/register" @click="menu = false">Register</v-btn>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-menu>
      <v-btn v-show="isLoggedIn" flat color="error" @click.prevent="logout">Logout</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "toolbar",
  props: ["isLoggedIn", "userCart"],
  data() {
    return {
      searchBox: "",
      menu: false,
      validInput: true,
      requiredRule: [v => !!v || "Field required"],
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
    login() {
      console.log(this.loginForm)
      this.$emit("login", this.loginForm);
      this.menu = false;
    },
    validate() {
      if (this.$refs.form.validate() && this.validInput) {
        this.snackbar = true;
        this.login();
      } else {
        swal.fire("Invalid Input");
      }
    },
    emptyForm() {
      this.menu = false;
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    logout() {
      this.$emit('logout')
      this.emptyForm()
    },
    // login google ada di scrap
  },
  watch: {
    searchBox(input) {},
    isLoggedIn(value) {
      if (value) {
        this.emptyForm;
      }
    }
  },
  mounted() {
    // if (gapi) {
    //   // console.log({ gapi });
    //   gapi.signin2.render("google-signin-btn", {
    //     // this is the button "id"
    //     onsuccess: this.onSignIn // note, no "()" here
    //   });
    // }
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: white;
}
</style>
