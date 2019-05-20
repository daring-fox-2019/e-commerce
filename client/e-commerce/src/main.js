import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


const options = {
  showConfirmButton: false,
};

Vue.use(VueSweetalert2, options);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
