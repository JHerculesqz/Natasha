// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import http from './walle/component/http'
import dom from './walle/component/dom'
import SkinUtilsEx from './walle/component/skin'
import I18nUtilsEx from './walle/component/i18n'

Vue.config.productionTip = false;

SkinUtilsEx.initTheme();

const i18n = I18nUtilsEx.initI18n({
  'zh': require('./i18n/zh'),
  'en': require('./i18n/en')
});

new Vue({
  el: '#app',
  router,
  http,
  store,
  dom,
  i18n,
  template: '<App/>',
  components: { App }
});
