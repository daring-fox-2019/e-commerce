<template>
  <v-toolbar>
    <router-link to="/">
      <v-toolbar-title class="teal--text">+plusOne</v-toolbar-title>
    </router-link>

    <v-dialog
      v-model="loginWindow"
      max-width="30%"
    >
      <LoginForm/>
    </v-dialog>

    <v-dialog
      v-model="registerWindow"
      max-width="30%"
    >
      <RegisterForm/>
    </v-dialog>

    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn 
        color="teal"
        flat
        @click.stop="loginWindow = true"
      >
        LOGIN
      </v-btn>
      <v-btn
        color="teal"
        flat
        @click.stop="registerWindow = true"
      >
        REGISTER
      </v-btn>
    </v-toolbar-items>

    <v-text-field
      v-model="search"
      color="teal"
      hide-details
      prepend-icon="search"
      single-line
    ></v-text-field>

    <v-btn color="teal" icon flat>
      <v-icon>shopping_basket</v-icon>
    </v-btn>

    <v-btn icon flat>
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<style scoped>
  a {
    text-decoration: none;
  }
</style>

<script>
import { mapActions } from 'vuex';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  name: 'headBar',
  components: {
    LoginForm,
    RegisterForm,
  },
  watch: {
    search(val) {
      this.login(val);
    },
  },
  data() {
    return {
      search: '',
      loginWindow: false,
      registerWindow: false,
    };
  },
  methods: {
    ...mapActions([
      'login'
    ])
  }
};
</script>
