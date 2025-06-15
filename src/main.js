import Vue from 'vue'
import App from './App.vue'

import router from './router';
import store from './store';
import AxiosPlugin from './plugins/axios';
import AxiosAdminPlugin from './plugins/axios-admin';

Vue.use(AxiosPlugin);
Vue.use(AxiosAdminPlugin);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
