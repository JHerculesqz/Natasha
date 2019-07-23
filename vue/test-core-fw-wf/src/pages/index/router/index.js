import Vue from 'vue'
import Router from 'vue-router'
import ObjLstPage from '../components/ObjLstPage'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ObjLstPage',
      component: ObjLstPage
    }
  ]
})
