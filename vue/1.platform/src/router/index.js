import Vue from 'vue'
import Router from 'vue-router'
import Page0 from '@/components/page0/Page0'
import Page1 from '@/components/page1/Page1'

Vue.use(Router);

export default new Router({
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'page0',
    component: Page0
  }, {
    path: '/page1',
    name: 'page1',
    component: Page1
  }]
})

