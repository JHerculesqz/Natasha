import Vue from 'vue'
import Router from 'vue-router'
import WorkFlowWrapper from '../components/WorkFlowWrapper'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WorkFlowWrapper',
      component: WorkFlowWrapper
    }
  ]
})
