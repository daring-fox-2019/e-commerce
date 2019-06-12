import Vue from 'vue'
import VueAlertify from 'vue-alertify'

import App from './App.vue'
import router from './router'

import './assets/css/bulmaswatch.css'

Vue.config.productionTip = false

Vue.use(VueAlertify, {
  notifier: {
    position: 'top-center'
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
