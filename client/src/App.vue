<template>
  <v-app>
    <toolbar @toggle="drawer = !drawer" :isLoggedIn="isLoggedIn"/>
    <sidebar :drawer="drawer" :items="items"/>
    <login-form v-if="!isLoggedIn"/>
    <v-content class="dark-default">
      <router-view v-if="isLoggedIn"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import toolbar from './components/v-toolbar.vue';
import sidebar from './components/side-bar.vue';
import LoginForm from './components/login-form.vue';

export default {
  name: 'App',
  components: {
    toolbar, sidebar, LoginForm,
  },
  data() {
    return {
      isLoggedIn: true,
      drawer: false,
      items: [
        {
          id: 1,
          icon: 'home',
          text: 'Home',
          url: 'http://google.com',
        },
        {
          id: 2,
          icon: 'person',
          text: 'Profile',
          url: '',
        },
        {
          id: 3,
          icon: 'content_copy',
          text: 'Articles',
          url: '',
        },
        {
          id: 4,
          icon: 'settings',
          text: 'Settings',
          url: '',
        },
        {
          id: 5,
          icon: 'chat_bubble',
          text: 'Send feedback',
          url: '',
        },
        {
          id: 6,
          icon: 'help',
          text: 'Help',
          url: '',
        },
        {
          id: 7,
          icon: 'power_settings_new',
          text: 'Log out',
          url: '',
        },
        // {
        //   icon: 'keyboard_arrow_up',
        //   'icon-alt': 'keyboard_arrow_down',
        //   text: 'Labels',
        //   model: true,
        //   children: [
        //     { icon: 'add', text: 'Create label' }
        //   ]
        // },
      ],
    };
  },
};
</script>

<style>
a {
  text-decoration: none;
}
.dark-default {
  background-color: #1d282e !important; 
}
.dark-default-1 {
  background-color: #24394b !important; 
}
</style>
