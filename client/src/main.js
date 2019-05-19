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


router.beforeEach((to, from, next) => {
  // console.log(to, '=====to=======from', from);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log('masuk if atass');
    if (!localStorage.getItem('token')) {
      next({
        path: '/',
        params: {
          name : "landing"
        }
      })
    } else {
      if (to.matched.some(record => record.meta.is_admin)) {
        if (localStorage.getItem('role') == 'admin') {
          next()
        } else {
          next({path: '/'})
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
