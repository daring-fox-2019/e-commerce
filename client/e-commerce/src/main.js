import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import VueSweetAlert from 'vue-sweetalert'
import axios from 'axios'

Vue.use(BootstrapVue)
Vue.use(VueSweetAlert)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$axios = axios
