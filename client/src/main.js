import Vue from 'vue';
// boostrap
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vuex from 'vuex';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import router from './router';

import store from '@/store';

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
