// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import http from 'marvel-fui2/src/walle/component/http'
import dom from 'marvel-fui2/src/walle/component/dom'

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  http,
  store,
  dom,
  template: '<App/>',
  components: { App }
});
