<template>
<div>
  <button @click="showRegisterPage=true" type="button" class="btn btn-success">Register</button>
  <button @click="showRegisterPage=false" type="button" class="btn btn-primary">Login</button>
  <LogRegForm v-show="showRegisterPage" @submitted="register" title="Register">
    <div class="form-group">
      <label for="exampleInputName1">Name</label>
      <input v-model="name" type="text" class="form-control" id="exampleInputName1"  placeholder="Enter name">
    </div>
  </LogRegForm>
  <LogRegForm v-show="!showRegisterPage" @submitted="login" title="Login"/>
</div>
</template>
<script>
import LogRegForm from '@/components/LogRegForm.vue';

export default {
  name: 'logreg',
  components: {
    LogRegForm,
  },
  // computed: mapState(['logRegStatus']),
  data() {
    return {
      showRegisterPage: true,
      name: '',
    };
  },
  created() {
    if (localStorage.getItem('role') == 'admin') {
      this.$router.push('/admin');
    } else if (localStorage.hasOwnProperty('token')) {
      this.$router.push('/');
    }
  },
  methods: {
    register(email, password) {
      this.$store.dispatch('register', {
        name: this.name, email, password,
      });
    },
    login(email, password) {
      this.$store.dispatch('login', {
        email, password,
      });
    },
  },
};
</script>
