import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueSweetalert2 from 'vue-sweetalert2';
 
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
       next({
         path : '/',
       })
    } else {
      if (to.matched.some(record => record.meta.isAdmin)) {
        if (localStorage.getItem('role') == 'admin') {
           next()
        } else {
          next({
            path : '/'
          })
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
  render: h => h(App),
}).$mount('#app');
