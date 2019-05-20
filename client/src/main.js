import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import VueSwal from 'vue-swal';
import axios from 'axios';

Vue.prototype.$axios = axios;

Vue.use(VueSwal);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
