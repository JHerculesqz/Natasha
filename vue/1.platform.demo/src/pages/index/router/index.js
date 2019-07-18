import Vue from 'vue'
import Router from 'vue-router'
import Page0 from '../components/Page0'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Page0',
      component: Page0
    }
  ]
})
