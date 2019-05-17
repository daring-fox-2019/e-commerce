import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Swal from 'sweetalert2'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.config.productionTip = false
Vue.prototype.axios = axios.create({
  baseURL: `http://localhost:3000`
})

Vue.prototype.swal = Swal

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
